import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Farmer Home Screen (Phase 0 Foundation)
 * Placeholder route for Farmer user journey.
 * FR-01, FR-04, FR-05, FR-06, FR-07, FR-08, FR-15, FR-16
 */
export default function FarmerHomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>Farmer Portal</Text>
          <Text style={styles.title}>Welcome, Farmer</Text>
          <Text style={styles.subtitle}>
            Manage crop procurement, time-slot bookings, and track payment status.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Features (Phase 2+)</Text>
          <Text style={styles.featureItem}>• Smart Procurement Centre Discovery</Text>
          <Text style={styles.featureItem}>• Advance Slot Booking & Token Generation</Text>
          <Text style={styles.featureItem}>• Real-time Live Queue & Dynamic ETA</Text>
          <Text style={styles.featureItem}>• End-to-end Procurement & Payment Timeline</Text>
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/')}
          activeOpacity={0.8}
        >
          <Text style={styles.backButtonText}>← Switch Role</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F0FDF4' },
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 20 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    color: '#166534',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#14532D', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#166534', lineHeight: 22 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#14532D', marginBottom: 12 },
  featureItem: { fontSize: 14, color: '#374151', marginBottom: 8, lineHeight: 20 },
  backButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
