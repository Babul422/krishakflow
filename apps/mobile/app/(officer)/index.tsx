import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Procurement Officer Home Screen (Phase 0 Foundation)
 * Placeholder route for Procurement Officer operational workflow.
 * FR-11, FR-12, FR-13, FR-14, FR-17, FR-18
 */
export default function OfficerHomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badge}>Officer Portal</Text>
          <Text style={styles.title}>Procurement Operations</Text>
          <Text style={styles.subtitle}>
            Manage centre queues, arrival verification, weighing, and quality inspection.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Upcoming Features (Phase 3+)</Text>
          <Text style={styles.featureItem}>• Real-time Centre Queue Controls (Call next, Skip, Recall)</Text>
          <Text style={styles.featureItem}>• Farmer Arrival & Digital Token Verification</Text>
          <Text style={styles.featureItem}>• Weighing Scale Entry & Quality Inspection Recording</Text>
          <Text style={styles.featureItem}>• Daily Centre Analytics & Operational Dashboard</Text>
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
  safeArea: { flex: 1, backgroundColor: '#EFF6FF' },
  container: { flex: 1, padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 20 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1E3A8A', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#1E40AF', lineHeight: 22 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1E3A8A', marginBottom: 12 },
  featureItem: { fontSize: 14, color: '#374151', marginBottom: 8, lineHeight: 20 },
  backButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
