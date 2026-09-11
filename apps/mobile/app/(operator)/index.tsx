import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Assisted-Service Operator Home Screen (Phase 0 Foundation)
 * Placeholder route for Operator assistance workflows.
 * FR-01, FR-06, FR-07
 */
export default function OperatorHomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>Operator Portal</Text>
          <Text style={styles.title}>Assisted Service</Text>
          <Text style={styles.subtitle}>
            Assist walk-in farmers with registrations, slot bookings, and token inquiries.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Features (Phase 3+)</Text>
          <Text style={styles.featureItem}>• Assisted Farmer Onboarding & Profile Registration</Text>
          <Text style={styles.featureItem}>• On-demand Slot Booking on behalf of Farmers</Text>
          <Text style={styles.featureItem}>• Physical Slip / Token Printing & Status Inquiries</Text>
          <Text style={styles.featureItem}>• Farmer Lookup by Mobile Number</Text>
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
  safeArea: { flex: 1, backgroundColor: '#FFF7ED' },
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 20 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFEDD5',
    color: '#9A3412',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#7C2D12', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#9A3412', lineHeight: 22 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#FED7AA',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#7C2D12', marginBottom: 12 },
  featureItem: { fontSize: 14, color: '#374151', marginBottom: 8, lineHeight: 20 },
  backButton: {
    backgroundColor: '#EA580C',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
