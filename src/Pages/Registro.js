import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Registro = () => {
    const [email, setEmail] = useState('');
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

    };
    const gotoIngreso = () => {
        navigate('/Ingreso');
    }

    return (
        <div className="register-wrapper">
            <img src = {require('../logo192.png')}></img>
        <div className="register-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>

                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                    placeholder='example@email.com'
                />
                <br/>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUser(e.target.value)} 
                    required 
                    placeholder='Nombre usuario'
                />
                <br/>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    placeholder='Contraseña' 
                />
                <br/>
                <input 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    placeholder='Repetir contraseña' 
                />
                <br/>
                <button type="submit">Registrarse</button>
            </form>

            <p>
                ¿Ya tienes cuenta? <span onClick={() => gotoIngreso} className="link">Inicia Sesión</span>
            </p>
        </div>
        </div>
    );
};

export default Registro;
