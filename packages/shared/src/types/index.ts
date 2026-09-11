/**
 * Shared Type Definitions for KisanFlow
 * Phase 0: Base roles and minimal architectural types
 */

export type UserRole = 'farmer' | 'officer' | 'operator' | 'admin';

export interface AppUser {
  id: string;
  role: UserRole;
  phone?: string;
  fullName?: string;
}

export type SupportedLanguage = 'en' | 'hi';
