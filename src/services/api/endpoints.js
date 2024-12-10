export const ENDPOINTS = {
    
  //Artistas
  GETARTISTAS: "Artista/listarPlanes",
    GETARTISTAXID: "Artista/getOneArtistaById",
    GUARDARARTISTA: "Artista/guardarArtista",
    EDITARTISTA: "Artista/editarArtista",
    DELETEARTISTA: "Artista/deleteArtista",
    DESPUBLICARARTISTA: "Artista/despublicarArtista",
    PUBLICARARTISTA: "Artista/publicarArtista",
    ARCHIVARARTISTA: "Artista/archivarArtista",
    //Beneficios
    GETBENEFICIOS: "Beneficio/listarBeneficios",
    GETBENEFICIOXID: "Beneficio/getOneBeneficioById",
    GUARDARBENEFICIOS: "Beneficio/guardarBeneficio",
    EDITARBENEFICIO: "Beneficio/editarBeneficio",
    DELETEBENEFICIO: "Beneficio/deleteBeneficio",
    PUBLICARBENEFICIO: "Beneficio/publicarBeneficio",
    DESPUBLICARBENEFICIO: "Beneficio/despublicarBeneficio",
    ARCHIVARBENEFICIO: "Beneficio/archivarBeneficio",
    //ArticulosCT
    GETARTICULOS: "ArticuloCT/listarArticulos",
    GETARTICULOXID: "ArticuloCT/getOneArticuloById",
    GUARDARARTICULO: "ArticuloCT/guardarArticulo",
    EDITARARTICULO: "ArticuloCT/editarArticulo",
    DELETEARTICULO: "ArticuloCT/deleteArticulo",
    PUBLICARARTICULO: "ArticuloCT/publicarArticulo",
    DESPUBLICARARTICULO: "ArticuloCT/despublicarArticulo",
    ARCHIVARARTICULO: "ArticuloCT/archivarArticulo",
    LIKEARTICULO: "ArticuloCT/likeArticulo",
    DISLIKEARTICULO: "ArticuloCT/dislikeArticulo",
    ONEUPARTICULO: "ArticuloCT/oneUpViewsArticulo",
      //elementosArticulosCT
    LISTARELEMENTOSXIDARTICULO: "HijosArticuloCT/listarHijosXIdArticuloCT",
    GUARDARELEMENTOSARTICULO: "HijosArticuloCT/guardarHijosArticuloCT",
    ELIMINARONEELEMENTOARTICULO: "HijosArticuloCT/eliminarOneHijoArticuloCT",
    ELIMINARTODOSELEMENTOSXARTICULO: "HijosArticuloCT/eliminarHijosArticuloCT",


    //Categorias
    GETCATEGORIAS: "Categoria/listarCategorias",
    GETCATEGORIAXARTISTA: "Categoria/listarCategoriasXArtista",
    GETARTISTASXCATEGORIA: "Categoria/listarArtistasXCategoria",
    ASIGNARCATEGORIAS: "Categoria/asignarCategoriaArtista",
    GUARDARCATEGORIA: "Categoria/guardarCategoria",
    DELETECATEGORIA: "Categoria/deleteCategoria",
    PUBLICARCATEGORIA: "Categoria/publicarCategoria",
    ARCHIVARCATEGORIA: "Categoria/archivarCategoria",
    DESPUBLICARCATEGORIA: "Categoria/despublicarCategoria",
    GETCATEGORIAXID: "Categoria/categoriaXId",
    EDITCATEGORIA: "Categoria/editarCategoria",
    INDICADORESCATEGORIA: "Categoria/indicadoresCategoria",

    //ImagenesArticulos
    GUARDARIMAGENARTICULO: "ImagenArticulo/guardarImagen",
    GETURLIXDIMAGEN: "ImagenArticulo/buscarUrlXID",
    

    
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
    GET_GALERIA_INICIO: "api/Galeria/Inicio",
    GET_GALERIA_CLIENTE: "api/Galeria/Cliente",
    GET_ALL_GALERIA: "api/Galeria", 
    GET_GALERIA_POR_ID: "api/Galeria/{idTatuaje}", 
    GET_SUBCATEGORIAS: "api/Galeria/Subcategorias/{filtroNombre}", 
    CREATE_GALERIA: "api/Galeria", 
    UPDATE_GALERIA: "api/Galeria/{idTatuaje}",
    UPDATE_GALERIA_PUBLICAR: "api/Galeria/Actualizar/{idTatuaje}",

  };

  export default ENDPOINTS