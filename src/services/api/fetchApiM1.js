const BASE_URL = "https://tiusr39pl.cuc-carrera-ti.ac.cr/toi";
//const BASE_URL = "https://tiusr39pl.cuc-carrera-ti.ac.cr/apiTattoo";

const fetchApiM1 = async (segmentoRuta, cabecera) => {
  try {
    const response = await fetch(`${BASE_URL}/${segmentoRuta}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }  
};

export default fetchApiM1