<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class UMKMSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create test user
        $user = User::where('email', 'test@example.com')->first() 
               ?? User::factory()->create(['email' => 'test@example.com']);

        // Create suppliers
        $suppliers = Supplier::factory(5)->create();

        // Create customers
        $customers = Customer::factory(20)->create();

        // Create products with realistic Indonesian product names
        $productNames = [
            'Beras Premium 5kg',
            'Minyak Goreng Tropical 2L',
            'Gula Pasir Gulaku 1kg',
            'Telur Ayam Kampung 1kg',
            'Kopi Kapal Api Bubuk 200g',
            'Teh Sariwangi Celup 25pcs',
            'Susu Kental Manis 370ml',
            'Sabun Mandi Lifebuoy 85g',
            'Shampo Head & Shoulders 170ml',
            'Pasta Gigi Pepsodent 120g',
            'Deterjen Rinso Matic 770g',
            'Tissue Paseo 250s',
            'Air Mineral Aqua 600ml',
            'Indomie Goreng Original',
            'Roti Tawar Sari Roti',
        ];

        $products = collect($productNames)->map(function ($name, $index) {
            return Product::factory()->create([
                'name' => $name,
                'sku' => 'SKU' . str_pad((string)($index + 1), 3, '0', STR_PAD_LEFT),
            ]);
        });

        // Create some sales transactions with realistic data
        for ($i = 0; $i < 15; $i++) {
            $saleDate = Carbon::now()->subDays(random_int(0, 30));
            
            $sale = Sale::create([
                'invoice_number' => 'INV-' . $saleDate->format('Ymd') . '-' . str_pad((string)($i + 1), 4, '0', STR_PAD_LEFT),
                'customer_id' => $customers->random()->id,
                'user_id' => $user->id,
                'sale_date' => $saleDate,
                'subtotal' => 0, // Will be calculated
                'tax_amount' => 0, // Will be calculated
                'total_amount' => 0, // Will be calculated
                'paid_amount' => 0, // Will be calculated
                'change_amount' => 0, // Will be calculated
                'payment_method' => collect(['cash', 'bank_transfer', 'credit_card'])->random(),
                'status' => 'completed',
                'notes' => random_int(1, 3) === 1 ? 'Pelanggan regular' : null,
            ]);

            // Add 1-5 items to each sale
            $itemCount = random_int(1, 5);
            $subtotal = 0;

            for ($j = 0; $j < $itemCount; $j++) {
                $product = $products->random();
                $quantity = random_int(1, 5);
                $unitPrice = (float)$product->selling_price;
                $totalPrice = $quantity * $unitPrice;

                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                ]);

                $subtotal += $totalPrice;
            }

            // Update sale totals
            $taxAmount = $subtotal * 0.1; // 10% tax
            $totalAmount = $subtotal + $taxAmount;
            $paidAmount = $totalAmount + random_int(0, 10000); // Sometimes overpaid
            $changeAmount = max(0, $paidAmount - $totalAmount);

            $sale->update([
                'subtotal' => $subtotal,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'paid_amount' => $paidAmount,
                'change_amount' => $changeAmount,
            ]);
        }

        // Create some products with low stock for testing alert functionality
        Product::factory(3)->create([
            'stock' => random_int(1, 5),
            'min_stock' => random_int(10, 20),
        ]);
    }
}