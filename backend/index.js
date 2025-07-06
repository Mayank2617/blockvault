const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Blockchain = require('./blockchain');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Create blockchain instance
const myBlockchain = new Blockchain();

// Routes
app.get('/chain', (req, res) => {
    res.json(myBlockchain.chain);
});

app.post('/add', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: "Data is required to add a block." });
    }
    myBlockchain.addBlock(data);
    res.json({ message: "Block added successfully.", chain: myBlockchain.chain });
});

app.get('/validate', (req, res) => {
    const isValid = myBlockchain.isChainValid();
    res.json({ valid: isValid });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Blockchain API server running on http://localhost:${PORT}`);
});
