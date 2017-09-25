const mongoose = require('mongoose');
const { username, password } = require('./connection.json');

mongoose.connect(`mongodb://${username}:${password}@0.0.0.0:27017`);