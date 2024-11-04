import React from 'react';

const Inicio = () => {
    // Datos de ejemplo de pagos
   

    return (
    <div class="container" className='contenedor2'>
        <div class="header">
            <h1>Tokenización de Bienes Inmuebles</h1>
            <p>Invierte en bienes inmuebles de manera accesible, segura y digital.</p>
        </div>
        
        <div class="features">
            <div class="feature-box">
                <h3>Inversión Accesible</h3>
                <p>Compra tokens que representan fracciones de bienes inmuebles de alto valor sin la necesidad de grandes capitales.</p>
            </div>
            <div class="feature-box">
                <h3>Seguridad Blockchain</h3>
                <p>Todos los activos están tokenizados en blockchain, lo que garantiza transparencia y seguridad en cada transacción.</p>
            </div>
            <div class="feature-box">
                <h3>Genera Ganancias</h3>
                <p>Obtén ingresos pasivos con el potencial de crecimiento en el valor de tus tokens, respaldados por bienes reales.</p>
            </div>
        </div>
        
        <button class="cta-button">Empieza a Invertir</button>
    </div>
    );
};

export default Inicio;
