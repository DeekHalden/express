const { v4: uuid } = require('uuid')
const db = require('./../utils/database')

module.exports = class Product {
  constructor({ title, imageUrl, description, price, id } = {}) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  static async update(data) {
  }

  static async delete(id) {
  }

  async save() {
    try {
      return db.execute(
        'INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)', 
        [this.title, this.price,  this.description, this.imageUrl]
      )
    } catch (error) {
      return {}
    }
  }

  static async fetchAll() {
    try {
      const [rows] = (await db.execute('SELECT * FROM products;'))
      console.log(rows)
      return rows
    } catch (error) {
      console.log(error)
      return []
    }
  }

  static async findById(id) {
    try {
      const [product] = (await db.execute('SELECT * FROM products WHERE products.id = ?;', [id]))
      console.log(product)
      return product
    } catch (error) {
      console.log(error)
      return []
    }
  }
}