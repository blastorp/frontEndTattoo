import React, { useEffect, useState } from "react";
import MainAdmin from "../../../layouts/MainAdmin2";
import TarjetaLinkAdd from "../components/TarjetaLinkAdd";
import Tarjeta from "../components/Tarjeta";
import fetchApiM1 from "../../../services/api/fetchApiM1";
import ENDPOINTS from "../../../services/api/endpoints";
import '../estilos/CategoriaDash.css';

function CategoriasDash() {

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ search: "", publicados: false, archivados: false, activos: true });
    const [sortOption, setSortOption] = useState("nombre");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await fetchApiM1(ENDPOINTS.GETCATEGORIAS);
            if (Array.isArray(result)) {
              setData(result);
            } else {
              setError("Unexpected data format.");
            }
          } catch (err) {
            setError(err.message);
          }
        };
    
        fetchData();
      }, []);
      const filteredAndSortedData = [...data]
      .filter((item) => {
        return (
          (!filters.search || item.nombre.toLowerCase().includes(filters.search.toLowerCase())) &&
          (!filters.publicados || item.publicado ) &&
          (!filters.archivados || item.archivado ) &&
          (!filters.activos || !item.archivado )
        );
      })
      .sort((a, b) => {
        if (sortOption === "nombre") {
          return a.nombre.localeCompare(b.nombre);
        }
        if (sortOption === "Fecha") {
          return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
        }
        return 0;
      });

      //ASIDE 
      const asideContent = (
        <div>
        <label htmlFor="searchbar">Busqueda por Nombre</label>
          <input
          id="searchbar"
          name="searchbar"
            type="text"
            placeholder="Search by name"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <div>
      <label>
        <input
          type="checkbox"
          value="activos"
          checked={filters.activos}
          onChange={(e) => {
            if (e.target.checked) {
              setFilters({
                ...filters,
                activos: true,
                archivados: false // Agregar categoría
              });
            } else {
              setFilters({
                ...filters,
                activos: false,
                archivados: true
              });
            }
            
          }}
        />
        Perfiles Activos
      </label>
      <label>
        <input
          type="checkbox"
          value="archivados"
          checked={filters.archivados}
          onChange={(e) => {
            if (e.target.checked) {
              setFilters({
                ...filters,
                archivados: true,
                activos: false
              });
            } else {
              setFilters({
                ...filters,
                archivados: false,
                activos: true
              });
            }
    
          }}
        />
        Perfiles Archivados
      </label>
      <label>
        <input
          type="checkbox"
          value="publicados"
          checked={filters.publicados}
          onChange={(e) => {
            if (e.target.checked) {
              setFilters({
                ...filters,
                publicados: true,
              });
            } else {
              setFilters({
                ...filters,
                publicados: false,
              });
            }
          }}
        />
        Perfiles Publicados
      </label>
      
    </div>
          <div>
            <label>
              <input
                type="radio"
                value="nombre"
                checked={sortOption === "nombre"}
                onChange={() => setSortOption("nombre")}
              />
              Ordenar por Nombre
            </label>
            <label>
              <input
                type="radio"
                value="fecha"
                checked={sortOption === "fecha"}
                onChange={() => setSortOption("fecha")}
              />
              Ordenar por Fecha Inicio
            </label>
          </div>
        </div>
      );
  return (
    <MainAdmin tituloPagina={"Administracion Categorias Tattoos"} asideContent={asideContent}>
      <div className="contenedorContenidoPagina">
        <TarjetaLinkAdd />
        {filteredAndSortedData.map((item) => (
          <Tarjeta key={item.idArtista} objetoCategoria={item} />
        ))}
      </div>
    </MainAdmin>
  )
}

export default CategoriasDash