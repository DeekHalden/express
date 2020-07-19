const fs = require('fs').promises
const path = require('path')
const { v4: uuid } = require('uuid');
const R = require('ramda')

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json')
const getProductsFromFile = async () => {

  try {
    const res = await fs.readFile(p)
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
    return []
  }
}

const saveProductsToFile = async (products) => {
  try {
    const res = await fs.writeFile(p, JSON.stringify(products))
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

module.exports = class Product {
  constructor({ title, image, description, price } = {}) {
    this.title = title
    this.image = image
    this.description = description
    this.price = price
    this.id = uuid()
  }

  async save() {
    try {
      const products = await getProductsFromFile()
      products.push(this)
      await saveProductsToFile(products)
      return products
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async fetchAll() {
    try {
      return await getProductsFromFile()

    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async findById(id) {
    try {
      const products = await this.fetchAll()
      const item = R.find(R.propEq('id', id), products)
      return item
    } catch (error) {
      console.log(error)     
    }
  }
}