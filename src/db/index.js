const mongoose = require('mongoose');
const { mongoUri } = require('../config');

async function connect() {
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    // optional: mongoose.set('strictQuery', false);
    console.log('MongoDB connected');
}

module.exports = { connect, mongoose };
