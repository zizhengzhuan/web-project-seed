var taskServices = {
  'proxy': [
    {
      'url': './proxy.jsp',
      'desc': '默认代理,没有名称',
      'name': 'a',
      'status': '0'
    }
  ],
  'service': [
    {
      'name': 'QUERY_SVR',
      'description': '管网查询',
      'url': 'proxy7080/ServiceEngine/rest/services/NetServer/jsgs',
      'type': 'net',
      'for': '',
      'proxy': 'a'
    },
    {
      'name': 'USER_SVR',
      'description': '用户服务',
      'url': 'proxy7080/ServiceEngine/rest/us',
      'type': '',
      'for': '',
      'proxy': 'a'
    }
  ]
};
