export function runBlock($rootScope, $state, Utils, AuthService) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', function(ev, toState) {
    let isLogged = Utils.isObjEmpty(AuthService.currentUser) ? false : true;
    if (toState.name === 'login' && isLogged) {
      ev.preventDefault();
      $state.go('main.home', {}, {
        location: 'replace'
      });
    }
  });

}