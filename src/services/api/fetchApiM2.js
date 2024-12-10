const BASE_URL_2 = "http://localhost:5008/";
//const BASE_URL_2 = "https://tiusr39pl.cuc-carrera-ti.ac.cr/BETOIC";


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
            let errorMessage;
            try {
                errorMessage = await response.json(); // intenta obtener el mensaje de error como JSON
            } catch (jsonError) {
                errorMessage = await response.text(); // fallback si no se puede parsear a JSON
            }
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
            console.error("Fetch abortado debido a tiempo de espera.");
        } else {
            console.error("Error en fetchApiM2:", error.message);
        }
        throw error; 
    }
};

export default fetchApiM2;
