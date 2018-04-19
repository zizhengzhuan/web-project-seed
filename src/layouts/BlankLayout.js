import React from 'react';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Route, Redirect, Switch } from 'dva/router';
import { getRoutes, getTitle } from '../utils/utils';
import NotFound from '../routes/Exception/404';
import { getMenuData } from '../common/menu';
import Authorized from '../utils/Authorized';

const { Content } = Layout;
const { AuthorizedRoute } = Authorized;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

export default class BlankLayout extends React.PureComponent {
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      return '/home';
    }
    return redirect;
  };
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = getTitle();
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${getTitle()}`;
    }
    return title;
  }
  render() {
    const {
      routerData,
      match,
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout style={{ height: '100%' }}>
        <Content
          style={{
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Switch>
            {redirectData.map(item => (
              <Redirect key={item.from} exact from={item.from} to={item.to} />
            ))}
            {getRoutes(match.path, routerData).map(item => (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
                redirectPath="/exception/403"
              />
            ))}
            <Redirect exact from="/" to={bashRedirect} />
            <Route render={NotFound} />
          </Switch>
        </Content>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => (
            <div className={classNames(params)} style={{ height: '100%' }}>
              {layout}
            </div>
          )}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}
