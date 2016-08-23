export function loadingInterceptor($q, $rootScope) {
  'ngInject';
  // 当前pending状态AJAX数目
  $rootScope.reqPending = 0;
  return {
    'request': function(config) {
      $rootScope.reqPending++;
      return config;
    },
    'response': function(response) {
      $rootScope.reqPending--;
      return response;
    },
    'responseError': function(rejection) {
      // cancel请求可能导致reqPending < 0
      if ($rootScope.reqPending > 0) {
        $rootScope.reqPending--;
      }
      return $q.reject(rejection);
    }
  }

}