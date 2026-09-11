import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function OfficerDashboardScreen() {
  const router = useRouter();

  const [queueList] = useState([
    { token: 'B39', status: 'Waiting', badgeBg: '#fef3c7', badgeColor: '#92400e' },
    { token: 'B40', status: 'Waiting', badgeBg: '#fef3c7', badgeColor: '#92400e' },
    { token: 'B41', status: 'Processing', badgeBg: '#dbeafe', badgeColor: '#1e40af' },
    { token: 'B42', status: 'Waiting', badgeBg: '#fef3c7', badgeColor: '#92400e' },
  ]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top greeting / status bar */}
        <View style={styles.welcomeBanner}>
          <View>
            <Text style={styles.greetingText}>Procurement Officer</Text>
            <Text style={styles.subGreetingText}>Centre B · Counter 2</Text>
          </View>
          <Pressable
            style={styles.switchRoleBtn}
            onPress={() => router.replace('/')}
            android_ripple={{ color: '#dbeafe' }}
          >
            <Text style={styles.switchRoleText}>Switch Role</Text>
          </Pressable>
        </View>

        {/* Today's Operations Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>TODAY'S OPERATIONS</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: '#f0fdf4' }]}>
              <Text style={[styles.statNumber, { color: '#166534' }]}>64</Text>
              <Text style={styles.statLabel}>Today's Bookings</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#fffbeb' }]}>
              <Text style={[styles.statNumber, { color: '#92400e' }]}>18</Text>
              <Text style={styles.statLabel}>Waiting Farmers</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#eff6ff' }]}>
              <Text style={[styles.statNumber, { color: '#1e40af' }]}>3</Text>
              <Text style={styles.statLabel}>Processing</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: '#f5f3ff' }]}>
              <Text style={[styles.statNumber, { color: '#5b21b6' }]}>43</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
          </View>
        </View>

        {/* Live Queue Section */}
        <View style={styles.card}>
          <View style={styles.queueHeaderRow}>
            <Text style={styles.cardHeading}>LIVE QUEUE</Text>
            <View style={styles.counterBadge}>
              <Text style={styles.counterBadgeText}>4 in active line</Text>
            </View>
          </View>
          <View style={styles.queueContainer}>
            {queueList.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.queueRow,
                  index === queueList.length - 1 && styles.lastQueueRow,
                ]}
              >
                <View style={styles.queueTokenInfo}>
                  <Text style={styles.queueTokenText}>{item.token}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: item.badgeBg }]}>
                  <Text style={[styles.statusBadgeText, { color: item.badgeColor }]}>
                    {item.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Action Controls */}
        <Text style={styles.sectionHeading}>Queue Actions</Text>
        <View style={styles.actionsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: '#1d3557' },
              pressed && styles.btnPressed,
            ]}
            android_ripple={{ color: '#457b9d' }}
          >
            <Text style={styles.actionBtnText}>📢 Call Next</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: '#2a9d8f' },
              pressed && styles.btnPressed,
            ]}
            android_ripple={{ color: '#68d8d6' }}
          >
            <Text style={styles.actionBtnText}>✅ Mark Arrived</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: '#f4a261' },
              pressed && styles.btnPressed,
            ]}
            android_ripple={{ color: '#e76f51' }}
          >
            <Text style={styles.actionBtnText}>⚖️ Start Processing</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.actionBtn,
              { backgroundColor: '#2d6a4f' },
              pressed && styles.btnPressed,
            ]}
            android_ripple={{ color: '#52b788' }}
          >
            <Text style={styles.actionBtnText}>✔️ Complete Processing</Text>
          </Pressable>
        </View>

        {/* Phase 0 Notice */}
        <View style={styles.prototypeNotice}>
          <Text style={styles.prototypeText}>
            Mobile UI Prototype · Phase 0 Foundation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
  },
  welcomeBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 4,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1d3557',
  },
  subGreetingText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  switchRoleBtn: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  switchRoleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d3557',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: '900',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
    marginTop: 4,
    textAlign: 'center',
  },
  queueHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  counterBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  counterBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  queueContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  queueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  lastQueueRow: {
    borderBottomWidth: 0,
  },
  queueTokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueTokenText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1d3557',
    marginTop: 4,
    marginBottom: 12,
  },
  actionsContainer: {
    marginBottom: 16,
  },
  actionBtn: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  btnPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  prototypeNotice: {
    alignItems: 'center',
    paddingTop: 8,
  },
  prototypeText: {
    fontSize: 11,
    color: '#94a3b8',
  },
});
