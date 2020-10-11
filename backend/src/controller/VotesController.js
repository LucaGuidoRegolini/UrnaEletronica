const Candidate = require('../model/canditate');
const Election = require('../model/administration');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

module.exports = {
    async VotesCancelled (req, res) {
        const election = await Election.find();
        const AddCanceledVote = await Election.updateMany(
            {},
            {$set : {
                votesCanceled: election[0].votesCanceled + 1,
                votesTotal: election[0].votesTotal + 1
            }});
        return res.json(AddCanceledVote);
    },

    async VotesNull (req, res) {
        const election = await Election.find();
        const AddCanceledVote = await Election.updateMany(
            {},
            {$set : {
                votesNull: election[0].votesNull + 1,
                votesTotal: election[0].votesTotal + 1
            }});
        return res.json(AddCanceledVote);
    },

    async Votes (req, res) {
        const cadidate = await Candidate.find({number: req.params.id});
        const election = await Election.find();
        let AddVote = await Candidate.update(
            {number: req.params.id},
            {$set : {votes: cadidate[0].votes + 1}});

        AddVote = await Election.updateMany(
        {},{$set : {votesTotal: election[0].votesTotal + 1}});
            
        return res.json(AddVote);
    },

    async RestartVotes (req, res) {
        const cadidates = await Candidate.find();
        const election = await Election.find();
        let DeletVote = await Candidate.updateMany(
        {},{$set : {votes: 0}});

        DeletVote = await Election.updateMany(
        {},{$set : {
            votesTotal: 0,
            votesNull: 0,
            votesCanceled: 0 }
        });

        return res.send("Feito")
    },

    async UnsuccessfulCandidate (req, res){
        try{
            const election = await Election.find();
            const candidate = await Candidate.find({_id: req.params.id});
            
            VotesCandidate = candidate[0].votes
            VotesTotal = election[0].votesTotal
            await Candidate.findOneAndRemove({_id: req.params.id});
            if(candidate[0].file !== 'null.png'){
                promisify(fs.unlink)(path.resolve(__dirname, 
                '..','..','tmp', 'uploads', candidate[0].file))
            }
            
            let DeletVote = await Election.updateMany(
                {},{$set : {
                    votesTotal: VotesTotal - VotesCandidate,}
                });

            return res.send("Parabens");
        }catch{
           return res.status(400)
        } 
    }
}