<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->numberBetween(10000, 500000);
        $taxAmount = $subtotal * 0.1; // 10% tax
        $totalAmount = $subtotal + $taxAmount;
        $paidAmount = $totalAmount + $this->faker->numberBetween(0, 50000); // Sometimes overpaid
        $changeAmount = max(0, $paidAmount - $totalAmount);
        
        return [
            'invoice_number' => 'INV-' . date('Ymd') . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'customer_id' => $this->faker->optional()->randomElement(Customer::pluck('id')->toArray()),
            'user_id' => User::factory(),
            'sale_date' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'subtotal' => $subtotal,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'paid_amount' => $paidAmount,
            'change_amount' => $changeAmount,
            'payment_method' => $this->faker->randomElement(['cash', 'bank_transfer', 'credit_card', 'other']),
            'status' => $this->faker->randomElement(['pending', 'completed', 'cancelled']),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}