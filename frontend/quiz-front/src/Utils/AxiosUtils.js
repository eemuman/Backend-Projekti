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
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export const postNew = async (newName, WhatToPost) => {
  try {
    const resp = await axios.post(`http://localhost:8080/${WhatToPost}`, {
      name: newName,
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export const delByName = async (whereToDelete, whatToDelete) => {
  try {
    const resp = await axios.delete(`http://localhost:8080/${whereToDelete}`, {
      data: {
        name: whatToDelete,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};
