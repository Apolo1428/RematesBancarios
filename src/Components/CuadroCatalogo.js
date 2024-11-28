const CuadroCatalogo = (props) => {
    const change = () => {
        props.onClick();
    }
     
    return (
        <div className = 'cuadroCatalogo' onClick = {() => change()}>
            <h2>{props.name}</h2>
            <p><b>Costo 1 RBT:</b> {props.cost} USDC</p>
            <p><b>Cantidad RBT: </b>{props.number} RBT</p>
            <p><b>Rendimiento anual: </b>{props.yield}%</p>
        </div>
    );
};

export default CuadroCatalogo;