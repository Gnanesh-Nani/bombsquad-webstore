const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const images = [
        'distortion.png',
        'fairydust.png',
        'glow.png',
        'iceground.png',
        'ice.png',
        'metal.png',
        'slime.png',
        'spark.png',
        'splinter.png',
        'sweetground.png',
        'tag.png'
    ];
    
    // Corresponding prices for each item
    const prices = [
        100,  // price for distortion.png
        150,  // price for fairydust.png
        200,  // price for glow.png
        250,  // price for iceground.png
        300,  // price for ice.png
        350,  // price for metal.png
        400,  // price for slime.png
        450,  // price for spark.png
        500,  // price for splinter.png
        550,  // price for sweetground.png
        600   // price for tag.png
    ];

    // Prefix the path to images
    const imagePaths = images.map(image => `/images/effects/${image}`);
    
    // Combine images and prices into an array of objects
    const shopItems = imagePaths.map((image, index) => ({
        image,
        price: prices[index]
    }));

    res.render('shop', { items: shopItems });
});


module.exports = router; // Ensure this line is present
