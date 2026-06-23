const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const auth = require('../middleware/auth');

// GET /api/businesses - Search & Filter with Pagination
router.get('/', async (req, res) => {
  try {
    const { q, category, location, page = 1, limit = 20 } = req.query;
    let query = {};

    // Text search
    if (q) {
      query.$text = { $search: q };
    }
    if (category) {
      query.category = category;
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const businesses = await Business.find(query)
      .sort({ subscriptionPlan: -1, averageRating: -1 }) // Premium & Featured first
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('ownerId', 'name email'); // Populate owner details

    const total = await Business.countDocuments(query);

    res.json({ businesses, totalPages: Math.ceil(total / limit), currentPage: page });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/businesses/:id - Get single business with reviews
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('ownerId', 'name phone');
    if (!business) return res.status(404).json({ msg: 'Business not found' });
    res.json(business);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST /api/businesses - Create a new listing (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name, category, description, location, contactPhone, contactEmail, images } = req.body;
    const newBusiness = new Business({
      name,
      category,
      description,
      location,
      contactPhone,
      contactEmail,
      images,
      ownerId: req.user.id // From auth middleware
    });
    const business = await newBusiness.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// PUT /api/businesses/:id - Update listing (Protected - Owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    let business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ msg: 'Business not found' });
    // Check ownership
    if (business.ownerId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    business = await Business.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(business);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
