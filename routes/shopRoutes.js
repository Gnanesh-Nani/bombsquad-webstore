const express = require('express');
const router = express.Router();

// Mock data for shop items
const shopItems = [
    { id: 1, name: 'Super Speed', price: 100 },
    { id: 2, name: 'Invisibility', price: 200 },
];

router.get('/', (req, res) => {
    res.render('shop', { items: shopItems });
});

module.exports = router; // Ensure this line is present
