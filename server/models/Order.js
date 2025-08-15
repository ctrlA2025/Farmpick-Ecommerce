// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      variantIndex: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  amount: { type: Number, required: true },

  address: { type: mongoose.Schema.Types.ObjectId, ref: 'address', required: true },

  status: {
    type: String,
    enum: ['Order Placed', 'Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'],
    default: 'Order Placed',
  },

  paymentType: { type: String, required: true },

  isPaid: { type: Boolean, default: false },
  
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;
