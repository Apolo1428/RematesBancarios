import React from 'react';

const EstadoPagos = () => {
    const pagosProgramados = [
        { id: 1, empresa: 'Empresa 1', monto: '1000 USDT', fecha: '2024-10-25' },
        { id: 2, empresa: 'Empresa 2', monto: '1500 USDT', fecha: '2024-11-01' },
    ];
    const pagosPendientes = [
        { id: 3, empresa: 'Empresa 3', monto: '1200 USDT', fecha: '2024-11-15' },
    ];

    return (
        <div>
        <h4>Pagos Programados
            <div className="table-container">
                <div className="table-header">
                    <div className="table-cell">Empresa</div>
                    <div className="table-cell">Monto</div>
                    <div className="table-cell">Fecha</div>
                </div>
                <div className="table-body">
                    {pagosProgramados.map((pago) => (
                        <div key={pago.id} className="table-row">
                            <div className="table-cell">{pago.empresa}</div>
                            <div className="table-cell">{pago.monto}</div>
                            <div className="table-cell">{pago.fecha}</div>
                        </div>
                    ))}
                </div>
            </div>
        </h4>
        <h4>Pagos pendientes
        <div className="table-container">
            <div className="table-header">
                <div className="table-cell">Empresa</div>
                <div className="table-cell">Monto</div>
                <div className="table-cell">Fecha</div>
            </div>
            <div className="table-body">
                {pagosPendientes.map((pago) => (
                    <div key={pago.id} className="table-row">
                        <div className="table-cell">{pago.empresa}</div>
                        <div className="table-cell">{pago.monto}</div>
                        <div className="table-cell">{pago.fecha}</div>
                    </div>
                ))}
            </div>
        </div>
        </h4> 
        </div>
    );
};

export default EstadoPagos;