import { Stack } from 'expo-router';

/**
 * Farmer route group layout.
 * Farmer-specific navigation and auth guard will be added in Phase 1.
 * FR-01 (Registration), FR-02 (Login), FR-03 (Profile)
 */
export default function FarmerLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
