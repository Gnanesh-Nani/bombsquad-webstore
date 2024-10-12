---

# BombSquad Web Store and Stats Viewer

Welcome to the BombSquad Web Store and Stats Viewer! This project is designed to provide players with a seamless experience to view their gameplay statistics and access the in-game store for purchasing effects and items.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Player Stats Viewing**: View detailed statistics for players, including scores, kills, deaths, games played, and average score.
- **Dynamic Store**: Purchase in-game items and effects using unique player IDs.
- **Top Players Display**: Highlight top players with vibrant backgrounds and icons.
- **User-Friendly Interface**: A responsive design that works on both desktop and mobile devices.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript, Bootstrap
- **Backend**: Node.js, Express
- **Additional Libraries**: EJS for templating, jQuery for DOM manipulation

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Gnanesh-Nani/bombsquad-webstore.git
   cd bombsquad-webstore
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
   (This will install all the dependencies listed in your `package.json`, including `express` and `ejs`.)
   
3. Start the application:
   ```bash
   npm start
   ```
4. Open your browser and go to `http://<your-domain-name>:3000` to view the application.

## Usage
- **Viewing Player Stats**: Navigate to the stats page to view detailed statistics of players in the BombSquad game.
- **Accessing the Store**: Use your unique player ID to access the store and purchase various items and effects.

## Contributing
We welcome contributions! If you have suggestions or improvements, please fork the repository and submit a pull request.

1. Fork the project.
2. Create your feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Key Changes:
1. **Installation Step**: Changed "npm install express" and "npm install ejs" to just "npm install" to automatically install all dependencies listed in `package.json`. This is more typical for projects with multiple dependencies.
2. **Minor Grammar/Clarity Improvements**: Some sentences were slightly adjusted for better readability.
