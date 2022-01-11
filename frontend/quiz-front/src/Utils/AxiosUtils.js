const axios = require("axios").default;

/**
 * Yksinkertainen funktio, jolla voi hakea kaikki halutut datat databasesta.
 * @param {*} dataToFetch Mitä halutaan hakea (sanat, teemat, kielet).
 * @returns
 */
export const fetchData = async (dataToFetch) => {
  try {
    const data = await axios.get(`/${dataToFetch}`);
    if (data.data != null) {
      return data.data;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Uuden sanan lisääminen databaseen. Data tulee objektina, josta otetaan erilleen avaimet ja arvot, tämän jälkeen avaimet yhdistetään pilkulla ja arvot laitetaan lainausmerkkeihin ennen yhdistämistä.
 * @param {*} data Uuden sanan kaikki tarvittava data. Minimissään suomenkielinen käännös sekä theme_id
 * @returns
 */
export const postWord = async (data) => {
  try {
    const values = Object.values(data);
    const keys = Object.keys(data);
    const joinedKeys = keys.join(",");
    const joinedValues = values.map((val) => `"${val}"`).join(",");
    console.log(joinedValues);

    const resp = await axios.post(`/word`, {
      joinedValues,
      joinedKeys,
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Tällä perusfunktiolla voidaan luoda uusi kieli tai teema.
 * @param {*} newName Uuden kielen/teeman nimi
 * @param {*} WhatToPost Kumpi tämä uusi on kieli vai teema.
 * @returns
 */
export const postNew = async (newName, WhatToPost) => {
  try {
    const resp = await axios.post(`/${WhatToPost}`, {
      name: newName,
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Tällä funktiolla voidaan poistaa dataa tietokannasta käyttäen nimeä.
 * @param {*} whereToDelete Mistä haluttu data poistaa. Kieli/Teema/Sana
 * @param {*} whatToDelete Millä nimellä haluttu data löytyy.
 * @returns
 */
export const delByName = async (whereToDelete, whatToDelete) => {
  try {
    const resp = await axios.delete(`/${whereToDelete}`, {
      data: {
        name: whatToDelete,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};
/**
 * Tällä funktiolla voidaan poistaa Sana käyttäen ID:tä (!!TURVALLISEMPI TAPA POISTAA SANOJA!!)
 * @param {*} whatToDelete halutun sanan ID
 * @returns
 */
export const deleteWordById = async (whatToDelete) => {
  try {
    const resp = await axios.delete(`/word`, {
      data: {
        id: whatToDelete,
      },
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Sanan päivittämiseen käytettävä funktio, päivitettävä sana haetaan ID:llä tietokannasta.
 * Datan avainarvoparit mapataan Avain = "Arvo" tyyliin erilliseen constiin. Id mapataan ilman lainausmerkkejä, koska se ei ole VARCHAR.
 * @param {*} data Päivitetty data
 * @returns
 */
export const updateWordById = async (data) => {
  const joinedUpdt = Object.entries(data)
    .map(([key, val]) => {
      if (key !== "id") return `${key} = "${val}"`;
      return `${key} = ${val}`;
    })
    .join(", ");
  const id = data.id;
  try {
    const resp = await axios.patch(`/word`, {
      data: joinedUpdt,
      id: id,
    });
    return resp;
  } catch (err) {
    console.log(err);
  }
};
/**
 * Autentisoidaan annetut käyttäjänimi sekä salasana tätä funktiota käyttäen.
 * Jos autentisointi feilaa, ts. ei saada accesstokenia, mitään ei tapahdu.
 * Jos saadaan accestokeni, asetetaan se localStorageen userin alle.
 * Kyseessä on siis JWT tokeni.
 * @param {*} username annettu käyttäjänimi
 * @param {*} password annettu salasana
 */
export const logUserIn = async (username, password) => {
  try {
    const resp = await axios.post(`/login`, {
      username: username,
      password: password,
    });
    if (resp.data.accesToken) {
      localStorage.setItem("user", JSON.stringify(resp.data));
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * Tällä haetaan käyttäjä localstoragesta, jos semmoinen löytyy, muuten palautetaan -1.
 * @returns user tai -1
 */
export const getCurrentUser = () => {
  if (localStorage.getItem("user") !== null)
    return JSON.parse(localStorage.getItem("user"));

  return -1;
};

/**
 * Jos localstoragesta löytyy accesTokeni, Se validoidaan secretKeytä vasten ja sen jälkeen palautetaan saatu status. Käytetään Admin sivulla aina ennen kuin fetchataan dataa.
 * @returns Saatu status
 */
export const checkLogin = async () => {
  const curUser = getCurrentUser().accesToken;
  if (curUser !== undefined) {
    try {
      const resp = await axios.get(`/login`, {
        params: { curUser },
      });
      return resp.status;
    } catch (err) {}
  }
};
