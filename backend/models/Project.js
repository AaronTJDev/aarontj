const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Project = new Schema({
    name: { type: String },
    tech: { type: Array },
    link: { type: String }
});

module.exports = Project;