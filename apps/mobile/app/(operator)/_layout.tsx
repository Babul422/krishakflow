import { Stack } from 'expo-router';
import React from 'react';

export default function OperatorLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#c85a17' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        headerBackTitle: 'Roles',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Assisted Service',
        }}
      />
    </Stack>
  );
}
