import http from '../utils/request';

const { request } = http.base;

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
