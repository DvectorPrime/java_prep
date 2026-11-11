import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'COS 202 Java Exam-Prep | Faculty of Computing, UI',
  description: 'Preset practical Java exam questions with strict AI grading and self-check for University of Ibadan students.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
        <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
          <p>COS 202: Advanced Object-Oriented Programming (Java) • University of Ibadan</p>
          <p className="mt-1 text-[11px] text-slate-600">
            Powered by Groq High-Speed Inference • LAN and Hotspot Compatible
          </p>
        </footer>
      </body>
    </html>
  );
}
