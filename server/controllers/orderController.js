import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import User from "../models/User.js";

// ✅ Razorpay instance (LIVE KEYS - TEMP for testing)
// ⚠️ Remove hardcoded keys after testing and use process.env instead
const razorpay = new Razorpay({
  key_id: "rzp_live_Qq6OO5EK3zMXpD",
  key_secret: "Owq6Pbysody2qPXeUhTjekmk",
});

// ===============================
// 1️⃣ Place Order COD
// ===============================
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || !items.length) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.json({ success: false, message: "Product not found" });
      const variant = product.variants[item.variantIndex];
      if (!variant) return res.json({ success: false, message: "Variant not found" });
      amount += variant.offerPrice * item.quantity;
    }

    // Add 2% tax once
    amount += amount * 0.02;
    amount = Math.round(amount);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ===============================
// 2️⃣ Place Order Razorpay
// ===============================
export const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!userId || !items?.length || !address) {
      return res.json({ success: false, message: "Missing data" });
    }

    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.json({ success: false, message: "Product not found" });
      const variant = product.variants[item.variantIndex];
      if (!variant) return res.json({ success: false, message: "Variant not found" });
      amount += variant.offerPrice * item.quantity;
    }

    // Add 2% tax once
    amount += amount * 0.02;
    amount = Math.round(amount);

    // Ensure amount is valid
    if (!amount || amount <= 0) {
      return res.json({ success: false, message: "Invalid order amount" });
    }

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `order_rcptid_${order._id}`,
    };

    let razorpayOrder;
    try {
      razorpayOrder = await razorpay.orders.create(options);
    } catch (err) {
      console.error("❌ Razorpay order creation error:", err);
      return res.json({ success: false, message: "Razorpay API error", error: err });
    }

    if (!razorpayOrder?.id) {
      return res.json({ success: false, message: "Failed to create Razorpay order" });
    }

    return res.json({
      success: true,
      key: "rzp_live_Qq6OO5EK3zMXpD", // sending live key directly
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderId: razorpayOrder.id,
      orderDbId: order._id,
    });
  } catch (error) {
    console.error("❌ OrderController error:", error);
    return res.json({ success: false, message: error.message });
  }
};

// ===============================
// 3️⃣ Verify Razorpay Payment
// ===============================
export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      userId,
    } = req.body;

    const hmac = crypto.createHmac("sha256", "Owq6Pbysody2qPXeUhTjekmk"); // live key secret
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await User.findByIdAndUpdate(userId, { cartItems: {} });

      return res.json({ success: true, message: "Payment Verified" });
    } else {
      await Order.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment Verification Failed" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ===============================
// 4️⃣ Get Orders by User ID
// ===============================
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate({
        path: "items.product",
        populate: { path: "category", model: "Category" },
      })
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ===============================
// 5️⃣ Get All Orders (Seller)
// ===============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate({
        path: "items.product",
        populate: { path: "category", model: "Category" },
      })
      .populate("address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ===============================
// 6️⃣ Update Order Status
// ===============================
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Order Placed', 'Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'].includes(status)) {
      return res.json({ success: false, message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, order: updatedOrder, message: "Status updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
