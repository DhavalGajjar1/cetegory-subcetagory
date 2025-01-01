const User = require('../models/User');
const Product = require('../models/Product');

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.session.user.id).populate('cart.productId');
    res.render('user/cart', { cart: user.cart });
  } catch (err) {
    res.status(500).send('Error fetching cart');
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.session.user.id);
    const productIndex = user.cart.findIndex((item) => item.productId.toString() === productId);

    if (productIndex > -1) {
      user.cart[productIndex].quantity += parseInt(quantity, 10);
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.redirect('/user/cart');
  } catch (err) {
    res.status(500).send('Error adding to cart');
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.session.user.id);
    user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
    await user.save();
    res.redirect('/user/cart');
  } catch (err) {
    res.status(500).send('Error removing from cart');
  }
};
