import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import {FiPlus } from 'react-icons/fi'

import api from '../../Services/api'

import './styles.css'

import Logoimg from '../../assets/logoimg.png'

export default function Profile() {
    var pause
    const [candidates, setCandidates] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('/candidates').then((response) => {
            setCandidates(response.data);
        }, (error) => {
            console.log(error);
        })
    },[pause])

    async function handleDeleteIncident(id){
        try{
            const r = window.confirm("O candidato sera excluido");
            if(r===true){
                await api.delete('candidate/cancel/'+id);
                setCandidates(candidates.filter(candidates => candidates._id !== id ))
            }else{
            }
            
           
        }catch (err) {
            alert('Erro ao deletar caso, tente de novo mais tarde')
        }
    }

    async function handleMenu() {
        history.push('/');
    }

    async function handleCreate() {
        history.push('/create');
    }

    return (
        <div className="candidate-container">
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
                    <li key={candidate._id} onClick={() => handleDeleteIncident(candidate._id)} className="candidate"> 
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
                                <strong>PARTIDO</strong>
                                <p>{candidate.party}</p>
                            </div>
                            <div className="Date3">
                                <strong>NUMERO</strong>
                                <p>{candidate.number}</p>
                            </div> 
                        </div>     
                    </li>
                    ))}
                    <li className="candidate">
                        <div className="Plus" onClick={() => handleCreate()}>
                        <FiPlus size={200} color="#C4C4C4"/>
                        </div>     
                    </li>  
                    </ul>
                </body>

            </div>
        </div>
    )
}