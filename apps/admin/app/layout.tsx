import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KisanFlow — Government Admin Dashboard',
  description:
    'Government administrator dashboard for KisanFlow crop procurement management.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
