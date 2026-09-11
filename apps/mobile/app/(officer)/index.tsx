import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { formatRoleName } from '@kisanflow/shared';

export default function OfficerScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.badge}>Role: {formatRoleName('officer')}</Text>
        <Text style={styles.title}>Procurement Officer</Text>
        <Text style={styles.description}>
          Phase 0 route verified. In subsequent phases, this section will feature:
        </Text>
        <View style={styles.featureList}>
          <Text style={styles.featureItem}>• Arrival Verification & Queue Control</Text>
          <Text style={styles.featureItem}>• Weighing Record Entry</Text>
          <Text style={styles.featureItem}>• Quality Inspection Approvals</Text>
          <Text style={styles.featureItem}>• Procurement Completion & Receipting</Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>← Switch Role Experience</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#edf2f7',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1d3557',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 16,
    lineHeight: 20,
  },
  featureList: {
    marginBottom: 24,
    paddingLeft: 4,
  },
  featureItem: {
    fontSize: 13,
    color: '#1d3557',
    marginBottom: 8,
    fontWeight: '500',
  },
  backButton: {
    backgroundColor: '#1d3557',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
