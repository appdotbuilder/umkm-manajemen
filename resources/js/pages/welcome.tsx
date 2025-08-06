import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="UMKM Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">📊</span>
                                </div>
                                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">UMKM Manager</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <div className="flex space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            Daftar
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                            📊 Sistem Manajemen UMKM
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Kelola inventaris, transaksi, pelanggan, dan laporan keuangan bisnis UMKM Anda dalam satu platform terintegrasi
                        </p>
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                                >
                                    🚀 Mulai Gratis
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
                                >
                                    💼 Masuk ke Akun
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">📦</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Manajemen Inventaris</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Kelola stok produk, pantau minimum stok, dan atur informasi produk secara detail
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">💰</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Transaksi Penjualan</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Catat penjualan dengan mudah, generate invoice otomatis, dan kelola pembayaran
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">🛒</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Transaksi Pembelian</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Kelola pembelian dari supplier, update stok otomatis, dan kontrol biaya operasional
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                                <span className="text-2xl">👥</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Data Pelanggan & Supplier</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Simpan informasi pelanggan dan supplier untuk mempermudah transaksi bisnis
                            </p>
                        </div>
                    </div>

                    {/* Key Benefits */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                📈 Fitur Unggulan untuk UMKM
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                                Semua yang Anda butuhkan untuk mengelola bisnis UMKM dengan lebih efisien dan terorganisir
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Dashboard Lengkap</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Monitor penjualan harian, bulanan, dan stok produk dalam satu tampilan</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Invoice Otomatis</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Generate nomor invoice otomatis untuk setiap transaksi</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Notifikasi Stok Rendah</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Peringatan otomatis ketika stok produk mencapai batas minimum</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Multi Payment Method</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Dukung berbagai metode pembayaran: tunai, transfer, kartu kredit</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Laporan Keuangan</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Laporan penjualan, pembelian, dan profit margin secara real-time</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Pencarian & Filter</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Cari produk, transaksi, dan data lainnya dengan mudah</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Data Aman</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Sistem autentikasi dan perlindungan data yang terpercaya</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-600 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">Interface Modern</h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Tampilan responsif yang mudah digunakan di desktop dan mobile</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    {!auth.user && (
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                            <h2 className="text-3xl font-bold mb-4">🎯 Siap Tingkatkan Bisnis UMKM Anda?</h2>
                            <p className="text-xl opacity-90 mb-6">
                                Bergabung dengan ribuan UMKM yang sudah mempercayai sistem kami
                            </p>
                            <Link
                                href={route('register')}
                                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl inline-block"
                            >
                                ⚡ Mulai Sekarang - Gratis!
                            </Link>
                        </div>
                    )}
                </main>

                <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <p className="text-gray-400">
                                © 2024 UMKM Management System. Built with ❤️ for Indonesian SMEs.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}