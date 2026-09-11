import React from 'react';

export const metadata = {
  title: 'KisanFlow Admin — Government Administrator Portal',
  description: 'Intelligent crop procurement analytics and administration platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f8fafc', color: '#0f172a' }}>
        {children}
      </body>
    </html>
  );
}
