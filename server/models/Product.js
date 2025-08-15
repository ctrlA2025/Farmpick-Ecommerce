import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  image: { type: Array, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  variants: [
    {
      unit: { type: String, required: true },
      weight: { type: Number, required: true },
      price: { type: Number, required: true },
      offerPrice: { type: Number, required: true },
    },
  ],
  inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;