export function config($httpProvider, $mdThemingProvider, $logProvider, $localStorageProvider, $sessionStorageProvider, ChartJsProvider) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  //theme
  $mdThemingProvider.theme('ilogsTheme')
    .primaryPalette('purple')
    .accentPalette('red')
    .warnPalette('orange')

  $mdThemingProvider.setDefaultTheme('ilogsTheme');

  $localStorageProvider.setKeyPrefix('ilogs_admin_');
  $sessionStorageProvider.setKeyPrefix('ilogs_admin_');

  ChartJsProvider.setOptions({
    chartColors: ['#FF5252', '#FF8A80'],
    responsive: true
  });

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

  $httpProvider.interceptors.push('authInterceptor');
  $httpProvider.interceptors.push('errorInterceptor');
  $httpProvider.interceptors.push('loadingInterceptor');


}