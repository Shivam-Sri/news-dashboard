import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 fixed w-full top-0 z-50">
        <div className="max-w-full px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/vercel.svg"
                alt="Logo"
                width={32}
                height={32}
                className="dark:invert"
              />
              <span className="ml-2 text-xl font-semibold">News Dashboard</span>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-screen pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Welcome to News Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your central hub for global news and analytics
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/dashboard" 
                className="group p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/10">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Analytics Dashboard
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  View comprehensive analytics and insights about news articles and authors
                </p>
              </Link>

              <Link href="/news"
                className="group p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/10">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2" />
                    </svg>
                  </div>
                  <h2 className="ml-4 text-xl font-semibold group-hover:text-green-600 dark:group-hover:text-green-400">
                    News Feed
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse and search through the latest cryptocurrency news and updates
                </p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
