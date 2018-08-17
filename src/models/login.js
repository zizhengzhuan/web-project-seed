import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { accountLogin, accountLogout } from '../services/api';
import { clearMenuData } from '../common/menu';
import { setToken, clear } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(accountLogin, payload);
      if (res && res.data && res.data.token && res.data.token.length > 0) {
        const {
          data: { token },
        } = res;
        setToken(token);
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      } else {
        setToken();
        yield put({ type: 'changeLoginStatus', payload: { status: 'error', type: 'account' } });
      }
    },
    *logout(_, { call, put }) {
      const res = yield call(accountLogout);
      if (!res) {
        message.warning('登出失败');
      } else {
        yield put({
          type: 'logoutNoFetch',
        });
      }
    },
    *logoutNoFetch(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        setToken();
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
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
          clear();
          clearMenuData();
        }
      });
    },
  },
};
