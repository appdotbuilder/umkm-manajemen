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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('supplier_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->datetime('purchase_date');
            $table->decimal('subtotal', 12, 2)->comment('Total sebelum pajak');
            $table->decimal('tax_amount', 10, 2)->default(0)->comment('Jumlah pajak');
            $table->decimal('total_amount', 12, 2)->comment('Total setelah pajak');
            $table->decimal('paid_amount', 12, 2)->default(0)->comment('Jumlah yang dibayar');
            $table->enum('payment_method', ['cash', 'bank_transfer', 'credit_card', 'other'])->default('cash');
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('completed');
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('invoice_number');
            $table->index('supplier_id');
            $table->index('purchase_date');
            $table->index('status');
            $table->index(['purchase_date', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};