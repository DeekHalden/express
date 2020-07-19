const { getProducts, getCart, getCheckout, getIndex, getOrders, getProduct } = require("../controllers/shop")

module.exports = ({router}) => {
  router.get('/', getIndex)
  router.get('/products/', getProducts)
  router.get('/products/:productId/', getProduct)
  router.get('/cart/', getCart)
  router.get('/orders/', getOrders)
  router.get('/checkout/', getCheckout)
  return router
}