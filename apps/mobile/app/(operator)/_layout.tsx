import { Stack } from 'expo-router';
import React from 'react';

export default function OperatorLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#e76f51' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Assisted-Service Operator',
          headerBackTitle: 'Roles',
        }}
      />
    </Stack>
  );
}
