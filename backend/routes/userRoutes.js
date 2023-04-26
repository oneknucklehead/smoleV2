import express from 'express'
import {
  authUser,
  getProfile,
  updateProfile,
  registerUser,
  adminGetUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, adminGetUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getProfile).put(protect, updateProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
