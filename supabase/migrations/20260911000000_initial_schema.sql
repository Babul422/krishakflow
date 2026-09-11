-- ==============================================================================
-- KisanFlow Database Migration: Initial Schema & RLS Foundation
-- Version: 1.0 (Phase 1 Baseline)
-- Source of Truth: docs/TRD.md §7 to §13, §21
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. Custom Types / Enums
-- ------------------------------------------------------------------------------

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('farmer', 'procurement_officer', 'assisted_service_operator', 'government_admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE queue_state AS ENUM ('booked', 'arrived', 'waiting', 'called', 'processing', 'completed', 'cancelled', 'no_show');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE quality_status AS ENUM ('pending', 'approved', 'rejected', 'requires_review');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'verified', 'approved', 'processing', 'credited', 'failed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE congestion_level AS ENUM ('low', 'moderate', 'high', 'critical');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ------------------------------------------------------------------------------
-- 2. Profiles & Roles
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone TEXT UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'farmer',
  full_name TEXT NOT NULL,
  preferred_language TEXT NOT NULL DEFAULT 'hi',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.farmer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  village TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Madhya Pradesh',
  land_area_acres NUMERIC(6, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.procurement_centres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Madhya Pradesh',
  address TEXT NOT NULL,
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  daily_capacity_farmers INT NOT NULL DEFAULT 100,
  current_congestion congestion_level NOT NULL DEFAULT 'low',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.staff_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  centre_id UUID REFERENCES public.procurement_centres(id) ON DELETE SET NULL,
  designation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. Crops & Slots
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.crops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  msp_per_quintal NUMERIC(10, 2) NOT NULL,
  season TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.centre_counters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE CASCADE,
  counter_number INT NOT NULL,
  counter_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (centre_id, counter_number)
);

CREATE TABLE IF NOT EXISTS public.slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE CASCADE,
  slot_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  max_capacity INT NOT NULL DEFAULT 20,
  booked_count INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT valid_slot_time CHECK (start_time < end_time),
  CONSTRAINT valid_capacity CHECK (booked_count <= max_capacity)
);

-- ------------------------------------------------------------------------------
-- 4. Bookings & Queue Management
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE RESTRICT,
  crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE RESTRICT,
  slot_id UUID NOT NULL REFERENCES public.slots(id) ON DELETE RESTRICT,
  token_number TEXT NOT NULL,
  estimated_quantity_kg NUMERIC(8, 2) NOT NULL,
  booking_date DATE NOT NULL,
  status queue_state NOT NULL DEFAULT 'booked',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (centre_id, booking_date, token_number)
);

CREATE TABLE IF NOT EXISTS public.queue_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE RESTRICT,
  previous_state queue_state,
  new_state queue_state NOT NULL,
  actor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. Procurement Operations & Payments
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.weighing_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
  measured_quantity_kg NUMERIC(8, 2) NOT NULL,
  unit TEXT NOT NULL DEFAULT 'kg',
  weighed_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  weighed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS public.quality_inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE CASCADE,
  status quality_status NOT NULL DEFAULT 'pending',
  inspected_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  inspected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  moisture_percentage NUMERIC(5, 2),
  foreign_matter_percentage NUMERIC(5, 2),
  remarks TEXT
);

CREATE TABLE IF NOT EXISTS public.procurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE REFERENCES public.bookings(id) ON DELETE RESTRICT,
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE RESTRICT,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE RESTRICT,
  accepted_quantity_kg NUMERIC(8, 2) NOT NULL,
  msp_rate_per_kg NUMERIC(8, 2) NOT NULL,
  total_procurement_amount NUMERIC(12, 2) NOT NULL,
  procurement_reference TEXT UNIQUE NOT NULL,
  procured_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  procured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procurement_id UUID NOT NULL UNIQUE REFERENCES public.procurements(id) ON DELETE RESTRICT,
  farmer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  amount NUMERIC(12, 2) NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  transaction_ref TEXT UNIQUE,
  payment_mode TEXT DEFAULT 'DBT_SIMULATED',
  initiated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  credited_at TIMESTAMPTZ,
  remarks TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. Notifications, Audit Logs & Intelligence
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  event_type TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  role TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_name TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.congestion_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE CASCADE,
  prediction_date DATE NOT NULL,
  expected_farmers INT NOT NULL,
  expected_congestion congestion_level NOT NULL DEFAULT 'low',
  peak_hours TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.operational_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  centre_id UUID NOT NULL REFERENCES public.procurement_centres(id) ON DELETE CASCADE,
  recommendation_text TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'medium',
  is_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. Indexes
