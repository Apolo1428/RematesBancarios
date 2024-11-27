import React, { useState, useEffect } from "react";
import CuadroToken from '../Components/CuadroToken';
import ABI from "../ContractsInfo/ABI.json";
import { query, collection, getDocs } from "firebase/firestore";
import { ethers } from "ethers";
import { db } from '../firebase'; 

const Cuenta = () => {
    const [catalog, setCatalog] = useState([]);

    const cobrar = async (catalog) => {
        alert("Cobrando contrato");
        
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(catalog.address, ABI, signer);

        await contract.claimYield();
        alert("Cobrado!");
    }
    const renderCatalogo = () => {
        const rows = []
        for (let i = 0; i< catalog.length; i++){
            rows.push(<CuadroToken
                name = {catalog[i].name} 
                owner = {catalog[i].owner}
                number = {catalog[i].number}
                yield = {catalog[i].yield} 
                address = {catalog[i].address}
                onClick = {() => cobrar(catalog[i])}
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
        <div className = 'Cuenta'>
            <div className='Opciones Cuenta'>
                
            </div>
            {renderCatalogo()}
        </div>
    )
}

export default Cuenta;