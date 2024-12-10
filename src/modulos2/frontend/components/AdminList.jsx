import React from 'react';

const AdminList = ({ admins, onDelete }) => {
    return (
        <ul>
            {admins.map(admin => (
                <li key={admin.administrador_id}>
                    {admin.nombre} - {admin.email}
                    <button onClick={() => onDelete(admin.administrador_id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default AdminList;