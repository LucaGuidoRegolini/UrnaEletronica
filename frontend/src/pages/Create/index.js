import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css'

export default function Menu() {
    

    return (
        <div className="form-container">
            <div className="form">
                <div>
                    <div>
                        <img src={"http://localhost:3333/files/null.png"} 
                            alt="Eleições 2020" width="180" height="180"></img>

                        <form>
                            <label for="name">NOME</label>
                            <input type="text" id="name" name="name"/>
                        </form>
                    </div>
                    <div className="options">

                    </div>

                </div>
            </div>
        </div>
    )
}