import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { APP_NAME, APP_DESCRIPTION, formatRoleName } from '@kisanflow/shared';

export default function RoleGatewayScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Phase 0 Foundation</Text>
        </View>
        <Text style={styles.title}>{APP_NAME}</Text>
        <Text style={styles.subtitle}>{APP_DESCRIPTION}</Text>
      </View>

      <Text style={styles.sectionTitle}>Select Role Experience</Text>

      <TouchableOpacity
        style={[styles.roleCard, { borderLeftColor: '#2d6a4f' }]}
        onPress={() => router.push('/(farmer)')}
        activeOpacity={0.8}
      >
        <Text style={styles.roleTitle}>{formatRoleName('farmer')}</Text>
        <Text style={styles.roleDesc}>
          Slot booking, token generation, live queue tracking & payment timeline
        </Text>
        <Text style={styles.actionText}>Enter Farmer Experience →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleCard, { borderLeftColor: '#1d3557' }]}
        onPress={() => router.push('/(officer)')}
        activeOpacity={0.8}
      >
        <Text style={styles.roleTitle}>{formatRoleName('officer')}</Text>
        <Text style={styles.roleDesc}>
          Arrival marking, queue management, weighing, quality & procurement
        </Text>
        <Text style={styles.actionText}>Enter Officer Experience →</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleCard, { borderLeftColor: '#e76f51' }]}
        onPress={() => router.push('/(operator)')}
        activeOpacity={0.8}
      >
        <Text style={styles.roleTitle}>{formatRoleName('operator')}</Text>
        <Text style={styles.roleDesc}>
          Assisted registration, booking, and support for rural farmers
        </Text>
        <Text style={styles.actionText}>Enter Operator Experience →</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Role-based unified mobile experience · Expo Router
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 28,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#d8f3dc',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 10,
  },
  badgeText: {
    color: '#1b4332',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1b4332',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 14,
    borderLeftWidth: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  roleDesc: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d6a4f',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#888888',
  },
});
