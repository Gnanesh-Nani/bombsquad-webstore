const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const lockFile = require('proper-lockfile');
const moment = require('moment');
const tinycolor = require("tinycolor2");


// Define the path to your bank.json file
const bankFilePath = path.join(__dirname, '../../bombsquad/Bombsquad-Ballistica-Modded-Server/dist/ba_root/mods/shop/bank.json');

async function updateBankFile(pbId, itemName, price, days) {
    try {
        // Acquire a lock on the bank.json file
        const release = await lockFile.lock(bankFilePath);

        // Read the bank.json file
        const data = fs.readFileSync(bankFilePath, 'utf8');
        const bankData = JSON.parse(data);

        // Check if the player exists
        if (!bankData[pbId]) {
            await release();
            return { success: false, message: 'Player not found' };
        }

        const player = bankData[pbId];

        // Check if player has enough tickets
        const totalCost = price * days;
        if (player.tickets < totalCost) {
            await release();
            return { success: false, message: 'Low Balance Increase it by Playing ' };
        }

        // Check if player already has an active effect
        if (player.effect && player.effect[0]) {
            await release();
            return { success: false, message: 'You already has an active effect' };
        }

        // Update the player's tickets, effect, and purchase time
        player.tickets -= totalCost;

        // Set the current time and the duration (in days)
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        const effectEndTime = moment().add(days, 'days').format('YYYY-MM-DD HH:mm:ss');
        // Assign the effect and tag (if necessary)
        player.effect = [itemName, effectEndTime];

        // Optional: If you need to update the tag, you can do it here
        // Example: Setting a new tag with a time period and color
        //player.tag = ["Champion", effectEndTime, [1.0, 0.5, 0.0]];

        // Write the updated data back to the file
        fs.writeFileSync(bankFilePath, JSON.stringify(bankData, null, 4));

        // Release the lock after updating
        await release();
        console.log(`This ${pbId} Purchased ${itemName} for ${days}`);
        return { success: true, message: 'Purchase completed successfully!' };
    } catch (error) {
        console.error('Error updating bank.json:', error);
        return { success: false, message: 'An error occurred' };
    }
}

// POST endpoint to handle the "buy" request
router.post('/buy', async (req, res) => {
    const { pbId, itemName, price, days } = req.body;

    // Validate input
    if (!pbId || !itemName || !price || !days) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    // Update the bank file with proper locking
    const result = await updateBankFile(pbId, itemName, price, days);

    if (result.success) {
        // Assuming bankData is updated with the new ticket count
        req.session.user.tickets -= price * days; // Deduct the cost from session tickets
    }

    // Send back the result of the purchase operation
    res.json(result);
});

router.post('/buyTag', async (req, res) => {
    const { pbId, tagName, price, days, color } = req.body;

    // Validate input
    if (!pbId || !tagName || !price || !days || !color) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    const rgbColor = tinycolor(color).toRgb();
    const colorArr = [rgbColor.r, rgbColor.g, rgbColor.b];

    // Acquire a lock on the bank.json file
    let release;
    try {
        release = await lockFile.lock(bankFilePath);
        // Read the bank.json file
        const data = fs.readFileSync(bankFilePath, 'utf8');
        const bankData = JSON.parse(data);

        const player = bankData[pbId];

        // Check if player has enough tickets
        const totalCost = price * days;
        if (player.tickets < totalCost) {
            return res.json({ success: false, message: 'Low Balance Increase it by Playing' });
        }

        // Check if player already has an active effect
        if (player.tag && player.tag[0]) {
            return res.json({ success: false, message: 'You already have an active tag' });
        }

        // Update the player's tickets, effect, and purchase time
        player.tickets -= totalCost;
        player.tag = [tagName, moment().add(days, 'days').format('YYYY-MM-DD HH:mm:ss'), colorArr];

        // Write the updated data back to the file
        fs.writeFileSync(bankFilePath, JSON.stringify(bankData, null, 4));

        req.session.user.tickets -= totalCost;

        return res.json({ success: true, message: '   Tag purchase completed successfully!' });
    } catch (error) {
        console.error('Error updating tag:', error);
        return res.json({ success: false, message: 'An error occurred while purchasing the tag' });
    } finally {
        // Ensure the lock is released regardless of success or failure
        if (release) {
            await release();
        }
    }
});

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
    ];
    
    // Corresponding prices for each item
    const prices = [
        150,  // price for distortion.png
        150,  // price for fairydust.png
        100,  // price for glow.png
        150,  // price for iceground.png
        100,  // price for ice.png
        120,  // price for metal.png
        100,  // price for slime.png
        180,  // price for spark.png
        100,  // price for splinter.png
        150,  // price for sweetground.png
    ];

    // Initialize error variable
    let error = null;

    // Prefix the path to images
    const imagePaths = images.map(image => `/images/effects/${image}`);
    
    // Combine images and prices into an array of objects
    const shopItems = imagePaths.map((image, index) => ({
        image,
        price: prices[index]
    }));

    // Render the shop page with items and session
    res.render('shop', { items: shopItems, session: req.session, error: error });
});


module.exports = router; // Ensure this line is present
