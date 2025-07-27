const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());

app.use(cors())


app.get("/", (req, res) => {
    res.send("Ayush loves Sova ❤️");
});


app.use('/ai', aiRoutes);

module.exports = app;
