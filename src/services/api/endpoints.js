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
    
    //Galeria
    GETGALERIAPUBLICADOS: "api/Galeria/Publicados", 
    GETGALERIAPORARTISTA: "api/Galeria/PorArtista/{idArtista}", 
    CREATEGALERIA: "api/Galeria", 
    UPDATEGALERIA: "api/Galeria/{id}", 

    //JoinGaleriaCategoria
    GETALLJOINGALERIACATEGORIA: "api/JoinGaleriaCategoria", 
    GETCATEGORIASPORTATUAJE: "api/JoinGaleriaCategoria/Categorias/{idTatuaje}", 
    GETGALERIAPORCATEGORIA: "api/JoinGaleriaCategoria/Galeria/{idCategoria}", 
    GETJOINGALERIACATEGORIA: "api/JoinGaleriaCategoria/{idGaleriaCategoria}", 
    CREATEJOINGALERIACATEGORIA: "api/JoinGaleriaCategoria", 
    UPDATEJOINGALERIACATEGORIA: "api/JoinGaleriaCategoria",

    //JoinMembresiaBeneficio
    GETBENEFICIOSPORMEMBRESIA: "api/JoinMembresiaBeneficio/Membresia/{idMembresia}", 
    GETTODOSBENEFICIOS: "api/JoinMembresiaBeneficio", 
    CREATEBENEFICIO: "api/JoinMembresiaBeneficio", 
    UPDATEBENEFICIO: "api/JoinMembresiaBeneficio/{id}", 

    // JoinUsuarioMembresia
    GETMEMBRESIASACTIVAS: "api/JoinUsuarioMembresia/Activas/{idUsuario}", 
    GETMEMBRESIASPROXIMASRENOVACION: "api/JoinUsuarioMembresia/ProximasRenovacion/{diasAntes}", 
    CREATEMEMBRESIABENEFICIO: "api/JoinUsuarioMembresia", 
    UPDATEMEMBRESIABENEFICIO: "api/JoinUsuarioMembresia", 

    //Membresias  
   
    GETMEMBRESIABYID: "api/membresias/{id}",

  
  };

  export default ENDPOINTS