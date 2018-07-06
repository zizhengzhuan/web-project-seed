import { queryCurrent } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    menus: [],
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      if (res) {
        const { data } = res;
        const {
          user: { username: name },
          menu: menus,
        } = data;
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            notifyCount: 12,
            // 自用属性
            uid: data.user.usid || data.user.gid,
            ...data.user,
          },
        });
        yield put({
          type: 'saveMenus',
          payload: menus,
        });
      } else {
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name: '游客',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            notifyCount: 0,
          },
        });
        yield put({
          type: 'saveMenus',
          payload: [],
        });
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    saveMenus(state, { payload }) {
      return {
        ...state,
        menus: payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
