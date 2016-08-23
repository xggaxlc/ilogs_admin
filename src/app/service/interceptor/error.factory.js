export function errorInterceptor($log, $rootScope, $q, $injector) {
  'ngInject';
  return {
    'response': function(response) {
      if (response.data.success === 0) {
        let Utils = $injector.get('Utils');
        Utils.toast('error', response.data.message);
        return $q.reject(angular.merge(response, { handled: true }));
      }
      return response || $q.when(response);
    },
    'responseError': function(rejection) {
      let Utils = $injector.get('Utils');
      switch (rejection.status) {
        case -1:
          Utils.toast('error', '网络不给力');
          break;
        case 401:
          //打开登陆弹窗
          return $injector.get('AuthService').requireLogin(rejection);
        case 403:
          Utils.toast('error', rejection.data.message || '你没有权限！');
          break;
        case 404:
          Utils.toast('error', '没有这条数据！');
          break;
        default:
          Utils.toast('error', `出错了! 错误代码：${rejection.status}`);
      }
      return $q.reject(rejection);
    },
    'requestError': function(rejection) {
      $injector.get('Utils').toast('error', '请检查网络！');
      return $q.reject(rejection);
    }
  }
}