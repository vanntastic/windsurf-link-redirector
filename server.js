const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Handle short URL redirects
app.get('/:shortCode', (req, res) => {
    res.sendFile(path.join(__dirname, 'redirect.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
