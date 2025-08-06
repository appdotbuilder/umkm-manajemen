<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku')->unique()->comment('Stock Keeping Unit');
            $table->text('description')->nullable();
            $table->decimal('purchase_price', 10, 2)->comment('Harga beli');
            $table->decimal('selling_price', 10, 2)->comment('Harga jual');
            $table->integer('stock')->default(0)->comment('Stok saat ini');
            $table->integer('min_stock')->default(0)->comment('Minimum stok');
            $table->string('unit')->default('pcs')->comment('Satuan barang');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('name');
            $table->index('sku');
            $table->index('status');
            $table->index('stock');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};