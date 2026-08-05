import Sale from "../models/Sale.js";

export const getCategoryTotals = async (req, res) => {
  try {
    const totals = await Sale.aggregate([
      { $match: { status: "shipped" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);

    res.json({ totals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load sales category totals." });
  }
};

export const createSale = async (req, res) => {
  try {
    const { category, amount, status } = req.body;
    if (!category || typeof amount !== "number" || amount < 0 || !status) {
      return res
        .status(400)
        .json({ message: "Category, amount, and status are required." });
    }

    const sale = await Sale.create({ category, amount, status });
    res.status(201).json({ sale });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to create sale." });
  }
};
