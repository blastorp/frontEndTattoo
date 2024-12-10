import React, { useEffect, useState } from 'react';
import AdminForm from '../components/AdminForm';
import AdminList from '../components/AdminList';

const AdminsPage = () => {
    const [admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        const response = await fetch('/api/admins');
        const data = await response.json();
        setAdmins(data);
    };

    const handleSubmit = async (adminData) => {
        await fetch('/api/admins/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        });
        fetchAdmins(); // Actualiza la lista después de registrar
    };

    const handleDelete = async (id) => {
        await fetch(`/api/admins/${id}`, { method: 'DELETE' });
        fetchAdmins(); // Actualiza la lista después de eliminar
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div>
            <h1>Administradores</h1>
            <AdminForm onSubmit={handleSubmit} />
            <AdminList admins={admins} onDelete={handleDelete} />
        </div>
    );
};

export default AdminsPage;
