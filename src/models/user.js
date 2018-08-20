import { message } from 'antd';
import { queryCurrent, getUserSites, updatePassword } from '../services/api';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    sites: [],
    isShowPassModal: false,
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const res = yield call(queryCurrent);
      if (res) {
        const { data } = res;
        const {
          user: { username: name },
        } = data;
        const uid = data.user.usid || data.user.gid;
        const sites = yield call(getUserSites, { lx: 'station', id: uid });
        yield put({
          type: 'saveCurrentUser',
          payload: {
            name,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
            notifyCount: 12,
            // 自用属性
            uid,
            org: data.org,
            role: data.role,
            ...data.user,
          },
        });
        yield put({
          type: 'saveSites',
          payload: {
            sites,
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
    *updatePassword({ payload }, { call, put }) {
      const success = yield call(updatePassword, payload);
      if (success) {
        yield put({
          type: 'login/logoutNoFetch',
        });
      } else {
        message.warning('修改密码失败');
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
    saveSites(state, { payload }) {
      return {
        ...state,
        sites: payload.sites,
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
    showPassModal(state, { payload }){
      return {
        ...state,
        isShowPassModal: payload.isShowPassModal,
      };
    },
  },
};
