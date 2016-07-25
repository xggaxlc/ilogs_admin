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
    .state('main.article', {
      abstract: true,
      url: '/article',
      template: '<div ui-view style="height:100%;"></div>'
    })
    .state('main.article.index', {
      url: '',
      templateUrl: 'app/controllers/article/index/index.html',
      controller: Ctrl.ArticleIndexController,
      controllerAs: 'vm'
    })
    .state('main.article.add', {
      url: '/add',
      templateUrl: 'app/controllers/article/add/add.html',
      controller: Ctrl.AddArticleController,
      controllerAs: 'vm'
    })
    .state('main.article.edit', {
      url: '/edit',
      templateUrl: 'app/controllers/article/edit/edit.html',
      controller: Ctrl.EditArticleController,
      controllerAs: 'vm'
    })

  $urlRouterProvider.when('', '/login');
  $urlRouterProvider.otherwise('/404');
}