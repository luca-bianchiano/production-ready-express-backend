const mongoose = require('mongoose');
const { mongoUri } = require('../config');

async function connect() {
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
}

module.exports = { connect };
