export function authInterceptor($rootScope, $localStorage, $sessionStorage, BASEURL) {
  'ngInject';
  return {
    'request': function(config) {
      let url = config.url.toLowerCase();
      //判断是否自动补全请求URL和添加TOKEN
      let autoSetBaseUrl = !new RegExp('(.html|.js|.css|.json)$').test(url) && !new RegExp('^(http|https)').test(url);
      if(autoSetBaseUrl) {
        config.headers.token = $localStorage.token || $sessionStorage.token;
        config.url = BASEURL + config.url;
      }
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
