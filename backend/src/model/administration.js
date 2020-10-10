const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    votesTotal: Number,
    votesNull: Number,
    votesCanceled: Number,
});

module.exports = mongoose.model('Election', PostSchema);