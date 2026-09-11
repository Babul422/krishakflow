import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function OperatorAssistedServiceScreen() {
  const router = useRouter();

  const operatorServices = [
    { title: 'Register Farmer', icon: '📝', desc: 'Create account for new or offline farmer' },
    { title: 'Find Centre', icon: '📍', desc: 'Search nearby procurement mandis & capacity' },
    { title: 'Book Slot', icon: '📅', desc: 'Reserve date & time on farmer behalf' },
    { title: 'Generate Token', icon: '🎫', desc: 'Issue physical or SMS token' },
    { title: 'Check Queue', icon: '⏱️', desc: 'Look up live waiting status by token' },
    { title: 'Procurement Status', icon: '⚖️', desc: 'Verify weighing and quality inspection' },
    { title: 'Payment Status', icon: '💳', desc: 'Track DBT payment clearance' },
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
            <Text style={styles.greetingText}>Assisted Service</Text>
            <Text style={styles.subGreetingText}>Kisan Help Desk · Village / CSC Center</Text>
          </View>
          <Pressable
            style={styles.switchRoleBtn}
            onPress={() => router.replace('/')}
            android_ripple={{ color: '#ffe8d6' }}
          >
            <Text style={styles.switchRoleText}>Switch Role</Text>
          </Pressable>
        </View>

        {/* Assistance Card Banner */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Operator Assistance Mode</Text>
          <Text style={styles.infoDesc}>
            Perform actions on behalf of farmers who lack smartphones or have low internet connectivity.
          </Text>
        </View>

        {/* Operator Actions List */}
        <Text style={styles.sectionHeading}>Assisted Service Actions</Text>
        <View style={styles.servicesContainer}>
          {operatorServices.map((service, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.serviceItem,
                pressed && styles.serviceItemPressed,
              ]}
              android_ripple={{ color: '#fed7aa' }}
            >
              <View style={styles.serviceIconCircle}>
                <Text style={styles.serviceIconText}>{service.icon}</Text>
              </View>
              <View style={styles.serviceTextColumn}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDesc}>{service.desc}</Text>
              </View>
              <Text style={styles.serviceArrow}>→</Text>
            </Pressable>
          ))}
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
    backgroundColor: '#fffaf5',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 28,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
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
    color: '#9a3412',
  },
  subGreetingText: {
    fontSize: 12,
    color: '#7c2d12',
    marginTop: 2,
  },
  switchRoleBtn: {
    backgroundColor: '#ffedd5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  switchRoleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#c2410c',
  },
  infoCard: {
    backgroundColor: '#fff7ed',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ea580c',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#9a3412',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 12,
    color: '#7c2d12',
    lineHeight: 16,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#9a3412',
    marginBottom: 12,
  },
  servicesContainer: {
    marginBottom: 16,
  },
  serviceItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffedd5',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  serviceItemPressed: {
    backgroundColor: '#fff7ed',
    transform: [{ scale: 0.99 }],
  },
  serviceIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffedd5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  serviceIconText: {
    fontSize: 18,
  },
  serviceTextColumn: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 2,
  },
  serviceDesc: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 14,
  },
  serviceArrow: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ea580c',
    paddingLeft: 8,
  },
  prototypeNotice: {
    alignItems: 'center',
    paddingTop: 8,
  },
  prototypeText: {
    fontSize: 11,
    color: '#9ca3af',
  },
});
