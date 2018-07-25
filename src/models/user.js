import { queryCurrent } from '../services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      if (res) {
        const { data } = res;
        const {
          user: { username: name },
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
      } else {
        // 获取用户信息失败，等价于登录异常
        yield put({
          type: 'login/logoutNoFetch',
        });
        // yield put({
        //   type: 'saveCurrentUser',
        //   payload: {
        //     name: '游客',
        //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        //     notifyCount: 0,
        //   },
        // });
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
