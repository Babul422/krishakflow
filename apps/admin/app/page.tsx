/**
 * KisanFlow — Government Administrator Dashboard Shell
 * Phase 0 Foundation Architecture
 *
 * Traceable requirements:
 * - FR-19: System KPIs, centre workload, crop/district analytics, pending payments
 * - FR-20: Congestion predictions
 * - FR-21: Operational recommendations
 */

export default function AdminDashboardPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', color: '#0F172A', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Top Navigation */}
      <header style={{ backgroundColor: '#1E3A8A', color: '#FFFFFF', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.025em', margin: 0 }}>KisanFlow</h1>
          <p style={{ fontSize: '0.875rem', color: '#BFDBFE', margin: '0.25rem 0 0 0' }}>Government Procurement & Queue Administration</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ backgroundColor: '#1D4ED8', color: '#EFF6FF', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
            Phase 0 — Foundation
          </span>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
            GA
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', margin: 0 }}>Executive Overview</h2>
          <p style={{ fontSize: '0.95rem', color: '#64748B', marginTop: '0.25rem' }}>
            State-wide crop procurement, centre congestion monitoring, and queue metrics.
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Farmers</span>
            <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>--</div>
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>Live sync in Phase 5</span>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Procurement Volume</span>
            <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>-- MT</div>
            <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>Live sync in Phase 5</span>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Waiting Time</span>
            <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>-- mins</div>
            <span style={{ fontSize: '0.75rem', color: '#6366F1', fontWeight: 500 }}>Dynamic ETA engine</span>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Active Centres</span>
            <div style={{ fontSize: '1.875rem', fontWeight: 800, color: '#0F172A', marginTop: '0.5rem' }}>--</div>
            <span style={{ fontSize: '0.75rem', color: '#F59E0B', fontWeight: 500 }}>All districts</span>
          </div>
        </div>

        {/* Feature Modules Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E293B', marginTop: 0, marginBottom: '0.75rem' }}>
              📊 Centre-wise Workload & Congestion
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Visual heatmap and district-level breakdown of queue sizes, active counters, and predicted peak congestion periods.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#F1F5F9', borderRadius: '8px', fontSize: '0.8rem', color: '#64748B' }}>
              Ready for Supabase analytics view connection in Phase 5.
            </div>
          </div>

          <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1E293B', marginTop: 0, marginBottom: '0.75rem' }}>
              🌾 Crop Procurement & Disbursement Status
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
              Real-time audit of accepted crop quantities against MSP rates, verified quality reports, and simulated payment disbursement batches.
            </p>
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#F1F5F9', borderRadius: '8px', fontSize: '0.8rem', color: '#64748B' }}>
              Ready for Supabase procurement queries in Phase 5.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
