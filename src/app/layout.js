import { AuthProvider } from '@/contexts/AuthContext';
// import { GeistSans } from 'geist/font';
import "./globals.css";

// const geistSans = GeistSans;

export const metadata = {
  title: 'News Payout Dashboard',
  description: 'Manage and calculate news article payouts',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
