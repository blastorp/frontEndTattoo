const BASE_URL = "https://tiusr39pl.cuc-carrera-ti.ac.cr/toi";
//const BASE_URL = "https://localhost:7257";
//const BASE_URL = "https://tiusr39pl.cuc-carrera-ti.ac.cr/apiTattoo";

// const fetchApiM1 = async (segmentoRuta, cabecera) => {
//   try {
//     const response = await fetch(`${BASE_URL}/${segmentoRuta}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw error;
//   }  
// };


// const fetchApiM1 = async (segmentoRuta, metodo = "GET", cuerpo = null, cabecera = {}) => {
//   try {
//     const opciones = {
//       method: metodo, // GET, POST, PUT, DELETE, etc.
//       headers: {
//         "Content-Type": "application/json", // Por defecto se usa JSON
//         ...cabecera, // Combina con encabezados personalizados
//       },
//     };

//     // Si el método no es GET, incluye el cuerpo (para POST, PUT, DELETE, etc.)
//     if (cuerpo && metodo !== "GET") {
//       opciones.body = JSON.stringify(cuerpo);
//     }

//     const response = await fetch(`${BASE_URL}/${segmentoRuta}`, opciones);

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} ${response.statusText}`);
//     }

//     return await response.json(); // Devuelve la respuesta como JSON
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw error; // Propaga el error para manejarlo fuera de la función
//   }
// };

// export default fetchApiM1

const fetchApiM1 = async (segmentoRuta, metodo = "GET", cuerpo = null, cabecera = {}, queryParams = {}) => {
  try {
    // Construct query string if queryParams exist
    const queryString = Object.keys(queryParams)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
      .join("&");

    const url = queryString ? `${BASE_URL}/${segmentoRuta}?${queryString}` : `${BASE_URL}/${segmentoRuta}`;
    console.log(url);
    const opciones = {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
        ...cabecera,
      },
    };

    if (cuerpo && metodo !== "GET") {
      opciones.body = JSON.stringify(cuerpo);
    }

    const response = await fetch(url, opciones);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetchApiM1;
