import http from '../utils/request';

const { request } = http.base;

export async function query404() {
  return request('/api/404');
}

export async function query401() {
  return request('/api/401');
}

export async function query403() {
  return request('/api/403');
}

export async function query500() {
  return request('/api/500');
}
