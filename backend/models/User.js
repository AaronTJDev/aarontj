const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    username: { type: String },
    passphrase: { type: String },
});

module.exports = User;