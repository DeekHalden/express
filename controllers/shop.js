const Product = require('./../models/product')

exports.getIndex = async (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'Shop',
    path: '/',
    products: await Product.fetchAll()
  })
}

exports.getProducts = async (req, res, next) => {
  res.render('shop/product-list', {
    pageTitle: 'All products',
    path: '/product-list/',
    products: await Product.fetchAll()
  })
}

exports.getProduct = async (req, res, next) => {
  const { productId } = req.params
  try {
    const product = await Product.findById(productId)
    res.render('shop/product-detail', {
      pageTitle: `Product ${product.title}`,
      product: product
    })
  } catch (error) {
    console.log(error)
  }
  
}

exports.getCart = async (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your cart page',
    path: '/cart/',
  })
}

exports.postCart = async (req, res, next) => {
  const { id } =  req.body
  console.log(id)
  res.redirect('/cart/')
}


exports.getCheckout = async (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout/',
  })
}

exports.getOrders = async (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Your orders',
    path: '/orders/',
  })
}
