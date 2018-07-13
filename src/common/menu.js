import { http } from 'yc';
import { getMenu, getSys } from '../utils/sysConfig';
import { isUrl } from '../utils/utils';
import { getToken } from '../utils/authority';

const {
  base: { get1 },
  getUrl,
} = http;

let menuData = getMenu();
// 默认菜单配置来自 oms 服务
if (!menuData) {
  const sys = getSys();
  const token = getToken();
  const url = getUrl({
    svn: 'OMS_SVR',
    path: 'user/getUserInfoByToken',
  });
  const resultStr = get1(url, {
    sys,
    token,
  });
  try {
    const res = JSON.parse(resultStr);
    menuData = res.data.menu;
  } catch (err) {
    menuData = [];
  }
}

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => menuData; // formatter(menuData);
