var mapcfg = {
  api: 'http://192.168.8.173:8085/ecity_js_api1.0',
  centerx: -1,
  centery: -1,
  initlevel: -1,
  extent: {
    xmin: 38898,
    xmax: 65822,
    ymin: 38375,
    ymax: 49364
  },
  isJwd: 0,
  overview: 0,
  scale: 0,
  position: 1,
  positionPrefix: {
    x: 'x',
    y: 'y'
  },
  map_base: [{
    group: 'm_1',
    visible: 1,
    maps: [{
      id: 'base_dxt',
      url: 'http://192.168.8.135:8087/ServiceEngine/rest/services/DZDT/MapServer',
      type: 'tiled',
      name: '电子地图',
      params: {
        limgurl: '/images/legend/layerBtn/dxt.png',
        legendurl: '/images/legend/layerBtn/dxt.png',
        maxscale: '',
        minscale: ''
      }
    }]
  }],
  map_net: [{
    group: 'n_1',
    visible: 1,
    maps: [{
      id: 'net_hpjs',
      url: 'http://192.168.8.135:8087/ServiceEngine/rest/services/DX_SL/MapServer',
      type: 'tiled',
      name: '苏州地形矢量',
      params: {
        maxscale: '5',
        minscale: '400',
        snapLayers: '',
        layersName: []
      }
    }]
  }],
  map_thematic: [{
    group: 't_1',
    visible: 1,
    maps: [{
      id: 'thematic_ds',
      url: 'http://192.168.8.173:6080/arcgis/rest/services/hpzh/hpdsdd/MapServer',
      type: 'tiled',
      name: '有线',
      params: {
        legendurl: '/module/layerShowManager/images/legend_wsgw.png'
      }
    }]
  }]
}
