import './globals.css';
import type {Metadata} from 'next';
import {ReactNode} from 'react';

export const metadata: Metadata = {
  title: 'Doan Quoc Viet',
  description: 'Portfolio website of Doan Quoc Viet',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({children}: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
