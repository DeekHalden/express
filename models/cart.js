const fs = require('fs').promises

const { getPath, getById, getIndexById, getItemsFromFile, saveItemsToFile } = require('./utils')
const { adjust, remove } = require('ramda')

const FILENAME = 'cart.json'

module.exports = class Cart {

  static async getItems() {
    let cart = {
      products: [],
      totalPrice: 0
    }
    try {
      cart = await getItemsFromFile(FILENAME)
      return cart
    } catch (error) {
      console.log(error)
      return cart
    }
  }

  static async addProduct(id, productPrice) {
    let cart = {
      products: [],
      totalPrice: 0
    }
    try {
      cart = await this.getItems()
    } catch (err) {
      console.log('error here ', err)
    }
    

    const existingProductIndex = getIndexById(cart.products, id)
    const existingProduct = getById(cart.products, id)

    if (existingProduct) {
      cart.products = adjust(
        existingProductIndex,
        v => ({
          ...existingProduct,
          qty: existingProduct.qty + 1
        }),
        cart.products
      )

    } else {
      cart.products = [...cart.products, {
        id: id,
        qty: 1
      }]
    }
    cart.totalPrice += parseFloat(productPrice)
    try {
      const res = await saveItemsToFile(FILENAME, cart)

    } catch (err) {
      console.log(err)
    }
  }

  static async deleteProduct(id, productPrice) {
    let cart = {
      products: [],
      totalPrice: 0
    }

    try {
      cart = await this.getItems()
      const index = getIndexById(cart.products, id)
      const product = cart.products[index]

      cart.totalPrice -= productPrice * product.qty
      cart.products = remove(index, 1, cart.products)

    } catch (error) {
      console.log(error)
    }

    try {
      await saveItemsToFile(FILENAME, cart)
    } catch (error) {
      console.log(error)
    }
  }
}