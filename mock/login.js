import { parse } from 'url';

const menu = [
  {
    path: '/workflow',
    image: null,
    gid: '4',
    children: [
      {
        path: '/workflow/mgmt',
        image: '',
        gid: '6',
        name: '流程设计',
        icon: '',
        pid: '4',
        vaild: '1',
        params: '{\n          "src":"http://192.168.8.183:8989/blank/workflow/mgmt"\n        }',
        idx: '2',
        sys: 'sys1',
      },
      {
        path: '/workflow/list',
        image: '',
        gid: '5',
        name: '流程管理',
        icon: '',
        pid: '4',
        vaild: '1',
        params: '{\n         "src":"http://192.168.8.183:8989/blank/workflow/list"\n        }',
        idx: '3',
        sys: 'sys1',
      },
    ],
    name: '工作流',
    icon: 'appstore-o',
    pid: null,
    vaild: '1',
    params: null,
    idx: '1',
    sys: 'sys1',
  },
  {
    path: '/maintain',
    image: '',
    gid: '9',
    children: [
      {
        path: '/maintain/enumType',
        image: null,
        gid: '10',
        name: '枚举值维护',
        icon: null,
        pid: '9',
        vaild: '1',
        params: null,
        idx: '4',
        sys: 'sys1',
      },
      {
        path: '/maintain/formType',
        image: null,
        gid: '11',
        name: '表单类型维护',
        icon: null,
        pid: '9',
        vaild: '1',
        params: null,
        idx: '4',
        sys: 'sys1',
      },
    ],
    name: '维护管理',
    icon: 'dashboard',
    pid: null,
    vaild: '1',
    params: '',
    idx: '2',
    sys: 'sys1',
  },
  {
    path: '/form/manager',
    image: '',
    gid: '8',
    name: '表单管理',
    icon: 'dashboard',
    pid: null,
    vaild: '1',
    params: '{\n      "src":"http://192.168.8.183:8889/blank/form/manager"\n    }',
    idx: '3',
    sys: 'sys1',
  },
  {
    path: '/oms',
    image: '',
    gid: '1',
    children: [
      {
        path: '/oms/manager',
        image: '',
        gid: '2',
        name: '组织机构',
        icon: '',
        pid: '1',
        vaild: '1',
        params: '',
        idx: '11',
        sys: 'sys1',
      },
      {
        path: '/oms/menuManager',
        image: '',
        gid: '3',
        name: '菜单管理',
        icon: '',
        pid: '1',
        vaild: '1',
        params: '',
        idx: '12',
        sys: 'sys1',
      },
    ],
    name: 'OMS系统',
    icon: 'user',
    pid: null,
    vaild: '1',
    params: '',
    idx: '4',
    sys: 'sys1',
  },
];

export const login = {
  data: {
    role: [],
    org: {},
    menu,
    user: {
      gid: '1',
      isadmin: '1',
      loginname: 'admin',
      phone: null,
      oid: '-1',
      email: null,
      username: '系统管理员',
    },
    group: [],
    token:
      'Oati/BhtVTG+v8spYSYf1SVWVCjHglcLJRUaryEBjFSJjzt77M36UlEx7nOMJGyeQWOusPuGew6LvFbCDVuHzQ==',
  },
  msg: '登录成功',
  msgCode: 0,
  success: true,
};

export const logout = {
  data: null,
  msg: '成功',
  msgCode: 0,
};

const userInfo = {
  data: {
    role: [],
    org: {},
    menu,
    user: {
      gid: '1',
      isadmin: '1',
      loginname: 'admin',
      phone: null,
      oid: '-1',
      email: null,
      username: '系统管理员',
    },
    group: [],
  },
  msg: '成功',
  msgCode: 0,
  success: true,
};

export const getUserInfoByToken = (req, res, u) => {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const { token } = params;
  if (token && token.length > 0) {
    res.status(200).send(userInfo);
  } else {
    res.status(401).send({
      data: null,
      msg: null,
      msgCode: -1,
      success: false,
    });
  }
};
