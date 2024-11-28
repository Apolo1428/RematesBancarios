import React, { useState, useEffect } from "react";
import CuadroCatalogo from '../Components/CuadroCatalogo'
import { ethers } from "ethers";
import { db } from '../firebase'; 
import { query, collection, getDocs, addDoc, where, updateDoc, doc } from "firebase/firestore";
import ABI from "../ContractsInfo/ABI.json";
import ABI_MOCK from "../ContractsInfo/ABI_MOCK.json";



const Catalogo = () => {
    const [catalog, setCatalog] = useState([]);
    const [state, setState] = useState(false);
    const [numComprar, setNumComprar] = useState(false);

    const [nombreContrato, setNombreContrato] = useState('');
    const [costoContrato, setCostoContrato] = useState('');
    const [numeroContrato, setNumeroContrato] = useState('');
    const [ownerContrato, setOwnerContrato] = useState('');
    const [rendContrato, setRendContrato] = useState('');
    const [dirContrato, setDirContrato] = useState('');

    const salirComprar = () => {
        setState(false);
    }
    const ComprarToken = async (e) => {
        e.preventDefault();
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        let num_ = Number(numComprar)*Number(costoContrato);
        let tokensbuy = ethers.parseUnits(numComprar,18);
        try {
            const contract = new ethers.Contract(dirContrato, ABI, signer);
            await contract.connect(signer).buyTokens(tokensbuy);

            const userQuery = query(
                collection(db, "MisRemates"),
                where("address", "==", signer.address),
                where("addressContract", "==", dirContrato)
            );
            const contractQuery = query(
                collection(db, "RematesBancarios"),
                where("address", "==", dirContrato),
            );

            const querySnapshot = await getDocs(userQuery);
            const queryContracts = await getDocs(contractQuery);
        
            if (!querySnapshot.empty) {
                // Si el documento ya existe, actualizar el campo "numTokens"
                const existingDoc = querySnapshot.docs[0];
                const newNumTokens = Number(existingDoc.data().numTokens) + Number(numComprar);
        
                await updateDoc(doc(db, "MisRemates", existingDoc.id), {
                    numTokens: newNumTokens.toString(),
                });
            } else {
                await addDoc(collection(db, "MisRemates"), {
                    address: signer.address,
                    name: nombreContrato,
                    addressContract: dirContrato,
                    numTokens: numComprar,
                    yield: rendContrato,
                    owner: ownerContrato,
                    cost: costoContrato,
                });
            }
            if (!queryContracts.empty) {
                const existingDoc = queryContracts.docs[0];
                const newNumTokens = Number(existingDoc.data().number) - Number(numComprar);
                await updateDoc(doc(db, "RematesBancarios", existingDoc.id), {
                    number: newNumTokens.toString(),
                });
            }

            return;
        }catch (error) {
           if (error.reason === 'USDC allowance too low'){
            const mockContract= new ethers.Contract('0x7570cC94d3ea389cE659DeC12d659356f253066A', ABI_MOCK, signer);
            await  mockContract.approve(dirContrato, ethers.parseUnits(num_.toString(),18));
            
           }
           
        }
    }

    const setNumComprar2 = (value) => {
        if (value <= Number(numeroContrato) && value >= 0){
            setNumComprar(value); 
        }
    }
    const renderComprar = () => {
        return (
            <div>
                <button className = 'atras' onClick={salirComprar}>x</button> 
                <div className = 'ComprarToken'>
                    <h4>Contrato: {nombreContrato}</h4>
                    <ul>
                        <li>Costo: {costoContrato}</li>
                        <li>Numero: {numeroContrato}</li>
                        <li>Rendimiento: {rendContrato}</li>
                        <li>Dirección de contrato: {dirContrato}</li>
                    </ul>

                    <form onSubmit={ComprarToken} className='formCustom'>
                    <input
                        type="number"
                        placeholder="Numero de tokens a comprar"
                        value={numComprar}
                        onChange={(e) => setNumComprar2(e.target.value)}
                        required
                        autoComplete='off'
                    />
                    <br></br>
                    <button type = 'submit'>Comprar</button> 
                    </form>
                
                </div>  
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
        setOwnerContrato(catalogo.owner);
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
        return <div className = 'tbody'>{rows}</div>
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
            address: doc.data().address,
            owner: doc.data().owner 
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