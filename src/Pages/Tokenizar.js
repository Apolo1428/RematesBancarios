import ABI from "../ContractsInfo/ABI.json";
import BYTECODE from "../ContractsInfo/BYTECODE.json";
import React, { useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
const { ethers } = require("ethers");

const Tokenizar = () => {
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');
    const [rendimiento, setRendimiento] = useState('');

    const handleProgramarPago = async(e) => {
        e.preventDefault();
        if (window.ethereum) {
            try {
              // Solo se despliega en la red actual de la wallet
              await window.ethereum.request({ method: 'eth_requestAccounts' });
              const provider = new ethers.BrowserProvider(window.ethereum);
              const signer = await provider.getSigner();
              const factory = new ethers.ContractFactory(ABI, BYTECODE, signer);
              let contract = await factory.deploy(
                    ethers.parseUnits(precio, 0),
                    rendimiento,
                    ethers.parseUnits(cantidad,18),
              );
              await addDoc(collection(db, "RematesBancarios"), {
                name: nombre,
                number: cantidad,
                cost: precio,
                yield: rendimiento,
                address: contract.target,
                owner: signer.address 
              });

            } catch (error) {
                alert("Error al conectar con Metamask o al obtener saldo")
                console.error("Error al conectar con Metamask o al obtener saldo:", error);
            }
          } else {
                alert("Por favor, instala Metamask");
          }
        
    };

    const setCantidad2 = (value) => {
        if ((value >= 0 && value <= 10e8) || value === '') {
            setCantidad(value);
        }
    }
    const setRendimiento2 = (value) => {
        if ((value >= 0 && value <= 100) || value === '') {
            setRendimiento(value);
        }
    }
    return (
        <div className = 'Tokenizar'>
        <form onSubmit={handleProgramarPago} className='formCustom'>
            <h4>Crear un token de un remate bancario</h4>
            <input
                type="text"
                list = "lista"
                placeholder="Nombre de remate bancario"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <input
                type="file"
                placeholder="subir archivo"
                accept=".zip, .rar"
                id="myfile" 
                name="myfile"
                required
            />
            <br></br>
            <input
                type="number"
                placeholder="Cantidad de tokens por inmueble"
                value={cantidad}
                onChange={(e) => setCantidad2(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <input
                type="number"
                placeholder="Precio de token en USDC"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <input
                type="number"
                placeholder="Rendimiento anual por token %"
                value={rendimiento}
                onChange={(e) => setRendimiento2(e.target.value)}
                required
                autoComplete='off'
            />
            <br></br>
            <button type="submit">Efectuar Token</button>
        </form>
        </div>
    );
};

export default Tokenizar;
