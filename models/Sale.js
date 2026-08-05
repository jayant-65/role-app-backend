import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    required: true,
    enum: ["shipped", "pending", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Sale = mongoose.model("Sale", saleSchema);
export default Sale;
