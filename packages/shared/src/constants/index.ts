/**
 * KisanFlow Shared Constants
 * Source of Truth: docs/PRD.md & docs/TRD.md
 */

export const USER_ROLES = {
  FARMER: 'farmer',
  OFFICER: 'procurement_officer',
  OPERATOR: 'assisted_service_operator',
  ADMIN: 'government_admin',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const QUEUE_STATES = {
  BOOKED: 'booked',
  ARRIVED: 'arrived',
  WAITING: 'waiting',
  CALLED: 'called',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
} as const;

export type QueueState = (typeof QUEUE_STATES)[keyof typeof QUEUE_STATES];

export const QUALITY_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  REQUIRES_REVIEW: 'requires_review',
} as const;

export type QualityStatus = (typeof QUALITY_STATUSES)[keyof typeof QUALITY_STATUSES];

export const PAYMENT_STATUSES = {
  PENDING: 'pending',
  VERIFIED: 'verified',
  APPROVED: 'approved',
  PROCESSING: 'processing',
  CREDITED: 'credited',
  FAILED: 'failed',
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUSES)[keyof typeof PAYMENT_STATUSES];

export const CONGESTION_LEVELS = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

export type CongestionLevel = (typeof CONGESTION_LEVELS)[keyof typeof CONGESTION_LEVELS];
