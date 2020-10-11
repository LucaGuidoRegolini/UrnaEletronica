import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css'

export default function Menu() {
    const history = useHistory();

    async function handleCandidates(e) {
        e.preventDefault();
        try{
            history.push('/candidates');
        }catch (err){
            alert('Tente novamente')
        }
    }

    async function handleVote(e) {
        e.preventDefault();
        try{
            history.push('/election');
        }catch (err){
            alert('Tente novamente')
        }
    }

    async function handleDates(e) {
        e.preventDefault();
        try{
            history.push('/votes');
        }catch (err){
            alert('Tente novamente')
        }
    }

    return (
        <div className="menu-container">
            <div className="menu">
                <div>
                    <button className="button" type="push" onClick={handleCandidates} >
                    Gerenciar Candidatos</button>
                    <button className="button" type="push" onClick={handleVote}>
                    Votar</button>
                    <button className="button" type="push" onClick={handleDates}>
                    Gerenciar Votação</button>
                </div>
            </div>
        </div>
    )
}