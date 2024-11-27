const BASE_URL_1 = "https://tiusr39pl.cuc-carrera-ti.ac.cr/apiTattoo";
const BASE_URL_2 = "http://localhost:5008/";

// fetchApiM1 Jhon
const fetchApiM1 = async (segmentoRuta, cabecera) => {
  try {
    const response = await fetch(`${BASE_URL_1}/${segmentoRuta}`, {
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

export { fetchApiM1, fetchApiM2 };
