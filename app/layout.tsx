import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "트리오브세이비어M 가이드북",
  description: "트리오브세이비어M 펠로우 가이드북",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-14">
              <a href="/" className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ToSM <span className="text-amber-500">가이드북</span>
                </span>
              </a>
              <nav className="ml-8 flex gap-4">
                <a
                  href="/fellows"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  펠로우
                </a>
                <a
                  href="/cupals"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  큐폴
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
