const Product = require('../models/Product');

exports.getAdminDashboard = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin/dashboard', { products });
  } catch (err) {
    res.status(500).send('Error loading dashboard');
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render(req.session.user.role === 'admin' ? 'admin/products' : 'user/products', { products });
  } catch (err) {
    res.status(500).send('Error fetching products');
  }
};

exports.addProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const newProduct = new Product({ name, description, price, stock });
    await newProduct.save();
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error adding product');
  }
};

exports.editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  try {
    await Product.findByIdAndUpdate(id, { name, description, price, stock });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error editing product');
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send('Error deleting product');
  }
};
