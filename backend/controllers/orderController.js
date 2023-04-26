import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import Shops from '../models/shopModel.js'
import User from '../models/userModel.js'

//@desc     Create new order
//@route    POST /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shop,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shop,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

//@desc     Get order by id
//@route    GET /api/orders/:id
//@access   Private
const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     Update order to Paid
//@route    PUT /api/orders/:id/pay
//@access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     Update order to Delivered
//@route    PUT /api/orders/:id/deliver
//@access   Private/Seller
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updateOrder = await order.save()
    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     Get order by id
//@route    GET /api/orders/:id
//@access   Private
const getUserOrder = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//@desc     Get all orders
//@route    GET /api/orders
//@access   Private/Seller
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name')
    .populate('shop', 'id name user')
  if (orders) {
    const sellerOrders = orders.filter(
      (order) => order.shop?.user == req.user.id
    )
    res.json(sellerOrders)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//@desc     Get all orders
//@route    GET /api/orders/admin
//@access   Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'id name')
    .populate('shop', 'id name user')
  if (orders) {
    res.json(orders)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export {
  addOrderItems,
  getOrder,
  getUserOrder,
  updateOrderToPaid,
  getOrders,
  getAllOrders,
  updateOrderToDelivered,
}
