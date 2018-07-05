var taskServices = {
  proxy: [
    {
      url: './proxy.jsp',
      desc: '默认代理,没有名称',
      name: 'a',
      status: '0'
    }
  ],
  service: [
    {
      name: 'QUERY_SVR',
      description: '管网查询',
      url: '/api/CityServer/rest/services/NetServer/tgzf',
      type: 'net',
      for: '',
      proxy: 'a'
    },
    {
      name: 'OMS_SVR',
      description: '运维服务',
      url: '/api/CityServer/rest/omsService',
      type: 'net',
      for: '',
      proxy: 'a'
    }
  ]
};
