import React, {useState} from 'react';
import Ingreso from './Pages/Ingreso';
import Registro from './Pages/Registro';
import Principal from './Pages/Principal';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
// Actualizacion


const App = () => {
    const [isLogin, setisLogin] = useState("");

    return (
        <Router>
          <div> 
                <div>
                <Routes>
                        <Route path="/" element={<Navigate to="/Principal" replace />} />
                        <Route path="/Ingreso" element={<Ingreso />} />
                        <Route path="/Registro" element={<Registro/>} />
                        <Route path="/Principal" element={<Principal />} />
                        <Route path="/" element={<Registro/>} />
                </Routes>
                </div>
          </div>
        </Router>
    );
};

export default App;