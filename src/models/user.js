import { queryCurrent } from '../services/user';

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
          user: { gid: userid, username: name },
        } = data;
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            userid,
            notifyCount: 12,
          },
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
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
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
