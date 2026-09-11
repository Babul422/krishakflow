import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function FarmerHomeScreen() {
  const router = useRouter();

  const quickActions = [
    { label: 'Find Centre', icon: '📍' },
    { label: 'Book Slot', icon: '📅' },
    { label: 'My Token', icon: '🎫' },
    { label: 'Live Queue', icon: '⏱️' },
    { label: 'Procurement & Payment', icon: '💳' },
    { label: 'History', icon: '📜' },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top greeting / status bar */}
        <View style={styles.welcomeBanner}>
          <View>
            <Text style={styles.greetingText}>Welcome, Farmer</Text>
            <Text style={styles.subGreetingText}>KisanFlow Smart Procurement</Text>
          </View>
          <Pressable
            style={styles.switchRoleBtn}
            onPress={() => router.replace('/')}
            android_ripple={{ color: '#d8f3dc' }}
          >
            <Text style={styles.switchRoleText}>Switch Role</Text>
          </Pressable>
        </View>

        {/* Current Booking Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionLabel}>CURRENT BOOKING</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillText}>Active Token</Text>
            </View>
          </View>
          <View style={styles.bookingDetailsRow}>
            <View style={styles.tokenHighlight}>
              <Text style={styles.tokenLabel}>TOKEN</Text>
              <Text style={styles.tokenValue}>B42</Text>
            </View>
            <View style={styles.bookingMeta}>
              <Text style={styles.centreName}>Centre B</Text>
              <Text style={styles.centreSub}>APMC Mandi Yard</Text>
              <Text style={styles.slotTime}>⏰ 11:00 AM – 12:00 PM</Text>
            </View>
          </View>
        </View>

        {/* Live Queue Card */}
        <View style={[styles.card, styles.queueCard]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardSectionLabel, { color: '#0f5132' }]}>LIVE QUEUE</Text>
            <View style={styles.livePulseDot}>
              <View style={styles.innerDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
          <View style={styles.queueStatsRow}>
            <View style={styles.queueStatBox}>
              <Text style={styles.queueStatNumber}>4</Text>
              <Text style={styles.queueStatCaption}>farmers ahead</Text>
            </View>
            <View style={styles.queueDivider} />
            <View style={styles.queueStatBox}>
              <Text style={styles.queueStatNumber}>28</Text>
              <Text style={styles.queueStatCaption}>minutes wait (est.)</Text>
            </View>
          </View>
          <View style={styles.queueFooterNote}>
            <Text style={styles.queueNoteText}>
              Counter 2 is calling Token B40 · Your turn expected at 11:35 AM
            </Text>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <Text style={styles.sectionHeading}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.actionGridItem,
                pressed && styles.actionGridItemPressed,
              ]}
              android_ripple={{ color: '#d8f3dc' }}
            >
              <Text style={styles.actionIcon}>{action.icon}</Text>
              <Text style={styles.actionItemLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        {/* Phase 0 Prototype Notice */}
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
    backgroundColor: '#f5f7f5',
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
    color: '#1b4332',
  },
  subGreetingText: {
    fontSize: 12,
    color: '#52796f',
    marginTop: 2,
  },
  switchRoleBtn: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  switchRoleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2e7d32',
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardSectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#555555',
    letterSpacing: 0.8,
  },
  activePill: {
    backgroundColor: '#d8f3dc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  activePillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1b4332',
  },
  bookingDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenHighlight: {
    backgroundColor: '#1b4332',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tokenLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#95d5b2',
    letterSpacing: 0.5,
  },
  tokenValue: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
  },
  bookingMeta: {
    flex: 1,
  },
  centreName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#212529',
  },
  centreSub: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 4,
  },
  slotTime: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2d6a4f',
  },
  queueCard: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  livePulseDot: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1fae5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  innerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
    marginRight: 5,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669',
  },
  queueStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  queueStatBox: {
    alignItems: 'center',
    flex: 1,
  },
  queueStatNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: '#065f46',
  },
  queueStatCaption: {
    fontSize: 12,
    fontWeight: '600',
    color: '#047857',
    marginTop: 2,
  },
  queueDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#a7f3d0',
  },
  queueFooterNote: {
    marginTop: 8,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  queueNoteText: {
    fontSize: 11,
    color: '#047857',
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1b4332',
    marginTop: 4,
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionGridItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '48%',
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionGridItemPressed: {
    backgroundColor: '#e8f5e9',
    transform: [{ scale: 0.98 }],
  },
  actionIcon: {
    fontSize: 26,
    marginBottom: 8,
  },
  actionItemLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#212529',
    textAlign: 'center',
  },
  prototypeNotice: {
    alignItems: 'center',
    paddingTop: 8,
  },
  prototypeText: {
    fontSize: 11,
    color: '#868e96',
  },
});
