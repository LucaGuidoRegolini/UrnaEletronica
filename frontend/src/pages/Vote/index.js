import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {FiPlus } from 'react-icons/fi'

import api from '../../Services/api'

import './styles.css'

import Logoimg from '../../assets/logoimg.png'

export default function Profile() {
    var pause
    const [candidates, setCandidates] = useState([]);
    const [adm, setAdm] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('/candidates').then((response) => {
            setCandidates(response.data);
        }, (error) => {
            console.log(error);
        })

        api.get('/election').then((response) => {
            setAdm(response.data[0]);
        }, (error) => {
            console.log(error);
        })
    },[pause])

    async function handleMenu() {
        history.push('/');
    }

    return (
        <div className="vote-container">
            <header>
                <img className="Link" onClick={() => handleMenu()} src={Logoimg} alt="Eleições 2020" width="110" height="100" />
            </header>
            <div>
                <div>
                    <div className="Titulo">
                        <h3>CANDIDATOS</h3>
                    </div>
                </div>
                
                <body>
                    <ul>
                    {candidates.map(candidate =>(
                    <li key={candidate._id}> 
                        <div className="Candidate">
                            <img src={"http://localhost:3333/files/"+candidate.file} 
                            alt="Eleições 2020" width="180" height="180"></img>  
                        </div>
                        <div className="Date1">
                            <strong>NOME</strong>
                            <p>{candidate.name}</p>
                        </div>
                            <div className="DateG">
                            <div className="Date2">
                                <strong>VOTOS</strong>
                                <p>{candidate.votes}</p>
                            </div>
                            <div className="Date3">
                                <strong>PERCENTUAL</strong>
                                <p>{(candidate.votes/adm.votesTotal)*100}%</p>
                            </div> 
                        </div>     
                    </li>
                    ))}
 
                    <li className="candidate">
                    <div className="Candidate">
                            <img src={"http://localhost:3333/files/null.png"} 
                            alt="Eleições 2020" width="180" height="180"></img>  
                        </div>
                        <div className="Date1">
                            <strong>NOME</strong>
                            <p>Nulo</p>
                        </div>
                            <div className="DateG">
                            <div className="Date2">
                                <strong>VOTOS</strong>
                                <p>{adm.votesNull}</p>
                            </div>
                            <div className="Date3">
                                <strong>PERCENTUAL</strong>
                                <p>{(adm.votesNull/adm.votesTotal)*100}%</p>
                            </div> 
                        </div>     
                    </li>  

                    <li className="candidate">
                    <div className="Candidate">
                            <img src={"http://localhost:3333/files/white.jpg"} 
                            alt="Eleições 2020" width="180" height="180"></img>  
                        </div>
                        <div className="Date1">
                            <strong>NOME</strong>
                            <p>Branco</p>
                        </div>
                            <div className="DateG">
                            <div className="Date2">
                                <strong>VOTOS</strong>
                                <p>{adm.votesCanceled}</p>
                            </div>
                            <div className="Date3">
                                <strong>PERCENTUAL</strong>
                                <p>{(adm.votesCanceled/adm.votesTotal)*100}%</p>
                            </div> 
                        </div>     
                    </li>  
                    </ul>
                    <div className="info">
                    <p>Total de votos:{adm.votesTotal}</p>
                    </div>
                </body>

            </div>
        </div>
    )
}