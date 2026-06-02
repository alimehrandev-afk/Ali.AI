import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Ali.AI - Premium AI Conversations',
  description: 'Experience the future of AI conversations with Ali.AI. Create, manage, and explore unlimited possibilities.',
  keywords: ['AI', 'ChatGPT', 'SaaS', 'Conversations', 'Machine Learning'],
  authors: [{ name: 'Ali Mehran' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark-950 text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
