import React, { useState, useEffect } from "react";
import CuadroCatalogo from '../Components/CuadroCatalogo'
import { ethers } from "ethers";
import { db } from '../firebase'; 
import { query, updateDoc, collection, getDocs, where, doc } from "firebase/firestore";
import ABI from "../ContractsInfo/ABI.json";
import BYTECODE from "../ContractsInfo/BYTECODE.json";
import ABI_MOCK from "../ContractsInfo/ABI_MOCK.json";



const Catalogo = () => {
    /* ,*/
    const [catalog, setCatalog] = useState([]);
    const [state, setState] = useState(false);
    const [numComprar, setNumComprar] = useState(false);

    const [nombreContrato, setNombreContrato] = useState('');
    const [costoContrato, setCostoContrato] = useState('');
    const [numeroContrato, setNumeroContrato] = useState('');
    const [rendContrato, setRendContrato] = useState('');
    const [dirContrato, setDirContrato] = useState('');

    const ComprarToken = async (e) => {
        e.preventDefault();
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        let num_ = Number(numeroContrato)*Number(costoContrato);
        
        const MOCK_ADDRESS = "0xF904556F9c4902e17715d8CeFfe3CbdC86d0dFA8";
        let mock_Token = new ethers.Contract(MOCK_ADDRESS, ABI_MOCK, signer);
        await mock_Token.approve(dirContrato, ethers.parseUnits(num_.toString(),18));
        console.log("Reservado");



        const contract = new ethers.Contract(dirContrato, ABI, signer);
        await contract.buyTokens(ethers.parseUnits(numeroContrato.toString(),18));

    }
    const renderComprar = () => {
        return (
            <div className = 'ComprarToken'>
                <h4>Contrato {nombreContrato}</h4>
                <p>Costo {costoContrato}</p>
                <p>Numero {numeroContrato}</p>
                <p>Yield {rendContrato}</p>
                <p>Address {dirContrato}</p>

                <form onSubmit={ComprarToken} className='formCustom'>
                <input
                    type="number"
                    placeholder="Numero de tokens a comprar"
                    value={numComprar}
                    onChange={(e) => setNumComprar(e.target.value)}
                    required
                    autoComplete='off'
                />
                <br></br>
                <button type = 'submit'>Comprar</button> 
                </form>
            
            </div>  
            
        ) 
    }
    const goToComprar = (catalogo) => {
        setState(true);
        setNombreContrato(catalogo.name);
        setCostoContrato(catalogo.cost);
        setNumeroContrato(catalogo.number);
        setRendContrato(catalogo.yield);
        setDirContrato(catalogo.address);
    }
    
    const renderCatalogo = () => {
        const rows = []
        for (let i = 0; i< catalog.length; i++){
            rows.push(<CuadroCatalogo 
                name = {catalog[i].name} 
                cost = {catalog[i].cost} 
                number = {catalog[i].number}
                yield = {catalog[i].yield} 
                address = {catalog[i].address}
                onClick = {() => goToComprar(catalog[i])}
            />);
        }
        for (let i = 0; i < catalog.length % 4; i++) {
            rows.push(<div className = 'relleno'></div>);
        }
        return <tbody>{rows}</tbody>
    }
    useEffect(() => {
        const fetchCatalogo = async () => {
          const q = query(collection(db, "RematesBancarios"));
          const querySnapshot = await getDocs(q);
          const catalogData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            number: doc.data().number,
            cost: doc.data().cost,
            yield: doc.data().yield,
            address: doc.data().address
          }));
          setCatalog(catalogData); // Actualiza el estado con los datos
        };
    
        fetchCatalogo();
      }, []);
    return (
        <div className = 'Catalogo'>
            {state !== true ? (renderCatalogo()) : (renderComprar())}
                    
        </div>
    );
};

export default Catalogo;