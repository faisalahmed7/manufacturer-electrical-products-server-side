const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors())
app.use(express.json())






app.get('/', (req, res) => {
    res.send('manufacturer server is running')
});

app.listen(port, () => {
    console.log("Listening TO The 5000", port);
})