export function config($mdThemingProvider, $logProvider, $localStorageProvider, $sessionStorageProvider, ChartJsProvider) {
  'ngInject';

  // Enable log
  $logProvider.debugEnabled(true);

  //theme
  $mdThemingProvider.theme('ilogsTheme')
    .primaryPalette('purple')
    .accentPalette('red')
    .warnPalette('yellow')

  $mdThemingProvider.setDefaultTheme('ilogsTheme');

  $localStorageProvider.setKeyPrefix('ilogs_admin_');
  $sessionStorageProvider.setKeyPrefix('ilogs_admin_');

  ChartJsProvider.setOptions({
    chartColors: ['#FF5252', '#FF8A80'],
    responsive: true
  });

}