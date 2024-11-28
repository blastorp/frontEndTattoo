const BASE_URL_2 = "http://localhost:5008/";

// fetchApiM2 Cristian
const fetchApiM2 = async (segmentoRuta, metodo = "GET", cuerpo = null, cabecera = {}) => {
  try {
    const opciones = {
      method: metodo, // GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", // Por defecto se usa JSON
        ...cabecera, // Combina con encabezados personalizados
      },
    };

    // Si el método no es GET, incluye el cuerpo (para POST, PUT, DELETE, etc.)
    if (cuerpo && metodo !== "GET") {
      opciones.body = JSON.stringify(cuerpo);
    }

    const response = await fetch(`${BASE_URL_2}${segmentoRuta}`, opciones);

    if (!response.ok) {
      const errorMessage = await response.text(); // Leer el cuerpo de la respuesta para errores
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return await response.json(); // Devuelve la respuesta como JSON
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw error; // Propaga el error para manejarlo fuera de la función
  }
};

export default fetchApiM2;
