import fetch from 'dva/fetch';
import { notification, message } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';

const msdCodeMessage = {
  '-1': '',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
};
const defaultErrorText = '错误提示信息为空';

const requestError = {
  validate: res => {
    if (typeof res.msgCode === 'number') {
      if (res.msgCode === 401) {
        const { dispatch } = store;
        dispatch({
          type: 'login/logoutNoFetch',
        });
        return;
      }
      return res.msgCode !== 0;
    } else if (res === '' || res === null || res === undefined || res.error) {
      return true;
    }
    return false;
  },
  show: res => {
    let errortext = '';
    if (res.msgCode) {
      errortext = msdCodeMessage[`${res.msgCode}`] || res.msg || defaultErrorText;
    } else if (typeof res !== 'string') {
      errortext = defaultErrorText;
    }

    notification.error({
      message: `服务请求错误`,
      description: errortext,
    });
  },
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url - 请求抵制
 * @param  {object} [options] - 请求参数
 * @param  {string} [options.credentials = 'include'] - 表示 cookie 既可以同域发送，也可以跨域发送
 * @param  {boolean} [options.validate = true] - 表示进行针对 msgCode 的错误验证
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
    validate: true,
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    const { body } = newOptions;
    if (!(body instanceof FormData)) {
      if (newOptions.contentType === 'www') {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
          ...newOptions.headers,
        };
        let queryParams = '';
        if (Object.prototype.toString.call(body) === '[object Object]') {
          queryParams = Object.keys(body)
            .map(key => {
              let val = body[key];
              if (val instanceof Object) {
                val = JSON.stringify(val);
              }
              return `${key}=${val}`;
            })
            .join('&');
        }
        newOptions.body = queryParams;
      } else {
        newOptions.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          ...newOptions.headers,
        };
        newOptions.body = JSON.stringify(newOptions.body);
      }
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; charset=utf-8',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      /**
       * https://davidwalsh.name/fetch
       *
       * clone() - Creates a clone of a Response object.
       * error() - Returns a new Response object associated with a network error.
       * redirect() - Creates a new response with a different URL.
       * arrayBuffer() - Returns a promise that resolves with an ArrayBuffer.
       * blob() - Returns a promise that resolves with a Blob.
       * formData() - Returns a promise that resolves with a FormData object.
       * json() - Returns a promise that resolves with a JSON object.
       * text() - Returns a promise that resolves with a USVString (text).
       */
      if (newOptions.blob) {
        return response.blob();
      }
      return response.json();
    })
    .then(res => {
      if (newOptions.validate && requestError.validate(res)) {
        requestError.show(res);
        return null;
      }
      return res;
    })
    .catch(e => {
      const { dispatch } = store;
      const status = e.name;
      if (status === 401) {
        dispatch({
          type: 'login/logoutNoFetch',
        });
        return;
      }
      if (status === 403) {
        dispatch(routerRedux.push('/exception/403'));
        return;
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'));
        return;
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'));
      }
    });
}

export default request;
