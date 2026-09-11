import {
  UserRole,
  QueueState,
  QualityStatus,
  PaymentStatus,
  CongestionLevel,
} from '../constants/index.js';

export interface Profile {
  id: string;
  phone: string;
  role: UserRole;
  full_name: string;
  preferred_language: string;
  created_at: string;
  updated_at: string;
}

export interface FarmerProfile {
  id: string;
  profile_id: string;
  village: string;
  district: string;
  state: string;
  land_area_acres?: number | null;
  created_at: string;
  updated_at: string;
}

export interface StaffProfile {
  id: string;
  profile_id: string;
  centre_id?: string | null;
  designation?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Crop {
  id: string;
  name_en: string;
  name_hi: string;
  msp_per_quintal: number;
  season: string;
  is_active: boolean;
  created_at: string;
}

export interface ProcurementCentre {
  id: string;
  name: string;
  district: string;
  state: string;
  address: string;
  latitude: number;
  longitude: number;
  daily_capacity_farmers: number;
  current_congestion: CongestionLevel;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CentreCounter {
  id: string;
  centre_id: string;
  counter_number: number;
  counter_name: string;
  is_active: boolean;
  created_at: string;
}

export interface Slot {
  id: string;
  centre_id: string;
  slot_date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
  booked_count: number;
  is_active: boolean;
  created_at: string;
}

export interface Booking {
  id: string;
  farmer_id: string;
  centre_id: string;
  crop_id: string;
  slot_id: string;
  token_number: string;
  estimated_quantity_kg: number;
  booking_date: string;
  status: QueueState;
  created_at: string;
  updated_at: string;
}

export interface QueueEvent {
  id: string;
  booking_id: string;
  centre_id: string;
  previous_state?: QueueState | null;
  new_state: QueueState;
  actor_id: string;
  notes?: string | null;
  created_at: string;
}

export interface WeighingRecord {
  id: string;
  booking_id: string;
  measured_quantity_kg: number;
  unit: string;
  weighed_by: string;
  weighed_at: string;
  notes?: string | null;
}

export interface QualityInspection {
  id: string;
  booking_id: string;
  status: QualityStatus;
  inspected_by: string;
  inspected_at: string;
  moisture_percentage?: number | null;
  foreign_matter_percentage?: number | null;
  remarks?: string | null;
}

export interface Procurement {
  id: string;
  booking_id: string;
  centre_id: string;
  farmer_id: string;
  crop_id: string;
  accepted_quantity_kg: number;
  msp_rate_per_kg: number;
  total_procurement_amount: number;
  procurement_reference: string;
  procured_by: string;
  procured_at: string;
}

export interface Payment {
  id: string;
  procurement_id: string;
  farmer_id: string;
  amount: number;
  status: PaymentStatus;
  transaction_ref?: string | null;
  payment_mode?: string | null;
  initiated_at: string;
  credited_at?: string | null;
  remarks?: string | null;
  updated_at: string;
}

export interface AppNotification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  event_type: string;
  is_read: boolean;
  created_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string;
  role: string;
  action: string;
  entity_name: string;
  entity_id: string;
  metadata?: Record<string, unknown> | null;
  created_at: string;
}

export interface CongestionPrediction {
  id: string;
  centre_id: string;
  prediction_date: string;
  expected_farmers: number;
  expected_congestion: CongestionLevel;
  peak_hours: string;
  created_at: string;
}

export interface OperationalRecommendation {
  id: string;
  centre_id: string;
  recommendation_text: string;
  priority: 'low' | 'medium' | 'high';
  is_acknowledged: boolean;
  created_at: string;
}
