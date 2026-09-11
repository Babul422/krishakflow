-- ==============================================================================
-- KisanFlow Demo / Seed Data (Development Environment Only)
-- Source of Truth: docs/TRD.md §1.5, §30 & docs/PRD.md §8
-- ==============================================================================

-- 1. Demo Crops
INSERT INTO public.crops (id, name_en, name_hi, msp_per_quintal, season, is_active)
VALUES
  ('c1111111-1111-1111-1111-111111111111', 'Wheat', 'गेहूं', 2275.00, 'Rabi 2026', TRUE),
  ('c2222222-2222-2222-2222-222222222222', 'Paddy (Common)', 'धान (सामान्य)', 2183.00, 'Kharif 2026', TRUE),
  ('c3333333-3333-3333-3333-333333333333', 'Gram (Chana)', 'चना', 5440.00, 'Rabi 2026', TRUE),
  ('c4444444-4444-4444-4444-444444444444', 'Mustard', 'सरसों', 5650.00, 'Rabi 2026', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 2. Demo Procurement Centres
INSERT INTO public.procurement_centres (id, name, district, state, address, latitude, longitude, daily_capacity_farmers, current_congestion, is_active)
VALUES
  ('a1111111-1111-1111-1111-111111111111', 'Centre A — Sehore Central Mandi', 'Sehore', 'Madhya Pradesh', 'Krishi Upaj Mandi, Bhopal-Indore Road, Sehore', 23.2032000, 77.0844000, 150, 'high', TRUE),
  ('b2222222-2222-2222-2222-222222222222', 'Centre B — Ashta Rural Procurement Centre', 'Sehore', 'Madhya Pradesh', 'Mandi Prangan, Ashta, Sehore', 23.0189000, 76.7214000, 100, 'low', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. Demo Counters for Centre B
INSERT INTO public.centre_counters (id, centre_id, counter_number, counter_name, is_active)
VALUES
  ('cc111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222', 1, 'Verification Counter 1', TRUE),
  ('cc222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', 2, 'Weighing & Quality Counter 2', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 4. Demo Slots for Centre B (Today / Upcoming)
INSERT INTO public.slots (id, centre_id, slot_date, start_time, end_time, max_capacity, booked_count, is_active)
VALUES
  ('s1111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222', CURRENT_DATE, '09:00:00', '10:00:00', 20, 12, TRUE),
  ('s2222222-2222-2222-2222-222222222222', 'b2222222-2222-2222-2222-222222222222', CURRENT_DATE, '10:00:00', '11:00:00', 20, 18, TRUE),
  ('s3333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', CURRENT_DATE, '11:00:00', '12:00:00', 20, 15, TRUE),
  ('s4444444-4444-4444-4444-444444444444', 'b2222222-2222-2222-2222-222222222222', CURRENT_DATE, '12:00:00', '13:00:00', 20, 5, TRUE)
ON CONFLICT (id) DO NOTHING;
