import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * KisanFlow — Mobile Role Selection Screen (Phase 0 Foundation)
 * Allows role navigation between Farmer, Procurement Officer, and Assisted-Service Operator.
 */
export default function IndexScreen() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>KisanFlow</Text>
        <Text style={styles.tagline}>
          Smart Procurement.{'\n'}Less Waiting.{'\n'}More Transparency.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.selectPrompt}>Select Role</Text>

        <TouchableOpacity
          style={[styles.roleButton, styles.farmerButton]}
          onPress={() => router.push('/(farmer)')}
          activeOpacity={0.8}
        >
          <Text style={styles.roleButtonTitle}>Farmer</Text>
          <Text style={styles.roleButtonDesc}>
            Book slots, track live queues & monitor payments
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, styles.officerButton]}
          onPress={() => router.push('/(officer)')}
          activeOpacity={0.8}
        >
          <Text style={styles.roleButtonTitle}>Procurement Officer</Text>
          <Text style={styles.roleButtonDesc}>
            Manage centre queues, weighing & quality checks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.roleButton, styles.operatorButton]}
          onPress={() => router.push('/(operator)')}
          activeOpacity={0.8}
        >
          <Text style={styles.roleButtonTitle}>Assisted-Service Operator</Text>
          <Text style={styles.roleButtonDesc}>
            Help walk-in farmers register & book tokens
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.phaseBadge}>Phase 0 — Foundation Architecture</Text>
      </View>

      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#15803D',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 18,
    lineHeight: 26,
    color: '#166534',
    textAlign: 'center',
    fontWeight: '500',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectPrompt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  roleButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  farmerButton: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  officerButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#93C5FD',
  },
  operatorButton: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FDBA74',
  },
  roleButtonTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  roleButtonDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  footer: {
    marginTop: 24,
  },
  phaseBadge: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
});
