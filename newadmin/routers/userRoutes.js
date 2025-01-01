const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated } = require('../middlewares/authMiddleware');
const { isUser } = require('../middlewares/roleMiddleware');

router.use(isAuthenticated, isUser);

router.get('/products', cartController.getProducts);
router.get('/cart', cartController.getCart);
router.post('/cart', cartController.addToCart);
router.post('/cart/remove', cartController.removeFromCart);

module.exports = router;
