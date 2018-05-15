import { http } from 'yc';
import { notification } from 'antd';
import { routerRedux } from 'dva/router';
import store from '../index';

const handleCatch = (err) => {
  const { status, url } = err.response;
  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: err.message,
    duration: 0,
  });
  const { dispatch } = store;
  if (status === 401) {
    dispatch({
      type: 'login/logout',
    });
  } else if (status === 403) {
    dispatch(routerRedux.push('/exception/403'));
  } else if (status <= 504 && status >= 500) {
    dispatch(routerRedux.push('/exception/500'));
  } else if (status >= 404 && status < 422 && status !== 408) {
    dispatch(routerRedux.push('/exception/404'));
  }
}

http.setConfig({
  timeout: 1,
  onCatch: handleCatch,
})

export default http;
