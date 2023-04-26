import express from 'express'
import {
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
} from '../controllers/shopControllers.js'
import { protect, admin, seller } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/shop').get(getShops).post(protect, seller, createShop)
router.route('/seller/shops').get(protect, seller, sellerShops)

router
  .route('/shop/:shopid')
  .get(getShopProducts)
  .put(protect, seller, updateShop)
  .delete(protect, admin, deleteShopById)
  .post(protect, seller, addProduct)

router
  .route('/:shopid/product/:productid')
  .get(getProductById)
  .delete(protect, deleteProduct)
  .put(protect, seller, updateProduct)

router.route('/:shopid/product/:productid/review').post(protect, createReview)

export default router
