import React from 'react';

const Inicio = () => {
    // Datos de ejemplo de pagos
   

    return (
    <div class="container" className='contenedor2'>
        <div class="header">
            <h1>Tokenización de inmuebles</h1>
            <h1>Rapido y seguro</h1>
            <p>Invierte en bienes inmuebles de manera accesible, segura y digital.</p>
            <button>Empieza a invertir</button>
        </div>
        
        <div className ="features">
            <div className ="feature-box">
                <h3>Inversión Accesible</h3>
                <p>Compra tokens que representan fracciones de bienes inmuebles de alto valor sin la necesidad de grandes capitales.</p>
            </div>
            <div className="feature-box">
                <h3>Seguridad Blockchain</h3>
                <p>Todos los activos están tokenizados en blockchain, lo que garantiza transparencia y seguridad en cada transacción.</p>
            </div>
            <div className="feature-box">
                <h3>Genera Ganancias</h3>
                <p>Obtén ingresos pasivos con el potencial de crecimiento en el valor de tus tokens, respaldados por bienes reales.</p>
            </div>
        </div>
        <div className = 'flex'>
            <div className = "title">Ofrecemos</div>
            <div className="features2">
                <div className="feature-box2">
                    <h3>Tokenización de bienes inmuebles</h3>
                    <p>Puedes poner a la venta los bienes indicando su precio y cantidad de tokens a dividir.</p>
                </div>
                <div className="feature-box2">
                    <h3>Compra de tokens</h3>
                    <p>Puedes comprar los tokens del catálogo de bienes, recibiendo ganancias anuales de hasta el 15% por cada token. <br/>¡A más tokens más ganancias!</p>
                </div>
                <div className="feature-box2">
                    <h3>Cobro de rendimiento</h3>
                    <p>Reclama tus ganancias manualmente desde la plataforma.</p>
                </div>
            </div>
            
        </div>
    </div>
    );
};

export default Inicio;
