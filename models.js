const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  qtyPerUnit: String,
  unitPrice: Number,
  unitInStock: Number,
  discontinued: Boolean,
  categoryId: String
});

const categorySchema = new mongoose.Schema({
  categoryId: String,
  categoryName: String
});

const Product = mongoose.model('Product', productSchema, 'products');
const Category = mongoose.model('Category', categorySchema, 'categories');

module.exports = { Product, Category };
