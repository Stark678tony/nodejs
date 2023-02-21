const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Product, Category } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a new product and category
app.post('/create', async (req, res) => {
  try {
    const category = new Category(req.body.category);
    const savedCategory = await category.save();
    const product = new Product({ ...req.body.product, categoryId: savedCategory._id });
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read a particular product (including its category)
app.get('/read/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('categoryId');
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all products (including their categories)
app.get('/readAll', async (req, res) => {
  try {
    const products = await Product.find().populate('categoryId');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
