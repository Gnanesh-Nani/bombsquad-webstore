const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');


// Initialize a variable to keep track of visits
let visitorCount = 0;

// Route to get player stats
router.get('/', (req, res) => {
    // Increment visitor count
    visitorCount++;

    const statsFilePath = path.join(__dirname, '../stats.json');
    let error = null; // Initialize the error variable

    let accountID = req.query.account;
    

    // Asynchronously read your stats.json file
    fs.readFile(statsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading stats.json:", err);
            error = "Unable to load stats data."; // Set error message
            return res.render('stats', { stats: null, visitorCount, session: req.session, error }); // Pass the error to the view
        }

        let stats;
        try {
            // Attempt to parse the JSON data
            stats = JSON.parse(data);
            
            // Convert stats object to an array for sorting
            const statsArray = Object.entries(stats.stats).map(([key, value]) => ({
                id: key,
                ...value
            }));

            // Sort the array based on rank (ascending)
            statsArray.sort((a, b) => a.rank - b.rank);

            // Convert sorted array back to an object
            const sortedStats = Object.fromEntries(statsArray.map(item => [item.id, item]));

            // Assign the sorted stats back to the original stats object
            stats.stats = sortedStats;

        } catch (parseErr) {
            console.error("Error parsing stats.json:", parseErr);
            error = "Error parsing stats data"; // Set error message
            return res.render('stats', { stats: null, visitorCount, session: req.session, error }); // Pass the error to the view
        }

        // Render the stats page with the parsed data, visitorCount, and session
        res.render('stats', { stats, visitorCount, session: req.session, error:error ,accountID});
    });
});

module.exports = router;
