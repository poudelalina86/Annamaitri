// routes/food.js
import express from "express";
import FoodDonation from "../models/FoodDonation.js";

const router = express.Router();

// Create a new food donation entry
router.post("/donate", async (req, res) => {
  try {
    const { foodItem, quantity, foodType, pickupDate, pickupTime, urgency, proximity } = req.body;

    const newDonation = new FoodDonation({
      foodItem,
      quantity,
      foodType,
      pickupDate,
      pickupTime,
      urgency,
      proximity,
    });

    await newDonation.save();
    res.status(201).json({ message: "Food donation recorded successfully", donation: newDonation });
  } catch (error) {
    console.error("Error in food donation:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all food donations
router.get("/", async (req, res) => {
  try {
    const donations = await FoodDonation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
