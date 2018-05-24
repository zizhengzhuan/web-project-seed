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
      ...data,
    },
  });
}

export { get, post };
