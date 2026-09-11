import { Stack } from 'expo-router';
import React from 'react';

export default function FarmerLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2d6a4f' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Farmer Portal',
          headerBackTitle: 'Roles',
        }}
      />
    </Stack>
  );
}
