import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function RoleSelectionScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.brandContainer}>
          <View style={styles.govtBadge}>
            <Text style={styles.govtBadgeText}>GOVERNMENT CROP PROCUREMENT</Text>
          </View>
          <Text style={styles.appName}>KisanFlow</Text>
          <View style={styles.taglineContainer}>
            <Text style={styles.taglineItem}>Smart Procurement.</Text>
            <Text style={styles.taglineItem}>Less Waiting.</Text>
            <Text style={styles.taglineItem}>More Transparency.</Text>
          </View>
        </View>

        {/* Role Selection Section */}
        <View style={styles.selectionSection}>
          <Text style={styles.sectionHeading}>Select your role</Text>
          <Text style={styles.sectionSubtitle}>
            Choose your profile to proceed into the mobile portal
          </Text>

          {/* Farmer Card */}
          <Pressable
            style={({ pressed }) => [
              styles.roleCard,
              { borderLeftColor: '#2d6a4f' },
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/(farmer)')}
            android_ripple={{ color: '#d8f3dc' }}
          >
            <View style={styles.roleCardContent}>
              <View style={[styles.roleIconBadge, { backgroundColor: '#d8f3dc' }]}>
                <Text style={styles.roleIconText}>🌾</Text>
              </View>
              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>Farmer</Text>
                <Text style={styles.roleDescription}>
                  Book procurement slots, track live tokens, queue wait-time & payments
                </Text>
              </View>
            </View>
            <View style={[styles.arrowBadge, { backgroundColor: '#eef8f2' }]}>
              <Text style={[styles.arrowText, { color: '#2d6a4f' }]}>→</Text>
            </View>
          </Pressable>

          {/* Procurement Officer Card */}
          <Pressable
            style={({ pressed }) => [
              styles.roleCard,
              { borderLeftColor: '#1d3557' },
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/(officer)')}
            android_ripple={{ color: '#dbeafe' }}
          >
            <View style={styles.roleCardContent}>
              <View style={[styles.roleIconBadge, { backgroundColor: '#dbeafe' }]}>
                <Text style={styles.roleIconText}>📋</Text>
              </View>
              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>Procurement Officer</Text>
                <Text style={styles.roleDescription}>
                  Manage centre queue, record weighment, quality checks & approve arrivals
                </Text>
              </View>
            </View>
            <View style={[styles.arrowBadge, { backgroundColor: '#eef4fb' }]}>
              <Text style={[styles.arrowText, { color: '#1d3557' }]}>→</Text>
            </View>
          </Pressable>

          {/* Assisted-Service Operator Card */}
          <Pressable
            style={({ pressed }) => [
              styles.roleCard,
              { borderLeftColor: '#e76f51' },
              pressed && styles.cardPressed,
            ]}
            onPress={() => router.push('/(operator)')}
            android_ripple={{ color: '#ffe8d6' }}
          >
            <View style={styles.roleCardContent}>
              <View style={[styles.roleIconBadge, { backgroundColor: '#ffe8d6' }]}>
                <Text style={styles.roleIconText}>🤝</Text>
              </View>
              <View style={styles.roleTextContainer}>
                <Text style={styles.roleTitle}>Assisted-Service Operator</Text>
                <Text style={styles.roleDescription}>
                  Assist non-digital and feature-phone farmers with registration & bookings
                </Text>
              </View>
            </View>
            <View style={[styles.arrowBadge, { backgroundColor: '#fdf2eb' }]}>
              <Text style={[styles.arrowText, { color: '#e76f51' }]}>→</Text>
            </View>
          </Pressable>
        </View>

        {/* Footer info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Phase 0 Mobile App Architecture</Text>
          <Text style={styles.footerSubtext}>React Native · Expo Router · Android & iOS</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1b4332',
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#f6f8f6',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  govtBadge: {
    backgroundColor: '#d8f3dc',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    marginBottom: 12,
  },
  govtBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1b4332',
    letterSpacing: 0.8,
  },
  appName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#1b4332',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  taglineContainer: {
    alignItems: 'center',
  },
  taglineItem: {
    fontSize: 15,
    fontWeight: '600',
    color: '#344e41',
    lineHeight: 22,
  },
  selectionSection: {
    marginBottom: 24,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1b4332',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6c757d',
    marginBottom: 18,
  },
  roleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  roleCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  roleIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  roleIconText: {
    fontSize: 20,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#212529',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 12,
    color: '#555555',
    lineHeight: 16,
  },
  arrowBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 16,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#495057',
    marginBottom: 2,
  },
  footerSubtext: {
    fontSize: 11,
    color: '#868e96',
  },
});
