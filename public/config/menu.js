var menu = [
  {
    name: '异常',
    path: 'exception',
    icon: 'form',
    image: './images/menus/设备管理.png',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      }
    ],
  }, {
    name: 'DMA分区展示',
    path: 'dma',
    icon: '',
    image: './images/menus/DMA管理.png',
    children: [],
  }, {
    name: '管网资产',
    path: 'assetSupWater',
    icon: '',
    image: './images/menus/设备管理.png',
    children: [],
  }, {
    name: '维修管理',
    path: 'maintenance',
    icon: '',
    image: './images/menus/设备管理.png',
    children: [],
    params: {
       src: 'http://192.168.8.229:7686/jswaiqin/loginsJK.html?toolid=HOMEPAGE'
      }
  },{
    name: '生产调度',
    path: 'product-dispatch',
    icon: '',
    image: './images/menus/设备管理.png',
    children: [],
  },{
    name: '营销系统',
    path: 'market-system',
    icon: '',
    image: './images/menus/设备管理.png',
    children: [],
  },
];
