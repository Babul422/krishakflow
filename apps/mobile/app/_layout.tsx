import { Stack } from 'expo-router';

/**
 * Root layout for KisanFlow mobile app.
 * Authentication and role-based navigation will be configured here in Phase 1.
 */
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(farmer)" />
      <Stack.Screen name="(officer)" />
      <Stack.Screen name="(operator)" />
    </Stack>
  );
}
