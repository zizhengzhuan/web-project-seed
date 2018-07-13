import { sysConfig } from 'yc';
import { message } from 'antd';

export function getMenu() {
  return getCfgByKey('menu');
}

export function getInit() {
  return getCfgByKey('init');
}

export function getCfgByKey(key) {
  return sysConfig.getCfgByKey(key, '/');
}

export function getSys() {
  const iniConfig = getInit();
  if (!iniConfig) {
    message.warning('init.json 配置文件异常');
    return '';
  }
  const { sys } = iniConfig;
  if (!sys) {
    message.warning('sys 节点丢失');
    return '';
  }
  return sys;
}
