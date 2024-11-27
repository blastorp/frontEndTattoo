export const ENDPOINTS = {
    GETARTISTAS: "Artista/listarPlanes",
    GETARTISTAXID: "/Artista/getOneArtistaById",
    COMMENTS: "comments",

    //AgendaArtista
    GETARTISTAAVAILABILITY: "/api/AgendaArtista/{idArtista}/Disponibilidad", 
    CREATEARTISTAAGENDA: "/api/AgendaArtista", 
    UPDATEARTISTAAGENDA: "/api/AgendaArtista/{idAgenda}", 
    GETARTISTAAGENDAPORID: "/api/AgendaArtista/{idAgenda}", 

    //Galeria
    GETGALERIAPUBLICADOS: "/api/Galeria/Publicados", 
    GETGALERIAPORARTISTA: "/api/Galeria/PorArtista/{idArtista}", 
    CREATEGALERIA: "/api/Galeria", 
    UPDATEGALERIA: "/api/Galeria/{id}", 

    //JoinGaleriaCategoria
    GETALLJOINGALERIACATEGORIA: "/api/JoinGaleriaCategoria", 
    GETCATEGORIASPORTATUAJE: "/api/JoinGaleriaCategoria/Categorias/{idTatuaje}", 
    GETGALERIAPORCATEGORIA: "/api/JoinGaleriaCategoria/Galeria/{idCategoria}", 
    GETJOINGALERIACATEGORIA: "/api/JoinGaleriaCategoria/{idGaleriaCategoria}", 
    CREATEJOINGALERIACATEGORIA: "/api/JoinGaleriaCategoria", 
    UPDATEJOINGALERIACATEGORIA: "/api/JoinGaleriaCategoria",

    //JoinMembresiaBeneficio
    GETBENEFICIOSPORMEMBRESIA: "/api/JoinMembresiaBeneficio/Membresia/{idMembresia}", 
    GETTODOSBENEFICIOS: "/api/JoinMembresiaBeneficio", 
    CREATEBENEFICIO: "/api/JoinMembresiaBeneficio", 
    UPDATEBENEFICIO: "/api/JoinMembresiaBeneficio/{id}", 

    // JoinUsuarioMembresia
    GETMEMBRESIASACTIVAS: "/api/JoinUsuarioMembresia/Activas/{idUsuario}", 
    GETMEMBRESIASPROXIMASRENOVACION: "/api/JoinUsuarioMembresia/ProximasRenovacion/{diasAntes}", 
    CREATEMEMBRESIA: "/api/JoinUsuarioMembresia", 
    UPDATEMEMBRESIA: "/api/JoinUsuarioMembresia", 

    //Membresias
    GETMEMBRESIASACTIVAS: "/api/JoinUsuarioMembresia/Activas/{idUsuario}", 
    GETMEMBRESIASPROXIMASRENOVACION: "/api/JoinUsuarioMembresia/ProximasRenovacion/{diasAntes}", 
    CREATEMEMBRESIA: "/api/JoinUsuarioMembresia",
    UPDATEMEMBRESIA: "/api/JoinUsuarioMembresia", 
  
  
  };

  export default ENDPOINTS