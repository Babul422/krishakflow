import { Stack } from 'expo-router';
import React from 'react';

export default function OfficerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1d3557' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerBackTitle: 'Roles',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Officer Dashboard',
        }}
      />
    </Stack>
  );
}
