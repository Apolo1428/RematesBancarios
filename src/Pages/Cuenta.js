import React, { useState, useEffect } from "react";
import CuadroToken from '../Components/CuadroToken';
import ABI from "../ContractsInfo/ABI.json";
import ABI_MOCK from "../ContractsInfo/ABI_MOCK.json";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ethers } from "ethers";
import { db } from '../firebase'; 

const Cuenta = () => {
    const [catalog, setCatalog] = useState([]);

    const [balance, setBalance] = useState(null);
    const [ethAccount, setEthAccount] = useState(null);
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                // Solicita conexión a Metamask
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setEthAccount(accounts[0]);
                const mockContract = new ethers.Contract('0x7570cC94d3ea389cE659DeC12d659356f253066A', ABI_MOCK, signer);
                
                const address = await signer.getAddress();
                const balanceInWei = await mockContract.balanceOf(address);
                const balanceInMOCK = ethers.formatUnits(balanceInWei, 18); 
                
                setBalance(balanceInMOCK);
            } catch (error) {
                alert("Error al conectar con Metamask o al obtener saldo")
                console.error("Error al conectar con Metamask o al obtener saldo:", error);
            }
        } else {
            alert("Por favor, instala Metamask");
    }
    }
    const cobrar = async (catalog) => {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            const contract = new ethers.Contract(catalog.address, ABI, signer);

            await contract.claimYield();
            alert("Cobrado!");
        } catch(error) {
            console.error(error);
        }
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
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const q = query(collection(db, "MisRemates"),where("address", "==", signer.address));
            const querySnapshot = await getDocs(q);
            const catalogData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                number: doc.data().numTokens,
                cost: doc.data().cost,
                yield: doc.data().yield,
                address: doc.data().addressContract,
                owner: doc.data().owner 
          }));
          setCatalog(catalogData); // Actualiza el estado con los datos
        };
    
        fetchCatalogo();
        connectWallet();
      }, []);
    return (
            <div className = 'Cuenta'>
                <div className = 'infoCuenta'> 
                    <h3>Bienvenido</h3>
                    <p>Direccion Wallet: {ethAccount ? `${ethAccount}` : 'Connect Metamask'}</p>
                    <p>Saldo: {balance} mUSDC</p>
                </div>
                {renderCatalogo()}
            </div>
    )
}

export default Cuenta;