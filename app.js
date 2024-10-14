const express = require('express');
const path = require('path');
const session = require('express-session');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Configure session
app.use(session({
    secret: 'your-secret-key', // Change this to a random secret
    resave: false,
    saveUninitialized: true,
}));

// Routes
const statsRouter = require('./routes/statsRoutes');
const shopRouter = require('./routes/shopRoutes');
const youtubeRouter = require('./routes/youtubeRoutes');

app.use('/stats', statsRouter);
app.use('/shop', shopRouter);
app.use('/youtube', youtubeRouter);

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the BombSquad Server!');
});

// Login route
app.post('/login', (req, res) => {
    const { pbid, password } = req.body; // Get player ID and password from the request
    const bankFilePath = path.join(__dirname, 'bank.json');

    // Read the bank.json file
    fs.readFile(bankFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading bank.json:", err);
            return res.status(500).send("Internal Server Error");
        }

        let bankData;
        try {
            bankData = JSON.parse(data);
        } catch (parseError) {
            console.error("Error parsing bank.json:", parseError);
            return res.status(500).send("Internal Server Error");
        }

        // Check if the player exists and validate the password
        const user = bankData[pbid]; // Access user by player ID

        if (user && user.password === password) {
            req.session.user = { pbid, tickets: user.tickets }; // Store user data in session
            console.log('Some One Loginned',req.session.user)
            // Redirect back to the referer URL
            const referer = req.get('Referer') || '/stats'; // Default to home if referer is not available
            return res.redirect(referer); // Send a success response
        } else {
            // Redirect back with an error message (optional)
            const referer = req.get('Referer') || '/stats'; // Default to home if referer is not available
            res.alert('Invalid credentials'); // Using express-flash for error messaging (optional)
            return res.redirect(referer); // Redirect back to the previous page
        }
    });
});

// Start the server
app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server is running on http://51.79.248.119:${PORT}/stats`);
});
