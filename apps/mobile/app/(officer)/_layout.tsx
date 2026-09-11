import { Stack } from 'expo-router';

/**
 * Procurement Officer route group layout.
 * Officer-specific navigation and auth guard will be added in Phase 1.
 * FR-11 (Arrival), FR-12 (Weighing), FR-13 (Quality), FR-17 (Dashboard), FR-18 (Queue Control)
 */
export default function OfficerLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
