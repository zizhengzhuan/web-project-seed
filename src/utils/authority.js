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

/**
 * 设置 localStorage 中所存储键值对
 * @param {string} key 键值对中的键
 * @param {string} value 键值对中的值
 * @returns void
 */
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

/**
 * 获取 localStorage 中所存储键值对中的值
 * @param {string} key 键值对中的键
 * @returns {string|object|array}
 */
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

/**
 * 清除 localStorage 中所存储键值对
 */
export function clearItem() {
  localStorage.setItem(storeNameSpace, '');
}

/**
 * 清除所有
 */
export function clear() {
  clearItem();
  setToken();
}
