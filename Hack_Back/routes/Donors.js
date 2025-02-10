import express from "express";
import DonatedFood from "../models/DonatedFood.js";
import User from "../models/User.js";

const router = express.Router();

// Fetch available donors
router.get("/donors", async (req, res) => {
  try {
    const donations = await DonatedFood.find().populate("donor", "name contact latitude longitude");

    const donorsList = donations.map((donation) => ({
      _id: donation._id,
      name: donation.donor.name,
      contact: donation.donor.contact,
      latitude: donation.donor.latitude,
      longitude: donation.donor.longitude,
      foodItem: donation.foodItem,
      quantity: donation.quantity,
      availableUntil: donation.availableUntil,
    }));

    res.json(donorsList);
  } catch (error) {
    res.status(500).json({ error: "Error fetching donors" });
  }
});

export default router;
