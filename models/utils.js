const path = require('path')
const R = require('ramda')
const fs = require('fs').promises

const getPath = (file) => path.join(path.dirname(process.mainModule.filename), 'data', file)

const getById = (list, id) => R.find(R.propEq('id', id), list)
const getIndexById = (list, id) => R.findIndex(R.propEq('id', id), list)

const getItemsFromFile = async (fileName) => {

  try {
    const res = await fs.readFile(getPath(fileName))
    return JSON.parse(res)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const saveItemsToFile = async (fileName, items) => {
  try {
    const res = await fs.writeFile(getPath(fileName), JSON.stringify(items))
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getPath,
  getById,
  getIndexById,
  getItemsFromFile,
  saveItemsToFile
}

