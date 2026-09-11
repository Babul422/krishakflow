import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1b4332' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'KisanFlow',
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
