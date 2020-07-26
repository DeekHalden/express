const {
  getProducts,
  getCart,
  getCheckout,
  getIndex,
  getOrders,
  getProduct,
  postCart,
  deleteCartItem,
} = require("../controllers/shop")

module.exports = ({ router }) => {
  router.get('/', getIndex)
  router.get('/products/', getProducts)
  router.get('/products/:productId/', getProduct)
  router.get('/cart/', getCart)
  router.post('/cart/', postCart)
  router.post('/cart/item/:id/delete/', deleteCartItem)
  router.get('/orders/', getOrders)
  router.get('/checkout/', getCheckout)
  return router
}