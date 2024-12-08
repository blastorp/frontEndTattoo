import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                contraseña,
            });

            // Guardar el token en localStorage
            localStorage.setItem('token', response.data.token);

            // Obtener el tipo de usuario de la respuesta
            const userType = response.data.tipo_usuario;

            // Redirigir según el tipo de usuario
            switch (userType) {
                case 'admin':
                    navigate('/dashboard/admin');
                    break;
                case 'artist':
                    navigate('/dashboard/artist');
                    break;
                case 'studio-head':
                    navigate('/dashboard/studio-head');
                    break;
                default:
                    navigate('/dashboard/user');
            }
        } catch (error) {
            setMensaje(error.response?.data?.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div className="card">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Login;

