import request from './request';
import { getUrl } from './utils';

function get({ svn = 'QUERY_SVR', path = '', data = {} }) {
  const url = getUrl({ svn, path, data });
  return request(url);
}

function post({ svn = 'QUERY_SVR', path = '', data = {} }) {
  const url = getUrl({ svn, path });
  return request(url, {
    method: 'POST',
    body: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...data,
    },
  });
}

export { get, post };
