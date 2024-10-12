const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static('public'));

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/stats`);
});
