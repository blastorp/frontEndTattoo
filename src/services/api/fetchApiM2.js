const BASE_URL_2 = "http://localhost:5008/index.html";

//fetchApiM2 Cristian
const fetchApiM2 = async (segmentoRuta, cabecera) => {
    try {
      const response = await fetch(`${BASE_URL_2}/${segmentoRuta}`, {
        headers: cabecera,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return await response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

export default fetchApiM2