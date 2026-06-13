const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend collegato correttamente' });
});

app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});