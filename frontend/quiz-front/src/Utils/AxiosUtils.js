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

export const postWord = async (data) => {
  try {
    const values = Object.values(data);
    const keys = Object.keys(data);
    const joinedKeys = keys.join(",");
    const joinedValues = values.map((val) => `"${val}"`).join(",");
    console.log(joinedValues);

    const resp = await axios.post(`http://localhost:8080/word`, {
      joinedValues,
      joinedKeys,
    });
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

export const deleteWordById = async (whatToDelete) => {
  try {
    const resp = await axios.delete(`http://localhost:8080/word`, {
      data: {
        id: whatToDelete,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};

export const updateWordById = async (data) => {
  const joinedUpdt = Object.entries(data)
    .map(([key, val]) => {
      if (key !== "id") return `${key} = "${val}"`;
      return `${key} = ${val}`;
    })
    .join(", ");
  const id = data.id;
  try {
    const resp = await axios.patch(`http://localhost:8080/word`, {
      data: joinedUpdt,
      id: id,
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};
