<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key statistics.
     */
    public function index()
    {
        // Get today's statistics
        $today = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        // Sales statistics
        $todaySales = Sale::whereDate('sale_date', $today)->completed()->sum('total_amount');
        $monthlySales = Sale::where('sale_date', '>=', $thisMonth)->completed()->sum('total_amount');
        $totalSales = Sale::completed()->count();

        // Purchase statistics
        $todayPurchases = Purchase::whereDate('purchase_date', $today)->completed()->sum('total_amount');
        $monthlyPurchases = Purchase::where('purchase_date', '>=', $thisMonth)->completed()->sum('total_amount');

        // Product statistics
        $totalProducts = Product::active()->count();
        $lowStockProducts = Product::lowStock()->active()->count();

        // Customer and supplier counts
        $totalCustomers = Customer::active()->count();
        $totalSuppliers = Supplier::active()->count();

        // Recent transactions
        $recentSales = Sale::with(['customer', 'user'])
            ->latest('sale_date')
            ->limit(5)
            ->get();

        $recentPurchases = Purchase::with(['supplier', 'user'])
            ->latest('purchase_date')
            ->limit(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'todaySales' => $todaySales,
                'monthlySales' => $monthlySales,
                'totalSales' => $totalSales,
                'todayPurchases' => $todayPurchases,
                'monthlyPurchases' => $monthlyPurchases,
                'totalProducts' => $totalProducts,
                'lowStockProducts' => $lowStockProducts,
                'totalCustomers' => $totalCustomers,
                'totalSuppliers' => $totalSuppliers,
            ],
            'recentSales' => $recentSales,
            'recentPurchases' => $recentPurchases,
        ]);
    }
}