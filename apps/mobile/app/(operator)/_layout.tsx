import { Stack } from 'expo-router';

/**
 * Assisted-Service Operator route group layout.
 * Operator-specific navigation and auth guard will be added in Phase 1.
 * Covers assisted farmer registration, lookup, and booking.
 */
export default function OperatorLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
