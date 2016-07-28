export function config ($mdThemingProvider, $logProvider, $localStorageProvider, $sessionStorageProvider) {
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
}
