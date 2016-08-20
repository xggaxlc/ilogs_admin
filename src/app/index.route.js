import * as Ctrl from './controllers/index';
export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'app/controllers/sign/signin/signin.html',
      controller: Ctrl.SigninController,
      controllerAs: 'vm'
    })
    .state('signup', {
      url: '/signup?key',
      templateUrl: 'app/controllers/sign/signup/signup.html',
      controller: Ctrl.SignupController,
      controllerAs: 'vm'
    })
    .state('resetPass', {
      url: '/reset_pass?key',
      templateUrl: 'app/controllers/sign/reset_pass/reset_pass.html',
      controller: Ctrl.ResetPassController,
      controllerAs: 'vm'
    })
    .state('logout', {
      url: '/logout',
      controller: (AuthService) => {
        'ngInject';
        AuthService.logout();
      }
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
    // home
    .state('main.home', {
      url: '/home',
      templateUrl: 'app/controllers/home/home.html',
      controller: Ctrl.HomeController,
      controllerAs: 'vm'
    })
    // article
    .state('main.article', {
      url: '/article?title&page',
      params: {
        limit: 10
      },
      templateUrl: 'app/controllers/article/index/index.html',
      controller: Ctrl.ArticleIndexController,
      controllerAs: 'vm'
    })
    .state('main.addArticle', {
      url: '/article/add',
      templateUrl: 'app/controllers/article/add/add.html',
      controller: Ctrl.AddArticleController,
      controllerAs: 'vm'
    })
    .state('main.editArticle', {
      url: '/article/edit/:id',
      templateUrl: 'app/controllers/article/add/add.html',
      controller: Ctrl.EditArticleController,
      controllerAs: 'vm'
    })
    // user
    .state('main.user', {
      url: '/user?name&page',
      params: {
        limit: 10
      },
      templateUrl: 'app/controllers/user/index.html',
      controller: Ctrl.UserController,
      controllerAs: 'vm'
    })
    // role
    .state('main.role', {
      url: '/role?name&page',
      params: {
        limit: 10,
        sort: '_id'
      },
      templateUrl: 'app/controllers/role/index.html',
      controller: Ctrl.RoleController,
      controllerAs: 'vm'
    })
    // category
    .state('main.category', {
      url: '/category?page',
      params: {
        limit: 10,
        sort: '-_id'
      },
      controller: Ctrl.CategoryController,
      controllerAs: 'vm',
      templateUrl: 'app/controllers/category/category.html'
    })
    // stat
    .state('main.stat', {
      url: '/stat',
      controller: Ctrl.StatController,
      controllerAs: 'vm',
      templateUrl: 'app/controllers/stat/stat.html'
    })
    // log
    .state('main.log', {
      url: '/log?page',
      params: {
        limit: 20,
        sort: '-_id'
      },
      controller: Ctrl.LogController,
      controllerAs: 'vm',
      templateUrl: 'app/controllers/log/log.html'
    })
    // settings
    .state('main.settings', {
      url: '/settings',
      controller: Ctrl.SettingsController,
      controllerAs: 'vm',
      templateUrl: 'app/controllers/settings/settings.html'
    });

  $urlRouterProvider.when('', '/signin');
  $urlRouterProvider.otherwise('/404');
}