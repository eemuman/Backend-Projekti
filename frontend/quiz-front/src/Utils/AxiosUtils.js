const axios = require("axios").default;

/**
@FUNCTION
 * @module AxiosUtils
 */

export const getCurrentUserToken = () => {
  if (localStorage.getItem("user") !== null)
    return JSON.parse(localStorage.getItem("user")).accesToken;

  return -1;
};

/**
@FUNCTION
 *
 * Yksinkertainen funktio, jolla voi hakea kaikki halutut datat databasesta.
 * @param {*} dataToFetch Mitä halutaan hakea (sanat, teemat, kielet).
 * @returns Vastaus serveriltä
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
@FUNCTION
 *
 * Uuden sanan lisääminen databaseen. Data tulee objektina, josta otetaan erilleen avaimet ja arvot, tämän jälkeen avaimet yhdistetään pilkulla ja arvot laitetaan lainausmerkkeihin ennen yhdistämistä.
 * @param {*} data Uuden sanan kaikki tarvittava data. Minimissään suomenkielinen käännös sekä theme_id
 * @returns Vastaus serveriltä
 */
export const postWord = async (data) => {
  const token = getCurrentUserToken();

  try {
    const values = Object.values(data);
    const keys = Object.keys(data);
    const joinedKeys = keys.join(",");
    const joinedValues = values.map((val) => `"${val}"`).join(",");
    console.log(joinedValues);

    const resp = await axios.post(`/words`, {
      token: token,
      joinedValues,
      joinedKeys,
    });
    console.log(resp);
    return resp;
  } catch (err) {
    console.log(err);
  }
};

/**
@FUNCTION
 *
 * Tällä perusfunktiolla voidaan luoda uusi kieli tai teema.
 * @param {*} newName Uuden kielen/teeman nimi
 * @param {*} WhatToPost Kumpi tämä uusi on kieli vai teema.
 * @returns Vastaus serveriltä
 */
export const postNew = async (newName, WhatToPost) => {
  const token = getCurrentUserToken();

  try {
    const resp = await axios.post(`/${WhatToPost}`, {
      token: token,
      name: newName,
    });
    console.log(resp);

    return resp;
  } catch (err) {
    console.log(err);
  }
};

/**
@FUNCTION
 *
 * Tällä funktiolla voidaan poistaa dataa tietokannasta käyttäen nimeä.
 * @param {*} whereToDelete Mistä haluttu data poistaa. Kieli/Teema/Sana
 * @param {*} whatToDelete Millä nimellä haluttu data löytyy.
 * @returns Vastaus serveriltä
 */
export const delByName = async (whereToDelete, whatToDelete) => {
  const token = getCurrentUserToken();

  try {
    const resp = await axios.delete(`/${whereToDelete}`, {
      data: {
        token: token,
        name: whatToDelete,
      },
    });
    console.log(resp);

    return resp;
  } catch (err) {
    console.log(err);
  }
};
/**
@FUNCTION
 *
 * Tällä funktiolla voidaan poistaa Sana käyttäen ID:tä (!!TURVALLISEMPI TAPA POISTAA SANOJA!!)
 * @param {*} whatToDelete halutun sanan ID
 * @returns Vastaus serveriltä
 */
export const deleteWordById = async (whatToDelete) => {
  const token = getCurrentUserToken();
  try {
    const resp = await axios.delete(`/words`, {
      data: {
        token: token,
        id: whatToDelete,
      },
    });
    console.log(resp);

    return resp;
  } catch (err) {
    console.log(err);
  }
};

/**
@FUNCTION
 *
 * Sanan päivittämiseen käytettävä funktio, päivitettävä sana haetaan ID:llä tietokannasta.
 * Datan avainarvoparit mapataan Avain = "Arvo" tyyliin erilliseen constiin. Id mapataan ilman lainausmerkkejä, koska se ei ole VARCHAR.
 * @param {*} data Päivitetty data
 * @returns Vastaus serveriltä
 */
export const updateWordById = async (data) => {
  const token = getCurrentUserToken();
  const joinedUpdt = Object.entries(data)
    .map(([key, val]) => {
      if (key !== "id") return `${key} = "${val}"`;
      return `${key} = ${val}`;
    })
    .join(", ");
  const id = data.id;
  try {
    const resp = await axios.patch(`/words`, {
      data: joinedUpdt,
      id: id,
      token: token,
    });
    console.log(resp);

    return resp;
  } catch (err) {
    console.log(err);
  }
};
/**
@FUNCTION
 *
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
@FUNCTION
 *
 * Tällä haetaan käyttäjä localstoragesta, jos semmoinen löytyy, muuten palautetaan -1.
 * @returns user tai -1
 */

/**
@FUNCTION
 *
 * Jos localstoragesta löytyy accesTokeni, Se validoidaan secretKeytä vasten ja sen jälkeen palautetaan saatu status. Käytetään Admin sivulla aina ennen kuin fetchataan dataa.
 * @returns Saatu status
 */
export const checkLogin = async () => {
  const token = getCurrentUserToken();
  if (token !== -1) {
    try {
      const resp = await axios.get(`/login`, {
        params: { token },
      });
      return resp.status;
    } catch (err) {}
  }
};
