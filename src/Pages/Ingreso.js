import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; 
import { collection, query, where, getDocs } from 'firebase/firestore'; 

const Ingreso = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, "UsuariosRemates"), 
      where("username", "==", username), 
      where("password", "==", password))
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          navigate('/Principal');
      } else {
          alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
        alert('Error al iniciar sesión');
        console.error("Error al iniciar sesión:", error);
    }
  };
  const goToRegister = () => {
    navigate('/Registro');
  };
  return (
    <div className='login-wrapper'>
        <img src = {require('../logoRBT.png')} style={{width:'150px', margin: '20px'}}></img>

        <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder='Nombre usuario'
                autoComplete='off'
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                value={password}
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='off'
            />
            </div>
            <button type="submit">Iniciar Sesión</button>
            
        </form>
        <p style = {{marginTop: "12px"}}>¿No tienes cuenta?</p>
        <button onClick={goToRegister} className="RegisterBtn">Registrarse</button>
       
        </div>
    </div>
  );
};

export default Ingreso;
