const express = require('express');
const path = require('path');
const appController = require('./public/appController');

// Load environment variables from .env file
const loadEnvFile = require('./utils/envUtil');
const envVariables = loadEnvFile('./.env');

const app = express();
const PORT = envVariables.PORT || 65534;

// Middleware setup
app.use(express.static(path.join(__dirname, 'public_html')));
app.use(express.json());

// default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'index.html'));
});

// mount the router
app.use('/', appController);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
