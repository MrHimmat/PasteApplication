// AUTH ENDPOINTS

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
  SIGNUP_API: BASE_URL + "/signup",
  LOGIN_API: BASE_URL + "/login",

  CREATE_PASTE_API: BASE_URL + "/createPaste",
  UPDATE_PASTE_API: BASE_URL + "/updatePaste",
  REMOVE_PASTE_API: BASE_URL + "/removePaste",
  GETALL_PASTE_API: BASE_URL + "/getAllPastes",
};
