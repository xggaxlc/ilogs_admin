export function errorInterceptor($log, $rootScope, $q, $injector) {
  'ngInject';
  return {
    'response': function(response) {
      if (response.data.success === 0) {
        let Utils = $injector.get('Utils');
        Utils.toast('error', response.data.message);
        return $q.reject(response);
      }
      return response || $q.when(response);
    },
    'responseError': function(rejection) {
       let Utils = $injector.get('Utils');
      switch(rejection.status) {
        case -1:
          Utils.toast('error', '请求失败！可能AJAX请求被取消，也可能是网络原因！');
          break;
        case 401:
          $injector.get('AuthService').requireLogin();
          break;
        case 403:
          Utils.toast('error', '你没有权限！');
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
      $injector.get('Utils').toast('error', '请求失败！请检查网络！');
      return $q.reject(rejection);
    }
  }
}
