import React from 'react';
import { APP_NAME, APP_DESCRIPTION, formatRoleName } from '@kisanflow/shared';

export default function AdminLandingPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '640px', width: '100%', background: '#ffffff', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: '#ecfdf5', color: '#065f46', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem' }}>
          Phase 0 Foundation
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: '#1e293b' }}>
          {APP_NAME} Admin Portal
        </h1>
        <p style={{ fontSize: '1.125rem', color: '#64748b', margin: '0 0 1.5rem 0' }}>
          {APP_DESCRIPTION}
        </p>

        <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: '8px', marginBottom: '1.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#334155', lineHeight: 1.6 }}>
            <strong>Target Role:</strong> {formatRoleName('admin')}
            <br />
            <strong>Status:</strong> Foundation architecture ready. Analytics dashboard features and backend connection will be configured in subsequent phases.
          </p>
        </div>

        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          KisanFlow SIH Project · Monorepo Foundation Phase 0
        </div>
      </div>
    </main>
  );
}
