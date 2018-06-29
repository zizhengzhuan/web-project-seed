import { sysConfig } from 'yc';
import { stringify } from 'qs';

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  } else if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    let isAdd = false;
    // 是否包含
    isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
      exact,
    };
  });
  return renderRoutes;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

export function getTitle() {
  const initCfg = sysConfig.getInit();
  if (initCfg) {
    return initCfg.title || '';
  }
  return '';
}

export function getLogo() {
  const initCfg = sysConfig.getInit();
  if (initCfg) {
    return initCfg.logo || '';
  }
  return '';
}

let taskCfg = null;

/**
 * 获取服务方法路径
 * @param {string} path rest 服务方法路径
 * @returns {string} url 服务方法地址
 * @ignore
 */
function getFuncPath(path = '', params) {
  if (path.length === 0) {
    throw new Error('path 参数不允许为空');
  }

  let nextPath = path.indexOf('/') === 0 ? path : `/${path}`;
  if (params) {
    if (nextPath.indexOf('?') === -1) {
      nextPath += '?';
    }
    // 参数序列化
    const nextPrams = {};
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === 'object') {
        nextPrams[key] = JSON.stringify(value);
      } else {
        nextPrams[key] = value;
      }
    }
    nextPath += stringify(nextPrams);
  }
  return nextPath;
}

export function getTaskServiceCfg(svn) {
  if (taskCfg === null) {
    taskCfg = new Map();
    const taskServices = sysConfig.getCfgByKey('servicecfg');

    const { proxy, service } = taskServices;
    if (!Array.isArray(proxy)) {
      throw new Error('参数 proxy 异常，只允许为数组');
    }
    if (!Array.isArray(service)) {
      throw new Error('参数 service 异常，只允许为数组');
    }
    service.forEach(src => {
      const nextSrc = { ...src };
      if (nextSrc.proxy) {
        for (let i = 0; i < proxy.length; i++) {
          const pry = proxy[i];
          if (pry.status !== '0' && pry.name === nextSrc.proxy) {
            const { url } = nextSrc;
            nextSrc.url = `${pry.url}?${url}`;
            nextSrc.originalUrl = url;
            break;
          }
        }
      }

      taskCfg.set(src.name, nextSrc);
    });
  }
  return taskCfg.get(svn);
}

export function getUrl({ svn, path, params = null, isProxy = true }) {
  const currentCfg = getTaskServiceCfg(svn);
  let url = isProxy ? currentCfg.url : currentCfg.originalUrl;
  url += getFuncPath(path, params);
  return url;
}
