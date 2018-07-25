import { getMenu } from '../utils/sysConfig';
import { getUserInfoSync } from '../services/api';
import { isUrl } from '../utils/utils';

let menuData = getMenu();
// 默认菜单配置来自 oms 服务
if (!menuData) {
  const res = getUserInfoSync();
  if (res) {
    menuData = res.data.menu;
  } else {
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
