import { Inter } from 'next/font/google';
import '../../globals.css';
import { ReduxProvider } from '@/redux/provider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-gray-900 flex items-center justify-center min-h-screen ${inter.className}`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
