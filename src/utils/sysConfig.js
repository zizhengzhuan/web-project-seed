import { sysConfig } from 'yc';

// sysConfig.setRoot('/');

export function getMenu() {
  return getCfgByKey('menu');
}

export function getInit() {
  return getCfgByKey('init');
}

export function getCfgByKey(key) {
  return sysConfig.getCfgByKey(key, '/');
}
