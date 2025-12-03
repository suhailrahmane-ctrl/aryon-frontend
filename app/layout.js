import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Aryon – AI by AFG Patriotic',
  description: 'Chat, Image & Video AI from Afghanistan',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-indigo-700 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Aryon</h1>
            <nav className="flex space-x-6 text-sm">
              <Link href="/chat" className="hover:underline">Chat</Link>
              <Link href="/image" className="hover:underline">Image</Link>
              <Link href="/video" className="hover:underline">Video</Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <footer className="text-center py-4 text-gray-600 text-sm">
          © {new Date().getFullYear()} AFG Patriotic • Made in Afghanistan
        </footer>
      </body>
    </html>
  );
}
