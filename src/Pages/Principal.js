import React, { useState } from 'react';
import Inicio from './Inicio';
import '../App.css'
import Catalogo from './Catalogo'
import Cuenta from './Cuenta'
import Tokenizar from './Tokenizar'

import { useNavigate, Route, Routes } from 'react-router-dom';

const Principal = () => {
    const [page,setPage] = useState('');
    const navigate = useNavigate();



    const gotoPage = (caso) => {
        switch (caso) {
            case 'Inicio': 
                return <Inicio/>
            case 'Catalogo': 
                return <Catalogo/>
            case 'Cuenta': 
                return <Cuenta/>
            case 'Tokenizar': 
                return <Tokenizar/>
            case 'Ingreso': 
                navigate('/Ingreso')
            default:
                return <Inicio/>
        }
    }
    return (
            <div className = 'Principal'>
            <div className = "navbar">
                <div style = {{display: 'flex', justifyContent: "space-between", width: "100vw"}}>
                    <div style={{display: 'flex', cursor: 'pointer'}} onClick={() => setPage('Inicio')}>
                        <img src = {require("../logoRBT.png")} width = "50px" height = "50px" />
                        <h1>
                            REMATES BANCARIOS
                        </h1>
                    </div>
                    <ul>
                        <li onClick={() => setPage('Catalogo')}>
                            <a>
                            Catalogo
                            </a>
                        </li>
                        <li onClick={() => setPage('Tokenizar')}>
                            <a>
                            Tokenizar
                            </a>
                        </li>
                        <li onClick={() => setPage('Cuenta')}>
                            <a>
                            Cuenta
                            </a>
                        </li>
                    </ul> 
                </div>
            </div> 
            <div className = "content" id = "contenedor">
                {gotoPage(page)}

            </div>
            </div>
    )
};

export default Principal;
