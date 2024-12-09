export const ENDPOINTS = {
    GETARTISTAS: "Artista/listarPlanes",
    GETARTISTAXID: "/Artista/getOneArtistaById",
    COMMENTS: "comments",

    //AgendaArtista
    GET_ARTISTA_POR_IDNOMBRE: "api/Artistas",

    GET_ALL_AGENDAARTISTAS: "api/AgendaArtista",
    UPDATE_DMP_AGENDA_ARTISTA: "api/AgendaArtista/Actualizar/{idAgenda}", 
    GET_ARTISTAAGENDA_POR_ID: "api/AgendaArtista/{idAgenda}", 
    UPDATE_ARTISTA_AGENDA: "api/AgendaArtista/{idAgenda}", 
    CREATE_ARTISTAAGENDA: "api/AgendaArtista", 
    
    /*GETARTISTAAVAILABILITY: "api/AgendaArtista/{idArtista}/Disponibilidad",  en stand by*/
    
    //Membresias
    GET_BENEFICIOS: "api/Beneficios",
    
    CREATE_MEMBRESIA: "api/Membresias",
    GET_ALL_MEMBRESIAS: "api/Membresias",
    GET_MEMBRESIAS_POR_ID: "api/Membresias/{idMembresia}",
    UPDATE_PUBLICAR_MEMBRESIA: "api/Membresias/Actualizar/{idMembresia}",
    UPDATE_MEMBRESIA: "api/Membresias/MembresiasActualizar/{idMembresia}",
    
    //Testimonios
    CREATE_TESTIMONIOS: "api/Testimonios",
    GET_ALL_TESTIMONIOS: "api/Testimonios",
    GET_ULTIMOS_TESTIMONIOS: "api/Testimonios/Ultimos",
    UPDATE_PUBLICAR_TESTIMONIOS: "api/Testimonios/Actualizar/{idTestimonio}",
    DELETE_TESTIMONIOS: "api/Testimonios/{idTestimonio}",
    DELETE_PVETADA_TESTIMONIOS: "api/Testimonios/EliminarPorPalabrasVetadas",

    CREATE_PALABRAS_VETADAS: "api/PalabrasVetadas",
    GET_ALL_PALABRAS_VETADAS: "api/PalabrasVetadas",
    GET_PALABRAS_VETADAS_POR_ID: "api/PalabrasVetadas/{id}",
    UPDATE_PALABRAS_VETADAS: "api/PalabrasVetadas/Actualizar/{id}",
    DELETE_PALABRAS_VETADAS: "api/PalabrasVetadas/{id}",

    //Galeria
    GET_ALL_GALERIA: "api/Galeria/", 
    GET_GALERIA_POR_ID: "api/Galeria/{idTatuaje}", 
    GET_SUBCATEGORIAS: "api/Galeria/Subcategorias/{filtroNombre}", 
    CREATE_GALERIA: "api/Galeria/", 
    UPDATE_GALERIA: "api/Galeria/{idTatuaje}",
    UPDATE_GALERIA_MEMBRESIA: "api/Galeria/Actualizar/{idTatuaje}",

  };

  export default ENDPOINTS