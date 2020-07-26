const Product = require('./../models/product')
const Cart = require('../models/cart')
const { getById } = require('./../models/utils')
const { append } = require('ramda')

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
  const cart = await Cart.getItems()
  const products = await Product.fetchAll()

  const cartItems = products.reduce((acc, i) => {
    const item = getById(cart.products, i.id)
    if (item) {
      acc = append({ ...item, ...i }, acc)
    }
    return acc
  }, [])

  console.log(cartItems)

  res.render('shop/cart', {
    pageTitle: 'Your cart page',
    path: '/cart/',
    products: cartItems
  })
}

exports.postCart = async (req, res, next) => {
  const { id } =  req.body
  try {
    const product = await Product.findById(id)
    Cart.addProduct(id, product.price)
  } catch (error) {
    console.log(error)
  }
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

exports.deleteCartItem = async (req, res, next) => {
  await Cart.deleteProduct(req.params.id, req.body.price)
  res.redirect('/cart/')
}
