const routes = require('express').Router();
const { set } = require('mongoose');
const multer = require('multer');

//Controles
const CandidateController = require('./controller/CandidateController');
const ElectionController = require('./controller/ElectionController');
const VoteController = require('./controller/VotesController');

//Configuração do multer
const multerConfig = require('./config/multer');


routes.get('/candidates', 
CandidateController.IndexCandidate);//Mostra os candidatos
routes.get('/candidates/:id',
CandidateController.ShowCandidate);//Encontra um candidato
routes.post('/candidate', 
CandidateController.CreateCandidate);//Guarda dados do candidato
routes.put('/candidate/:id', multer(multerConfig).single("file"), 
CandidateController.PutImgCandidate);//Guarda foto do candidato
routes.delete('/candidate/:id',
CandidateController.DeleteCandidate);//Apaga o candidato

routes.get('/election',
ElectionController.show);//Mostra os dados da eleição
routes.post('/election', 
ElectionController.createElection);//Cria uma eleição
routes.delete('/election',
ElectionController.DeleteElection);//Apaga a eleição

routes.put('/vote/cancel', 
VoteController.VotesCancelled);//Vota em branco
routes.put('/vote/null', 
VoteController.VotesNull);//Vota anulado
routes.put('/vote/reset', 
VoteController.RestartVotes);//Vota anulado
routes.put('/vote/:id', 
VoteController.Votes);//Vota em um candidato
routes.delete('/candidate/cancel/:id', 
VoteController.UnsuccessfulCandidate);//Vota em branco

module.exports = routes;