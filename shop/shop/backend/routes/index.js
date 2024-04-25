const express = require('express');
const router = express.Router();

// Example route to handle GET request for homepage
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: '/public' });
});

// Example route to handle POST request for newsletter signup
router.post('/newsletter/signup', (req, res) => {
    // Code to handle newsletter signup
});


module.exports = router;
