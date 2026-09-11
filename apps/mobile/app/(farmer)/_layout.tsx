import { Stack } from 'expo-router';
import React from 'react';

export default function FarmerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1b4332' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerBackTitle: 'Roles',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Farmer Home',
        }}
      />
    </Stack>
  );
}
