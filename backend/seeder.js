import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import shops from './data/shops.js'
import User from './models/userModel.js'
import Order from './models/orderModel.js'
import Shops from './models/shopModel.js'
import connectDB from './config/db.js'
import Product from './models/productModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUser = await User.insertMany(users)
    const adminUser = createdUser[0]._id

    const sampleShops = shops.map((shop) => {
      return { ...shop, user: adminUser }
    })

    await Shops.insertMany(sampleShops)

    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Shops.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
