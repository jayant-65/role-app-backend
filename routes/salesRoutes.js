import express from "express";
import {
  getCategoryTotals,
  createSale,
} from "../controllers/saleController.js";

const router = express.Router();

router.get("/category-totals", getCategoryTotals);
router.post("/", createSale);

export default router;
