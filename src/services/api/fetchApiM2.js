const BASE_URL_2 = "http://localhost:5008/";

// fetchApiM2 Cristian
const fetchApiM2 = async (segmentoRuta, metodo = "GET", cuerpo = null, cabecera = {}, timeout = 5000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Verifica si el cuerpo es necesario dependiendo del método
    if ((metodo === "POST" || metodo === "PUT" || metodo === "DELETE") && !cuerpo) {
      throw new Error(`El cuerpo es necesario para los métodos ${metodo}`);
    }

    const opciones = {
      method: metodo, // GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json", 
        ...cabecera, 
      },
      signal: controller.signal,
    };

    // Si el método no es GET, incluye el cuerpo (para POST, PUT, DELETE, etc.)
    if (cuerpo && metodo !== "GET") {
      opciones.body = JSON.stringify(cuerpo);
    }

    const response = await fetch(`${BASE_URL_2}${segmentoRuta}`, opciones);

    clearTimeout(timeoutId); 

    if (!response.ok) {
      const errorMessage = await response.text(); 
      throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return await response.json(); 
  } catch (error) {
    clearTimeout(timeoutId); 
    if (error.name === 'AbortError') {
      console.error("Fetch aborted due to timeout.");
    } else {
      console.error("Fetch error:", error.message);
    }
    throw error; 
  }
};

export default fetchApiM2;
