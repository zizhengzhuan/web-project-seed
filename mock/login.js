import { parse } from 'url';

const menu = [
  {
    path: '/workflow',
    image: '/images/menus/工程一张图.png',
    gid: '4',
    name: '工作流',
    icon: 'appstore-o',
    pid: null,
    vaild: '1',
    params: null,
    idx: '1',
    sys: 'sys1',
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
  },
  {
    path: '/maintain',
    image: '/images/menus/立户建档.png',
    gid: '9',
    children: [
      {
        path: '/maintain/enumType',
        image: '/images/secondMenus/大户用水.png',
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

/**
 * oms 2.0 版本返回的数据
 */
export const loginV2 = {
  user: {
    username: 'admin',
    gid: 2,
    id: 2,
    groupId: '2',
    groupCode: '1-1',
    groupLev: '0',
    groupName: '吉首城市供水总公司',
    phone: '',
    trueName: '系统管理员',
    email: '',
    ecode: '',
    company: '',
    role: '平台管理员,定漏员',
    roleCode: 'manager,定漏员',
  },
  isSuccess: true,
  msg: '',
  time: '2018-07-26 09:26:14',
  menus: [],
  servicecfg: [],
  mapcfg: {},
};

export const getUserInfo = {
  user: {
    username: 'sxw',
    gid: 514,
    id: 514,
    groupId: '118',
    groupCode: '1-1-3',
    groupLev: '0',
    groupName: '生产调度科',
    phone: '18974357000',
    trueName: '孙学维',
    email: '',
    ecode: '',
    company: '',
    role: '运维中心,水务云-调度科',
    roleCode: '运维中心,水务云-调度科',
  },
  isSuccess: true,
  msg: '',
  time: '2018-07-25 18:52:25',
  menus: [
    {
      bottom: 0,
      configUrl: '',
      id: 526,
      imgUrl: '',
      left: 0,
      nodeID: 526,
      nodeName: '生产管理',
      orderID: 0,
      pageUrl: '',
      parentID: -1,
      right: 0,
      top: 0,
      children: [
        {
          bottom: 0,
          configUrl: '',
          id: 527,
          imgUrl: '',
          left: 0,
          nodeID: 527,
          nodeName: '生产管理-管理舱',
          orderID: 0,
          pageUrl: '',
          parentID: 526,
          right: 0,
          top: 0,
        },
        {
          bottom: 0,
          configUrl: '',
          id: 528,
          imgUrl: '',
          left: 0,
          nodeID: 528,
          nodeName: '生产管理-生产舱',
          orderID: 0,
          pageUrl: '',
          parentID: 526,
          right: 0,
          top: 0,
        },
      ],
    },
    {
      bottom: 0,
      configUrl: '',
      id: 529,
      imgUrl: '',
      left: 0,
      nodeID: 529,
      nodeName: '营业管理',
      orderID: 0,
      pageUrl: '',
      parentID: -1,
      right: 0,
      top: 0,
      children: [
        {
          bottom: 0,
          configUrl: '',
          id: 530,
          imgUrl: '',
          left: 0,
          nodeID: 530,
          nodeName: '营业管理-管理舱',
          orderID: 0,
          pageUrl: '',
          parentID: 529,
          right: 0,
          top: 0,
        },
        {
          bottom: 0,
          configUrl: '',
          id: 531,
          imgUrl: '',
          left: 0,
          nodeID: 531,
          nodeName: '营业管理-生产舱',
          orderID: 0,
          pageUrl: '',
          parentID: 529,
          right: 0,
          top: 0,
        },
      ],
    },
  ],
  servicecfg: [],
  mapcfg: {},
};

export const getUserSites = {
  data: [
    {
      id: '1',
      site_name: '中心',
    },
    {
      id: '2',
      site_name: '外海',
    },
    {
      id: '3',
      site_name: '杜阮',
    },
    {
      id: '4',
      site_name: '市区河南',
    },
    {
      id: '5',
      site_name: '滨江',
    },
    {
      id: '6',
      site_name: '润原',
    },
  ],
  msg: '成功',
  msgCode: 0,
  success: true,
};

export const updatePassword = {
  msg: '成功',
  msgCode: 0,
  success: true,
};
