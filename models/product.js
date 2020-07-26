const fs = require('fs').promises
const path = require('path')
const { v4: uuid } = require('uuid');
const R = require('ramda')
const { getById, getIndexById, getItemsFromFile, saveItemsToFile} = require('./utils')
const { FILE } = require('dns')
const FILENAME = 'products.json'


module.exports = class Product {
  constructor({ title, image, description, price, id } = {}) {
    this.title = title
    this.image = image
    this.description = description
    this.price = price
    this.id = id || uuid()
  }

  static async update(data) {
    try {
      const product = await this.findById(data.id)
      console.log('product here ', product)
      if (product) {
        const index = getIndexById(data.id)
        let products = await getItemsFromFile(FILENAME)
        products = R.adjust(index, v => data, products)
        await saveItemsToFile(FILENAME, products)
        return products
      }
    } catch (error) {
      console.log('error happened here', error)
    }

  }

  static async delete(id) {
    try {
      let products = await getItemsFromFile(FILENAME)
      const index = getIndexById(id)
      products = R.remove(index, 1, products)
      await saveItemsToFile(FILENAME, products)
    } catch (error) {
      console.log(error)
    }
  }

  async save() {
    try {
      const products = await getItemsFromFile(FILENAME)
      products.push(this)
      await saveItemsToFile(FILENAME, products)
      return products
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async fetchAll() {
    try {
      return await getItemsFromFile(FILENAME)

    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async findById(id) {
    try {
      const products = await this.fetchAll()
      const item = getById(products, id)
      if (item) {
        return item

      }
      throw 'Not found'
    } catch (error) {
      console.log(error)     
      throw 'Not found'
    }
  }
}