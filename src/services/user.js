import { http } from 'yc';
import { getSys } from '../utils/sysConfig';

const { get } = http;
const sys = getSys();

export async function queryCurrent() {
  return get({
    svn: 'OMS_SVR',
    path: 'user/getUserInfoByToken',
    data: { sys },
  });
}
