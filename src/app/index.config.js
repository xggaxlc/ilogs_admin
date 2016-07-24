export function config ($mdThemingProvider, $logProvider, $localStorageProvider, $sessionStorageProvider, toastrConfig) {
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


  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
