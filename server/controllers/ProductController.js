import Product from '../models/product.js'
import { v4 as uuidv4 } from 'uuid';
export const remove = async (request, response) => {
  try {
    const productId = request.params.id
    const doc = await Product.findOneAndDelete({
      id: productId
    })
    if (!doc) {
      return response.status(404).json({
        message: 'product not found'
      })
    }
    response.json({
      success: true
    })
  } catch (err) {
    console.log(err)
    response.status(500).json({
      message: 'error with deleting product by id'
    })
  }
}

export const getOne = async (request, response) => {
  try {
    const productId = request.params.id
    const doc = await Product.findOne({ id: productId }).exec();
    if (!doc) {
      return response.status(404).json({
        message: 'product not found'
      })
    }
    response.json(doc)
  } catch (err) {
    console.log(err)
    response.status(500).json({
      message: 'error with fetching product by id'
    })
  }
}

export const getAll = async (request, response) => {
  try {
    const products = await Product.find().populate('name').exec()
    response.json(products)
  } catch (err) {
    response.status(500).json({
      message: 'error with fetching products'
    })
  }
}

export const create = async (request, response) => {
  try {
    const doc = new Product({
      name: request.body.name,
      weight: request.body.weight,
      imageUrl: request.body.imageUrl,
      size: request.body.size,
      count: request.body.count,
      comments: request.body.comments,
      id: uuidv4()
    })
    const product = await doc.save()
    response.json(product)
  } catch (err) {
    response.status(500).json({
      message: 'error with creating product'
    })
  }
}


export const update = async (request, response) => {
  try {
    const productId = request.params.id
    await Product.updateOne({
      _id: productId,

    }, {
      name: request.body.name,
      weight: request.body.weight,
      imageUrl: request.body.imageUrl,
      size: request.body.size,
      count: request.body.count,
      comments: request.body.comments
    })
    response.json({ success: true })
  } catch (err) {
    return response.status(500).json({
      message: 'failed to update product'
    })
  }
}
