import { getInit } from './sysConfig';

const iniConfig = getInit();
const { sys } = iniConfig;

const authorityNameSpace = `${sys}-authority`;
const tokenNameSpace = `${sys}-token`;
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

export function setToken(token) {
  return localStorage.setItem(tokenNameSpace, token);
}
