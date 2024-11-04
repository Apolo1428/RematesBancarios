import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Ingreso = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/Principal');
  };
  const goToRegister = () => {
    navigate('/Registro');
    };
  return (
    <div className='login-wrapper'>
        <img src = {require('../logo192.png')}></img>

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
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                value={password}
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <button type="submit">Iniciar Sesión</button>
            
        </form>
        <p>¿No tienes cuenta?</p>
        <button onClick={goToRegister} className="RegisterBtn">Registrarse</button>
       
        </div>
    </div>
  );
};

export default Ingreso;
