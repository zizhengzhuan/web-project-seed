import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { accountLogin, accountLogout } from '../services/api';
import { setToken } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(accountLogin, payload);
      if (res) {
        const {
          data: { token },
        } = res;
        setToken(token);
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      } else {
        yield put({ type: 'changeLoginStatus', payload: { status: 'error', type: 'account' } });
      }
    },
    *logout(_, { call, put, select }) {
      const res = yield call(accountLogout);
      if (!res) {
        message.warning('登出失败');
      } else {
        try {
          // get location pathname
          const urlParams = new URL(window.location.href);
          const pathname = yield select(state => state.routing.location.pathname);
          // add the parameters in the url
          urlParams.searchParams.set('redirect', pathname);
          window.history.replaceState(null, 'login', urlParams.href);
        } finally {
          yield put({
            type: 'changeLoginStatus',
            payload: {
              status: false,
              currentAuthority: 'guest',
            },
          });
          reloadAuthorized();
          yield put(routerRedux.push('/user/login'));
        }
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setToken(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/login') {
          setToken();
        }
      });
    },
  },
};
