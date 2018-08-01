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
      //////////////////////////对应 oms 3.0 相关配置//////////////////////////
      url: '/api/CityServer/rest/omsService',
      // url: '/proxyOms/CityServer/rest/omsService',
      ///////////////////////////////////////////////////////////////////////
      //////////////////////////对应 oms 2.0 相关配置//////////////////////////
      // url: '/api/ServiceEngine/rest/userService',
      // url: '/proxyOms/ServiceEngine/rest/userService',
      ///////////////////////////////////////////////////////////////////////
      type: '',
      for: '',
      proxy: 'a'
    }
  ]
};
