/**
 * Shared Utilities for KisanFlow
 */

export function formatRoleName(role: string): string {
  switch (role) {
    case 'farmer':
      return 'Farmer';
    case 'officer':
      return 'Procurement Officer';
    case 'operator':
      return 'Assisted-Service Operator';
    case 'admin':
      return 'Government Administrator';
    default:
      return role;
  }
}
