import React, { useState } from 'react';
import EstadoPagos from './EstadoPagos';
import ProgramarPago from './ProgramarPago';
import Inicio from './Inicio';
import '../App.css'
import { FaHome } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa';
import { FaListUl} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('Inicio');

    const renderContent = () => {
        switch (selectedOption) {
            case 'Inicio':
                return <Inicio/>
            case 'Estado de pagos':
                return <EstadoPagos />;
            case 'Programar Token':
                return <ProgramarPago />;
            case 'Iniciar sesion':
                navigate('/Ingreso');
            default:
                return <Inicio />;
        }
    };
    const navInicio = () => {
        navigate('/Principal');
    }
    return (
            <div>
            <div className = "navbar">
                <div style = {{display: 'flex', justifyContent: "space-between", width: "100vw", cursor: 'pointer'}} onClick={navInicio}>
                    <div style={{display: 'flex'}}>
                        <img src = {require("../logoRBT.png")} width = "50px" height = "50px" />
                        <h1>
                            REMATES BANCARIOS
                        </h1>
                    </div>
                    <div>
                    <ul>
                        <li onClick={() => setSelectedOption('Inicio')} style = {{display: 'flex'}}>
                        </li>
                        <li onClick={() => setSelectedOption('Estado de pagos')}>
                            <a>
                            Estado de pagos
                            </a>
                        </li>
                        <li onClick={() => setSelectedOption('Programar Token')}>
                            <a>
                            Programar pago
                            </a>
                        </li>
                        <li onClick={() => setSelectedOption('Iniciar sesion')}>
                            <a>
                            Iniciar sesión
                            </a>
                        </li>
                    </ul> 
                    </div>
                </div>
            </div> 
            <div className = "content" id = "contenedor">
                {renderContent()}
            </div>
            </div>
    )
};

export default Principal;
