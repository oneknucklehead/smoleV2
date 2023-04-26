import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import shopRoutes from './routes/shopRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageUploadRoutes from './routes/imageUploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';
import path from 'path';
import Order from './models/orderModel.js';
import Shops from './models/shopModel.js';
import asyncHandler from 'express-async-handler';
// import fileUpload from 'express-fileupload'
// import { upload } from './controllers/uploadController.js'
// import asyncHandler from 'express-async-handler'

//Image Upload endpoint

connectDB();
app.use(express.json());

app.use('/api', shopRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', imageUploadRoutes);

//get shop clientId
app.get(
  '/api/config/paypal/:orderno',
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.orderno);
    if (order) {
      const shop = await Shops.findById(order.orderItems[0].shopId);
      res.send(shop.clientId);
    } else {
      res.status(404);
      throw new Error('Order not found');
    }
  })
);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'), function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running');
  });
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
