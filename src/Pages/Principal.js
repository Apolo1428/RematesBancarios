import React, { useState } from 'react';
import EstadoPagos from './EstadoPagos';
import ProgramarPago from './ProgramarPago';
import Inicio from './Inicio';
import '../App.css'
import { FaHome } from 'react-icons/fa';
import { FaCreditCard } from 'react-icons/fa';
import { FaListUl} from 'react-icons/fa';

const Principal = () => {
    const [selectedOption, setSelectedOption] = useState('Estado de pagos');

    const renderContent = () => {
        switch (selectedOption) {
            case 'Inicio':
                return <Inicio/>
            case 'Estado de pagos':
                return <EstadoPagos />;
            case 'Programar Token':
                return <ProgramarPago />;
            default:
                return <Inicio />;
        }
    };
    return (
            <div>
            <div className = "navbar">
                <ul>
                    <li onClick={() => setSelectedOption('Inicio')}>
                        <a>
                        Inicio</a>
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
                </ul> 
            </div> 
            <div className = "content" id = "contenedor">
                <h3 className = 'titleRender'>{selectedOption}</h3>
                {renderContent()}
            </div>
            </div>
    )
};

export default Principal;
