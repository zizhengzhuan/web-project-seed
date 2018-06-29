import { sysConfig } from 'yc';

console.log('a');
console.log('a');
console.log('a');
sysConfig.setRoot('/');

export function getMenu() {
  return getCfgByKey('menu');
}

export function getInit() {
  return getCfgByKey('init');
}

export function getCfgByKey(key) {
  return sysConfig.getCfgByKey(key, '/');
}
