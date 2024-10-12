const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route to get player stats
router.get('/', (req, res) => {
    const statsFilePath = path.join(__dirname, '../stats.json');

    // Asynchronously read your stats.json file
    fs.readFile(statsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading stats.json:", err);
            return res.status(500).send("Internal Server Error");
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
            return res.status(500).send("Error parsing stats data");
        }

        // Render the stats page with the parsed data
        res.render('stats', { stats });
    });
});

module.exports = router;
