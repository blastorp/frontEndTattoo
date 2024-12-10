import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [tipo_usuario, setTipoUsuario] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const tipoUsuarioValidado = tipo_usuario === 'cliente' ? tipo_usuario : 'cliente'; // Valor predeterminado
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                nombre,
                email,
                contraseña,
                tipo_usuario: tipoUsuarioValidado,
            });
            console.log(response.data); // Muestra la respuesta en la consola

            setMensaje('Registro exitoso');
        } catch (error) {
            setMensaje(error.response.data.message || 'Error al registrar');
        }
    };

    return (
        <div className="card">
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
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
                <select
                    value={tipo_usuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    required
                >
                    <option value="">Seleccione el tipo de usuario</option>
                    <option value="cliente">Cliente</option>
                </select>
                <button type="submit">Registrar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default Register;
