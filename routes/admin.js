const { getAddProduct, getProductList, postAddProduct, deleteProduct, getEditProduct, putEditProduct } = require("../controllers/admin")
module.exports = ({ router }) => {
  router.get('/product/create/', getAddProduct)
  router.get('/product/edit/:id/', getEditProduct)
  router.post('/product/edit/', putEditProduct)
  router.post('/product/delete/:id/', deleteProduct)
  router.get('/product/list/', getProductList)
  router.post('/product/create/', postAddProduct)
  return router
}