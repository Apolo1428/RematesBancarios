import React, { useState } from 'react';

const ProgramarPago = () => {
    const [empresa, setEmpresa] = useState('');
    const [monto, setMonto] = useState('');
    const [fecha, setFecha] = useState('');

    const handleProgramarPago = (e) => {
        e.preventDefault();
        console.log('Pago programado:', { empresa, monto, fecha });

        setEmpresa('');
        setMonto('');
        setFecha('');
    };

    return (
        <div className = 'programarpagos'>
        <form onSubmit={handleProgramarPago} className='formCustom'>
            <h4>Crear un token de un remate bancario</h4>

            <input
                type="text"
                list = "lista"
                placeholder="Remtae Bancario"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <input
                type="number"
                placeholder="Monto total de costo (moneda)"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <button type="submit">Efectuar Token</button>
        </form>
        </div>
    );
};

export default ProgramarPago;
