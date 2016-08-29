export function authInterceptor($rootScope, $localStorage, $sessionStorage, BASEURL) {
  'ngInject';
  return {
    'request': function(config) {
      config.headers.token = $localStorage.token || $sessionStorage.token;
      return config;
    },
    'response': function(response) {
      if(response && response.data && response.data.token) {
        if ($rootScope.autoLogin) {
          $localStorage.token = response.data.token;
        } else {
          $sessionStorage.token = response.data.token;
        }
			}
			return response;
    }
  }
}
