import React, { useState } from 'react';

const OfertaForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        descuento: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className="oferta-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
            />
            <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
            ></textarea>
            <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
            />
            <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
            />
            <input
                type="number"
                name="descuento"
                placeholder="Descuento (%)"
                value={formData.descuento}
                onChange={handleChange}
            />
            <button type="submit">Guardar Oferta</button>
        </form>
    );
};

export default OfertaForm;
