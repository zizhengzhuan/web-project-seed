import { getInit } from './sysConfig';

const iniConfig = getInit();
const { sys } = iniConfig;

const authorityNameSpace = `${sys}-authority`;
const tokenNameSpace = `${sys}-token`;
const storeNameSpace = `${sys}-store`;
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem(authorityNameSpace) || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem(authorityNameSpace, authority);
}

export function getToken() {
  return localStorage.getItem(tokenNameSpace) || '';
}

export function setToken(token = '') {
  return localStorage.setItem(tokenNameSpace, token);
}

export function setItem(key, value) {
  const str = localStorage.getItem(storeNameSpace) || '';
  let store = {};
  try {
    if (str.length > 0) {
      store = JSON.parse(str);
    }
  } catch (e) {
    console.error(e);
    clearItem();
  }
  store[key] = value;
  localStorage.setItem(storeNameSpace, JSON.stringify(store));
}

export function getItem(key) {
  const str = localStorage.getItem(storeNameSpace) || '';
  try {
    if (str.length > 0) {
      return JSON.parse(str)[key] || '';
    }
  } catch (e) {
    console.error(e);
  }
  return '';
}

export function clearItem() {
  localStorage.setItem(storeNameSpace, '');
}
