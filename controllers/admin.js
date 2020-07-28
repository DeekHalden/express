const R = require('ramda')

const Product = require("../models/product")
const Cart = require('../models/cart')


exports.getAddProduct = (req, res, next) => {
  res.render('admin/product-edit', {
    pageTitle: 'Add product',
    path: '/admin/product/create/',
    product: {},
    editing: false,
  })
}

exports.postAddProduct = async (req, res) => {
  try {
    await new Product(req.body).save()
    res.redirect('/products/')
  } catch (error) {
    console.log(error)
  }
}

exports.getEditProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    res.render('admin/product-edit', {
      pageTitle: 'Edit product',
      path: '/admin/product/edit/',
      product: product,
      editing: true,
    })
  } catch (error) {
    console.log(error)
    res.status(404).render('404')
  }
}

exports.putEditProduct = async (req, res) => {
  try {
    await Product.update(req.body)
    res.redirect('/products/')
  } catch (error) {
    console.log('error happened ', error)
  }
}

exports.getProductList = async (req, res, next) => {
  res.render('admin/product-list', {
    pageTitle: 'Admin product list',
    path: '/admin/product/list/',
    products: await Product.fetchAll(),
  })
}



exports.deleteProduct = async (req, res, next) => {
  try {
    const products = await Product.fetchAll()
    await Product.delete(req.params.id)
    await Cart.deleteProduct(req.params.id, req.body.price)
    res.redirect('/admin/products/')
  } catch (error) {
    console.log(error)
  }
  // res.redirect('/admin/product/list/')
}