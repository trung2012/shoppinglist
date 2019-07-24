const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

app.use(express.json());

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected!'))
    .catch((err) => console.log(err));

//Use Routes
app.use('/api/items', items);

//Serve static assets in production

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
