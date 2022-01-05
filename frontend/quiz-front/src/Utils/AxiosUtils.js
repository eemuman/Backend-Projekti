const axios = require("axios").default;

export const fetchData = async (dataToFetch) => {
  try {
    const data = await axios.get(`http://localhost:8080/${dataToFetch}`);
    if (data.data != null) {
      return data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};
