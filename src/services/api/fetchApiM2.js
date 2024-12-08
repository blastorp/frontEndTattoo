const BASE_URL_2 = "http://localhost:5008/";

// fetchApiM2 Cristian
const fetchApiM2 = async (segmentoRuta, metodo = "GET", cuerpo = null, cabecera = {}, timeout = 5000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const opciones = {
            method: metodo,
            headers: {
                "Content-Type": "application/json", 
                ...cabecera, 
            },
            signal: controller.signal,
        };

        if (cuerpo && (metodo !== "GET" && metodo !== "DELETE")) {
            opciones.body = JSON.stringify(cuerpo);
        }

        const response = await fetch(`${BASE_URL_2}${segmentoRuta}`, opciones);

        clearTimeout(timeoutId); 

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        try {
            return await response.json();
        } catch (error) {
            console.warn("No se pudo parsear la respuesta JSON. Devuelve un objeto vacío.");
            return {}; 
        }
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
