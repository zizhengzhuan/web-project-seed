import { sysConfig } from 'yc';

export const getCfgByKey = key => {
  return sysConfig.getCfgByKey(key, '/');
};
