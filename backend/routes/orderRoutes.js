import express from 'express'
const router = express.Router()
import {
  addOrderItems,
  getOrders,
  getAllOrders,
  getOrder,
  getUserOrder,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../controllers/orderController.js'
import { admin, protect, seller } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, seller, getOrders)
router.route('/admin').get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getUserOrder)
router.route('/:id').get(protect, getOrder)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, seller, updateOrderToDelivered)

export default router
