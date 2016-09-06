export function runBlock($rootScope, $state, Utils, AuthService, $mdDialog) {
  'ngInject';

  // 状态改变关掉全局loading
  $rootScope.$on('$stateChangeStart', () => {
    Utils.hideLoading();
    $mdDialog.cancel();
  });

  $rootScope.$on('$stateChangeStart', function(ev, toState) {
    let isLogged = Utils.isObjEmpty(AuthService.currentUser) ? false : true;
    if (toState.name === 'signin' && isLogged) {
      ev.preventDefault();
      $state.go('main.home', {}, {
        location: 'replace'
      });
    }
  });

  // 列表动画
  $rootScope.listAnimateClass = `fx-fade-down fx-dur-1000 fx-ease-cubic`;

}