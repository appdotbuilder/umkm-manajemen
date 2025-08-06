<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $purchasePrice = $this->faker->numberBetween(5000, 100000);
        $sellingPrice = $purchasePrice + ($purchasePrice * $this->faker->randomFloat(2, 0.2, 0.8));
        
        return [
            'name' => $this->faker->words(random_int(2, 4), true),
            'sku' => strtoupper($this->faker->unique()->bothify('??##??')),
            'description' => $this->faker->optional()->paragraph(),
            'purchase_price' => $purchasePrice,
            'selling_price' => $sellingPrice,
            'stock' => $this->faker->numberBetween(0, 500),
            'min_stock' => $this->faker->numberBetween(5, 50),
            'unit' => $this->faker->randomElement(['pcs', 'kg', 'liter', 'box', 'pack']),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}