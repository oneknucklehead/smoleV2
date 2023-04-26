import asyncHandler from 'express-async-handler'
import Shops from '../models/shopModel.js'
import User from '../models/userModel.js'
import Product from '../models/productModel.js'

//@desc     Fetch all shops
//@route    GET /api/shop
//@access   Public
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shops.find({})
  res.json(shops)
})

//@desc     Fetch single shop
//@route    GET /api/shop/:shopid
//@access   Public
const getShopProducts = asyncHandler(async (req, res) => {
  const shop = await Shops.findById(req.params.shopid)
  if (shop) {
    res.json(shop)
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

//@desc     Fetch single product
//@route    GET /api/:shopid/product/:productid
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const shop = await Shops.findById(req.params.shopid)
  const product = shop.products.find(
    (product) => product.id === req.params.productid
  )
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

// //@desc     Delete single product
// //@route    DELETE /api/:shopid/product/:productid
// //@access   Private/Admin
// const deleteProductById = asyncHandler(async (req, res) => {
//   const shop = await Shops.findById(req.params.shopid)
//   const product = shop.products.find(
//     (product) => product.id === req.params.productid
//   )
//   await Shops.findOneAndUpdate(
//     { _id: req.params.shopid },
//     { $pull: { products: { _id: req.params.productid } } },
//     { safe: true, multi: false }
//   )
//   if (product) {
//     res.json({ message: 'Deleted succesfully', data: product })
//   } else {
//     res.status(404)
//     throw new Error('Product Not Found')
//   }
// })

//@desc     Delete single product
//@route    DELETE /api/:shopid/product/:productid
//@access   Private
const deleteProduct = asyncHandler(async (req, res) => {
  if (req.user && req.user.isAdmin) {
    const shop = await Shops.findById(req.params.shopid)
    const product = shop?.products.find(
      (product) => product.id === req.params.productid
    )
    const success = await Shops.findOneAndUpdate(
      { _id: req.params.shopid },
      { $pull: { products: { _id: req.params.productid } } },
      { safe: true, multi: false }
    )
    if (success) {
      res.json({ message: 'Deleted succesfully', data: product })
    } else {
      res.status(404)
      throw new Error('Product Not Found')
    }
  } else if (req.user && req.user.isSeller) {
    const shop = await Shops.findById(req.params.shopid)
    const product = shop.products.find(
      (product) => product.id === req.params.productid
    )
    const success = await Shops.findOneAndUpdate(
      { user: req.user._id, _id: req.params.shopid },
      { $pull: { products: { _id: req.params.productid } } },
      { safe: true, multi: true }
    )
    if (success) {
      res.json({ message: 'Deleted product successfully', data: product })
    } else {
      res.status(404)
      throw new Error('Product Not Found for your id')
    }
  } else {
    res.status(404)
    res.json({ message: 'Not Authorized as a seller or an admin' })
  }
})
//@desc     Delete single shop
//@route    DELETE /api/:shopid
//@access   Private/Admin
const deleteShopById = asyncHandler(async (req, res) => {
  const shop = await Shops.findById(req.params.shopid)
  // const product = shop.products.find(
  //   (product) => product.id === req.params.productid
  // )
  // await Shops.findOneAndUpdate(
  //   { _id: req.params.shopid },
  //   { $pull: { products: { _id: req.params.productid } } },
  //   { safe: true, multi: false }
  // )
  if (shop) {
    res.json({ message: 'Shop deleted successfully', data: shop })
    await shop.remove()
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})
const sellerShops = asyncHandler(async (req, res) => {
  const shops = await Shops.find({ user: req.user._id })
  if (shops) {
    res.json(shops)
  } else {
    res.status(401)
    throw new Error('Shop not found')
  }
})

// @desc    Create a shop
// @route   POST /api/shop/:shopid
// @access  Private/Seller
const createShop = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  const shop = new Shops({
    name: 'Sample name',
    tagline: 'Sample tagline',
    description: 'Sample description',
    user: req.user._id,
    clientId: user.clientId,
    products: [],
  })

  const createdShop = await shop.save()
  res.status(201).json(createdShop)
})

// @desc    Update a shop
// @route   PUT /api/shop/:shopid
// @access  Private/Seller
const updateShop = asyncHandler(async (req, res) => {
  const { name, tagline, description } = req.body

  const shop = await Shops.findById(req.params.shopid)

  if (shop) {
    shop.name = name
    shop.tagline = tagline
    shop.description = description

    const updatedShop = await shop.save()
    res.json(updatedShop)
  } else {
    res.status(404)
    throw new Error('Shop not found')
  }
})

// @desc    Add product to a shop
// @route   POST /api/shop/:shopid
// @access  Private/Seller
const addProduct = asyncHandler(async (req, res) => {
  const product = {
    name: 'Sample name',
    price: 0,
    sizes: ['s', 'm'],
    image: '/images/sampleImage.png',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 1,
    numReviews: 0,
    description: 'Sample description',
  }
  const shop = await Shops.findOneAndUpdate(
    { _id: req.params.shopid, user: req.user._id },
    { $push: { products: product } },
    { safe: true, multi: true, new: true }
  )
  if (shop) res.json({ shopid: shop._id, products: shop.products })
  else {
    res.status(401)
    throw new Error('Shop not found')
  }
})

// @desc    Update product of a shop
// @route   PUT /api/:shopid/product/:productid
// @access  Private/Seller
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    description,
    brand,
    category,
    price,
    sizes,
    countInStock,
  } = req.body
  // if (sizes.length === 1 && sizes[0] !== '') {
  //   sizes = null
  // }
  const shop = await Shops.findOneAndUpdate(
    {
      _id: req.params.shopid,
      user: req.user._id,
    },
    {
      $set: {
        'products.$[el].name': name,
        'products.$[el].image': image,
        'products.$[el].description': description,
        'products.$[el].brand': brand,
        'products.$[el].category': category,
        'products.$[el].price': price,
        'products.$[el].countInStock': countInStock,
        'products.$[el].sizes': sizes,
      },
    },
    {
      arrayFilters: [{ 'el._id': req.params.productid }],
      safe: true,
      multi: true,
      new: true,
    }
  )
  if (shop) {
    const product = shop.products.filter(
      (product) => product._id == req.params.productid
    )
    res.json(product)
  } else {
    res.status(401)
    throw new Error('Shop not found')
  }
})

//@desc     Create New review
//@route    POST /api/:shopid/product/:productid/review
//@access   Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body
  const shop = await Shops.findById(req.params.shopid)
  const product = shop.products.find(
    (product) => product.id === req.params.productid
  )
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      res.status(400)
      throw new Error('You have already reviewed this product')
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }
    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await shop.save()

    res.status(201).json({ message: 'review added' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

export {
  getShops,
  getShopProducts,
  getProductById,
  deleteShopById,
  deleteProduct,
  sellerShops,
  createShop,
  updateShop,
  addProduct,
  updateProduct,
  createReview,
}
