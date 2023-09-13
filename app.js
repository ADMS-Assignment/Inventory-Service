const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the productRoutes for your API routes
app.use('/', productRoutes);

mongoose.connect('mongodb+srv://naseefnuzky1999:Pos3YsYJqplbu0py@cluster0.zdu1ujx.mongodb.net/productManagement?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(8080, () => {
            console.log('Server running on port 8080');
        });
    })
    .catch((error) => {
        console.log(error);
    });
