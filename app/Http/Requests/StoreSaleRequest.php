<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'nullable|exists:customers,id',
            'sale_date' => 'required|date',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'tax_amount' => 'required|numeric|min:0',
            'paid_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,bank_transfer,credit_card,other',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'sale_date.required' => 'Tanggal penjualan harus diisi.',
            'items.required' => 'Item penjualan harus diisi.',
            'items.min' => 'Minimal harus ada satu item.',
            'items.*.product_id.required' => 'Produk harus dipilih.',
            'items.*.quantity.required' => 'Jumlah harus diisi.',
            'items.*.unit_price.required' => 'Harga satuan harus diisi.',
            'paid_amount.required' => 'Jumlah pembayaran harus diisi.',
            'payment_method.required' => 'Metode pembayaran harus dipilih.',
        ];
    }
}