-- ------------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_bookings_farmer ON public.bookings(farmer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_centre_date ON public.bookings(centre_id, booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_queue_events_booking ON public.queue_events(booking_id);
CREATE INDEX IF NOT EXISTS idx_queue_events_centre ON public.queue_events(centre_id);
CREATE INDEX IF NOT EXISTS idx_slots_centre_date ON public.slots(centre_id, slot_date);
CREATE INDEX IF NOT EXISTS idx_procurements_farmer ON public.procurements(farmer_id);
CREATE INDEX IF NOT EXISTS idx_procurements_centre ON public.procurements(centre_id);
CREATE INDEX IF NOT EXISTS idx_payments_farmer ON public.payments(farmer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_name, entity_id);

-- ------------------------------------------------------------------------------
-- 8. Row Level Security (RLS) Enablement
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurement_centres ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.centre_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queue_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weighing_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quality_inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.congestion_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.operational_recommendations ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 9. RLS Policies
-- ------------------------------------------------------------------------------

-- Helper functions to identify user role safely from profiles
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS user_role AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.current_user_centre_id()
RETURNS UUID AS $$
  SELECT centre_id FROM public.staff_profiles WHERE profile_id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Profiles Policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.current_user_role() IN ('government_admin', 'procurement_officer', 'assisted_service_operator'));

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Farmer Profiles Policies
CREATE POLICY "Farmers view own profile"
  ON public.farmer_profiles FOR SELECT
  USING (profile_id = auth.uid() OR public.current_user_role() IN ('government_admin', 'procurement_officer', 'assisted_service_operator'));

CREATE POLICY "Farmers update own profile"
  ON public.farmer_profiles FOR UPDATE
  USING (profile_id = auth.uid());

CREATE POLICY "Farmers insert own profile"
  ON public.farmer_profiles FOR INSERT
  WITH CHECK (profile_id = auth.uid() OR public.current_user_role() = 'assisted_service_operator');

-- Public Catalog (Crops, Centres, Counters, Slots)
CREATE POLICY "Active crops are viewable by authenticated users"
  ON public.crops FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

CREATE POLICY "Active centres are viewable by authenticated users"
  ON public.procurement_centres FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

CREATE POLICY "Active counters are viewable by authenticated users"
  ON public.centre_counters FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

CREATE POLICY "Active slots are viewable by authenticated users"
  ON public.slots FOR SELECT
  TO authenticated
  USING (is_active = TRUE);

-- Bookings Policies
CREATE POLICY "Farmers can view own bookings"
  ON public.bookings FOR SELECT
  USING (farmer_id = auth.uid() OR (public.current_user_role() = 'procurement_officer' AND centre_id = public.current_user_centre_id()) OR public.current_user_role() = 'government_admin');

CREATE POLICY "Farmers or Operators can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (farmer_id = auth.uid() OR public.current_user_role() = 'assisted_service_operator');

CREATE POLICY "Officers can update bookings at their centre"
  ON public.bookings FOR UPDATE
  USING ((public.current_user_role() = 'procurement_officer' AND centre_id = public.current_user_centre_id()) OR farmer_id = auth.uid() OR public.current_user_role() = 'government_admin');

-- Queue Events Policies
CREATE POLICY "Users can view relevant queue events"
  ON public.queue_events FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = queue_events.booking_id AND (b.farmer_id = auth.uid() OR (public.current_user_role() = 'procurement_officer' AND b.centre_id = public.current_user_centre_id()) OR public.current_user_role() = 'government_admin')));

CREATE POLICY "Officers and Operators can insert queue events"
  ON public.queue_events FOR INSERT
  WITH CHECK (actor_id = auth.uid() AND public.current_user_role() IN ('procurement_officer', 'assisted_service_operator', 'government_admin'));

-- Weighing & Quality Policies
CREATE POLICY "View weighing records"
  ON public.weighing_records FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = weighing_records.booking_id AND (b.farmer_id = auth.uid() OR (public.current_user_role() = 'procurement_officer' AND b.centre_id = public.current_user_centre_id()) OR public.current_user_role() = 'government_admin')));

CREATE POLICY "Officers insert weighing records"
  ON public.weighing_records FOR INSERT
  WITH CHECK (weighed_by = auth.uid() AND public.current_user_role() = 'procurement_officer');

CREATE POLICY "View quality inspections"
  ON public.quality_inspections FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = quality_inspections.booking_id AND (b.farmer_id = auth.uid() OR (public.current_user_role() = 'procurement_officer' AND b.centre_id = public.current_user_centre_id()) OR public.current_user_role() = 'government_admin')));

CREATE POLICY "Officers insert quality inspections"
  ON public.quality_inspections FOR INSERT
  WITH CHECK (inspected_by = auth.uid() AND public.current_user_role() = 'procurement_officer');

-- Procurements Policies
CREATE POLICY "View procurements"
  ON public.procurements FOR SELECT
  USING (farmer_id = auth.uid() OR (public.current_user_role() = 'procurement_officer' AND centre_id = public.current_user_centre_id()) OR public.current_user_role() = 'government_admin');

CREATE POLICY "Officers insert procurements"
  ON public.procurements FOR INSERT
  WITH CHECK (procured_by = auth.uid() AND public.current_user_role() = 'procurement_officer');

-- Payments Policies
CREATE POLICY "Farmers view own payments"
  ON public.payments FOR SELECT
  USING (farmer_id = auth.uid() OR public.current_user_role() IN ('procurement_officer', 'government_admin'));

-- Notifications Policies
CREATE POLICY "Users manage own notifications"
  ON public.notifications FOR ALL
  USING (user_id = auth.uid());

-- Audit Logs Policies (Append-only by actors, readable by Admins)
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.current_user_role() = 'government_admin');

CREATE POLICY "Authenticated users can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (actor_id = auth.uid());

-- Predictions & Recommendations Policies
CREATE POLICY "View predictions"
  ON public.congestion_predictions FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "View recommendations"
  ON public.operational_recommendations FOR SELECT
  TO authenticated
  USING (TRUE);
