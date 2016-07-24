import * as Ctrl from './controllers/index';
export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/controllers/login/login.html',
      controller: Ctrl.LoginController,
      controllerAs: 'vm'
    })
    .state('logout', {
      url: '/logout'
    })
    .state('404', {
      url: '404',
      templateUrl: 'app/controllers/404/404.html'
    })
    .state('main', {
      abstract: true,
      url: '',
      templateUrl: 'app/controllers/layout/layout.html',
      controller: Ctrl.LayoutController,
      controllerAs: 'vm'
    })
    .state('main.home', {
      url: '/home',
      templateUrl: 'app/controllers/home/home.html'
    })

  $urlRouterProvider.when('', '/login');
  $urlRouterProvider.otherwise('/404');
}