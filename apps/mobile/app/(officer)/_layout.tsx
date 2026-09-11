import { Stack } from 'expo-router';
import React from 'react';

export default function OfficerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1d3557' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Procurement Officer Portal',
          headerBackTitle: 'Roles',
        }}
      />
    </Stack>
  );
}
