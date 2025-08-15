// routes/orderRouter.js
import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import {
  placeOrderCOD,
  placeOrderRazorpay,
  verifyRazorpayPayment,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);
orderRouter.post('/razorpay/verify', authUser, verifyRazorpayPayment);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/status/:id', authSeller, updateOrderStatus);

export default orderRouter;
