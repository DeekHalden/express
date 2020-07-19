const R = require('ramda')

const Product = require("../models/product")


exports.getAddProduct = (req, res, next) => {
  res.render('admin/product-create', {
    pageTitle: 'Add product',
    path: '/admin/product/create/',
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
    console.log(req)
    const product = R.find(R.propEq('title', req.body))
    // console.log(products)
    
  } catch (error) {
    
  }
  // res.redirect('/admin/product/list/')
}