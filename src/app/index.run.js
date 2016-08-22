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

  // 页内动画
  $rootScope.animateDur = 1000;
  $rootScope.animateClass = `fx-fade-up fx-dur-${$rootScope.animateDur} fx-ease-cubic`;

  // view动画
  $rootScope.viewAnimateDur = 900;
  
  // 动画延迟, 等待view动画结束再开始加载数据 相同路由状态没有动画没有延迟
  $rootScope.$on('$stateChangeStart', (ev, toState) => {
    if (!$state.current.name || toState.name === $state.current.name) {
      delete $rootScope.viewAnimateClass;
      $rootScope.viewAnimateDelay = 0;
    } else {
      $rootScope.viewAnimateDelay = $rootScope.viewAnimateDur + 100;
      $rootScope.viewAnimateClass = `fx-fade-down fx-dur-${$rootScope.viewAnimateDur} fx-ease-cubic`;
    }
  });

}