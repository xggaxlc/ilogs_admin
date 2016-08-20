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
      $rootScope.reqPending--;
      return $q.reject(rejection);
    }
  }

}