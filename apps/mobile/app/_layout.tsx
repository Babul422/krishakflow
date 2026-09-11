import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1b4332" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1b4332' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(farmer)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(officer)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(operator)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
