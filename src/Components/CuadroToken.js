const CuadroToken = (props) => {
    const change = () => {
        props.onClick();
    }
     
    return (
        <div className = 'cuadroCatalogo' onClick = {() => change()}>
            <h2>{props.name}</h2>
            <p><b>Dueño del rbt</b> {props.owner}</p>
            <p><b>Direccion Contrato</b> {props.address}</p>
            <p><b>Mi cantidad de RBT: </b>{props.number} RBT</p>
            <p><b>Rendimiento anual: </b>{props.yield}%</p>
        </div>
    );
};

export default CuadroToken;