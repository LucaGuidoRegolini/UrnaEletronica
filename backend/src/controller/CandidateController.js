const Candidate = require('../model/canditate');
const fs = require('fs');
const path = require('path');
const {promisify} = require('util');

module.exports = {
    async IndexCandidate (req, res) {
        const candidate = await Candidate.find()
        return res.json(candidate)
    },

    async ShowCandidate(req, res) {
        const candidate = await Candidate.find({number: req.params.id});
        try{
            return res.json({id: candidate[0]._id});
        }catch {
            return res.json({id: "null"})
        }
    },

    async CreateCandidate (req, res) {
        const {name, party, number, votes= 0, file= 'null.png'} = req.body;

        const candidate = await Candidate.create({
            name,
            party,
            number,
            votes,
            file
        });
    
        return res.json(candidate);
    },

    async PutImgCandidate(req, res) {
    
        const candidate = await Candidate.updateOne(
            {_id: req.params.id},
            {
                $set : {file: req.file.filename}
            });
        return res.json(candidate);
    },

    async DeleteCandidate(req, res) {
        try{
            const candidate = await Candidate.find({_id: req.params.id});
            if(candidate[0].file !== 'null.png'){
                promisify(fs.unlink)(path.resolve(__dirname, 
                '..','..','tmp', 'uploads', candidate[0].file))
            }
            await Candidate.findOneAndRemove(req.params.id);

            return res.send("Parabens");
        }catch{
            return res.status(204).send()
        } 
    },
}