'use strict';
/**
 * 扫描机
 */
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const glob = require('glob');
const prettier = require('prettier');

const cwd = process.cwd();
const configPath = path.join(cwd, 'src', 'common', 'router.js');
const target = path.join(cwd, 'src', 'pages');

let routerFiles = [];

glob(`${target}/**/router.json`, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  routerFiles = files;
});

const watcher = chokidar
  .watch(path.join('**', 'router.json'), {
    cwd: target,
  })
  .on('all', function() {
    updateRouterConfig();
  });

process.on('SIGINT', function() {
  watcher.close();
  console.error('SCAN IS CLOSED');
});

function updateRouterConfig() {
  const content = fs.readFileSync(configPath, 'utf-8');
  if (!content) {
    console.error(`${configPath}读取异常`);
    return;
  }
  const str = content.toString();
  // 清空 start 与 end 中间的内容
  const startIndex = str.indexOf('// {{start}}');
  const endIndex = str.indexOf('// {{end}}');
  const firstPart = str.substring(0, startIndex + 12);
  const secondPart = getProdcutionRouter();
  const thirdPart = str.substring(endIndex);

  const writeContent = `${firstPart}\n${secondPart}\n${thirdPart}`;
  const formatContent = prettier.format(writeContent, {
    singleQuote: true,
    trailingComma: 'es5',
    printWidth: 100,
    parser: 'babylon',
  });
  fs.writeFileSync(configPath, formatContent, 'utf-8');
}

function getProdcutionRouter() {
  const prodcutionRouterContents = [];
  routerFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    if (!content) {
      console.error(`${configPath}读取异常`);
      return;
    }
    const stream = content.toString();
    try {
      const jsonObj = JSON.parse(stream.toString());
      // 转换变标准字符串
      const routerContents = jsonObj.map(item => {
        const { key, models = [], component } = item;
        const importModal = models.map(model => {
          return `{func: () => import('${model}'), path: '${model}'}`;
        });
        return `'${key}': {component: dynamicWrapper(app, [${importModal.join(
          ','
        )}], () => import('${component}'))}`;
      });
      const $path = getPath(file, 'pages', 'common');
      let prodcutionRouterContent = routerContents
        .join(',')
        .replace(/\$path/g, `../${$path}`)
        .replace(/\/\//g, `/`);
      prodcutionRouterContents.push(prodcutionRouterContent);
    } catch (err) {
      console.error(err);
    }
  });
  return prodcutionRouterContents.join(',');
}

function getPath(path, startTag, endTag) {
  const startIndex = path.indexOf(startTag);
  const endIndex = path.indexOf(endTag);
  return path.substring(startIndex, endIndex);
}
