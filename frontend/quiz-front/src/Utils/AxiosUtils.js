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

export const postWord = async ({ data }) => {
  try {
    const resp = await axios.post(`http://localhost:8080/words`, { data });
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
