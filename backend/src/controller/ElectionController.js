const Election = require('../model/administration');

module.exports = {
    async show (req, res) {
        const election = await Election.find()
        return res.json(election)
    },

    async createElection (req, res) {
        const election = await Election.create({
            votesTotal: 0,
            votesNull: 0,
            votesCanceled: 0
        });
    
        return res.json(election);
    },

    async DeleteElection(req, res) {
        await Election.remove({});

        return res.send("Parabens");
    },
}