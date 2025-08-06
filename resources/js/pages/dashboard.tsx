import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    stats: {
        todaySales: number;
        monthlySales: number;
        totalSales: number;
        todayPurchases: number;
        monthlyPurchases: number;
        totalProducts: number;
        lowStockProducts: number;
        totalCustomers: number;
        totalSuppliers: number;
    };
    recentSales: Array<{
        id: number;
        invoice_number: string;
        total_amount: number;
        sale_date: string;
        customer: {
            name: string;
        } | null;
        user: {
            name: string;
        };
    }>;
    recentPurchases: Array<{
        id: number;
        invoice_number: string;
        total_amount: number;
        purchase_date: string;
        supplier: {
            name: string;
        } | null;
        user: {
            name: string;
        };
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function Dashboard({ stats, recentSales, recentPurchases }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Dashboard UMKM</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Ringkasan aktivitas bisnis Anda hari ini
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {/* Today's Sales */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Penjualan Hari Ini</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(stats.todaySales)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Sales */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Penjualan Bulan Ini</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatCurrency(stats.monthlySales)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.totalSales} transaksi
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Produk</p>
                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                    {stats.totalProducts}
                                </p>
                                {stats.lowStockProducts > 0 && (
                                    <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                                        ⚠️ {stats.lowStockProducts} stok rendah
                                    </p>
                                )}
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    {/* Customers */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pelanggan</p>
                                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                    {stats.totalCustomers}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {stats.totalSuppliers} supplier
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                💰 Penjualan Terbaru
                            </h3>
                        </div>
                        <div className="p-6">
                            {recentSales.length > 0 ? (
                                <div className="space-y-4">
                                    {recentSales.map((sale) => (
                                        <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {sale.invoice_number}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {sale.customer?.name || 'Walk-in Customer'} • 
                                                    {new Date(sale.sale_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-green-600 dark:text-green-400">
                                                    {formatCurrency(sale.total_amount)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    Belum ada transaksi penjualan
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Purchases */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                🛒 Pembelian Terbaru
                            </h3>
                        </div>
                        <div className="p-6">
                            {recentPurchases.length > 0 ? (
                                <div className="space-y-4">
                                    {recentPurchases.map((purchase) => (
                                        <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {purchase.invoice_number}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {purchase.supplier?.name || 'Supplier tidak tercatat'} • 
                                                    {new Date(purchase.purchase_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-red-600 dark:text-red-400">
                                                    {formatCurrency(purchase.total_amount)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                    Belum ada transaksi pembelian
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">⚡ Aksi Cepat</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a
                            href="/sales/create"
                            className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                            <span className="text-2xl">💰</span>
                            <span className="font-medium text-green-700 dark:text-green-300">Buat Penjualan</span>
                        </a>
                        <a
                            href="/products/create"
                            className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <span className="text-2xl">📦</span>
                            <span className="font-medium text-blue-700 dark:text-blue-300">Tambah Produk</span>
                        </a>
                        <a
                            href="/customers/create"
                            className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <span className="text-2xl">👤</span>
                            <span className="font-medium text-purple-700 dark:text-purple-300">Tambah Pelanggan</span>
                        </a>
                        <a
                            href="/suppliers/create"
                            className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        >
                            <span className="text-2xl">🏪</span>
                            <span className="font-medium text-orange-700 dark:text-orange-300">Tambah Supplier</span>
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}