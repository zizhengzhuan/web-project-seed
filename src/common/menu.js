import { getInit, getMenu } from '../utils/sysConfig';
import { getUserInfoSync, getUserInfoSyncV2, getOmsVersion } from '../services/api';

const init = getInit();

let menuData = null;

export const getMenuData = () => {
  if (Array.isArray(menuData) && menuData.length > 0) {
    return menuData;
  }
  // 默认获取本地配置
  menuData = getMenu();
  if (init.default && init.default.static) {
    return menuData;
  }
  // 如果不开启本地菜单配置，则获取用户服务的菜单信息，需要区分三种情况
  // oms 3.0
  // oms 2.0
  // oms 1.0 -- 暂不支持
  const omsVersion = getOmsVersion();
  if (omsVersion === 3) {
    const res = getUserInfoSync();
    if (res && res.data) {
      menuData = res.data.menu;
    } else {
      menuData = [];
    }
  } else if (omsVersion === 2) {
    if (!Array.isArray(menuData)) {
      throw new Error('在 oms 2.0 版本下，需要启动本地 menu.js 配置');
    }
    const res = getUserInfoSyncV2();
    if (res && res.isSuccess) {
      const { menus } = res;
      const tmpMenus = [];

      menus.forEach(menu => {
        for (let i = 0; i < menuData.length; i++) {
          const item = menuData[i];
          if (item.name === menu.nodeName) {
            const tmpMenu = {
              ...item,
              children: [],
            };
            if (Array.isArray(menu.children) && Array.isArray(item.children)) {
              menu.children.forEach(itemChild => {
                for (let j = 0; j < item.children.length; j++) {
                  const child = item.children[j];
                  if (itemChild.nodeName === child.name) {
                    tmpMenu.children.push({
                      ...child,
                    });
                    break;
                  }
                }
              });
            }
            tmpMenus.push(tmpMenu);
            break;
          }
        }
      });
      menuData = tmpMenus; // formatter(tmpMenus);
    } else {
      menuData = [];
    }
  }
  return menuData;
};

export const clearMenuData = () => {
  menuData = null;
};
