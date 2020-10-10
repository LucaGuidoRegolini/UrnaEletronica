const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    name: String,
    party: Number,
    number: Number,
    votes: Number,
    file: String,
});

module.exports = mongoose.model('Candidate', PostSchema);