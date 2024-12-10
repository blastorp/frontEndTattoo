import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminsPage = () => {
  const [administradores, setAdministradores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [hash_contraseña, setHashContraseña] = useState('');
  const [nivel_acceso, setNivelAcceso] = useState('básico');
  const [telefono, setTelefono] = useState('');
  const [editId, setEditId] = useState(null); // Para editar un administrador

  useEffect(() => {
    fetchAdministradores();
  }, []);

  const fetchAdministradores = async () => {
    try {
      const response = await axios.get('/api/administradores');
      setAdministradores(response.data);
    } catch (error) {
      console.error('Error al obtener administradores', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Actualizar administrador
        await axios.put(`/api/administradores/${editId}`, { nombre, email, hash_contraseña, nivel_acceso, telefono });
      } else {
        // Crear nuevo administrador
        await axios.post('/api/administradores', { nombre, email, hash_contraseña, nivel_acceso, telefono });
      }
      fetchAdministradores(); // Refrescar la lista
      resetForm();
    } catch (error) {
      console.error('Error al guardar administrador', error);
    }
  };

  const handleEdit = (admin) => {
    setNombre(admin.nombre);
    setEmail(admin.email);
    setHashContraseña(admin.hash_contraseña);
    setNivelAcceso(admin.nivel_acceso);
    setTelefono(admin.telefono);
    setEditId(admin.administrador_id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/administradores/${id}`);
      fetchAdministradores(); // Refrescar la lista
    } catch (error) {
      console.error('Error al eliminar administrador', error);
    }
  };

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setHashContraseña('');
    setNivelAcceso('básico');
    setTelefono('');
    setEditId(null);
  };

  return (
    <div>
      <h1>Gestión de Administradores</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={hash_contraseña} onChange={(e) => setHashContraseña(e.target.value)} placeholder="Contraseña" required />
        <select value={nivel_acceso} onChange={(e) => setNivelAcceso(e.target.value)}>
          <option value="básico">Básico</option>
          <option value="avanzado">Avanzado</option>
          <option value="superadmin">Superadmin</option>
        </select>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" />
        <button type="submit">{editId ? 'Actualizar' : 'Agregar'}</button>
        <button type="button" onClick={resetForm}>Cancelar</button>
      </form>

      <h2>Lista de Administradores</h2>
      <ul>
        {administradores.map((admin) => (
          <li key={admin.administrador_id}>
            {admin.nombre} - {admin.email} - {admin.nivel_acceso}
            <button onClick={() => handleEdit(admin)}>Editar</button>
            <button onClick={() => handleDelete(admin.administrador_id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminsPage;

