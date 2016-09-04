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
      abstract: true,
      url: '/article',
      template: '<div ui-view></div>'
    })
    .state('main.article.index', {
      url: '?category&title&page',
      params: {
        limit: 15
      },
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
      url: '/edit/:id',
      templateUrl: 'app/controllers/article/add/add.html',
      controller: Ctrl.EditArticleController,
      controllerAs: 'vm',
      resolve: Ctrl.EditArticleController.resolve
    })
    // profile
    .state('main.profile', {
      url: '/profile',
      templateUrl:'app/controllers/profile/profile.html',
      controller: Ctrl.ProfileController,
      controllerAs: 'vm'
    })
    // user
    .state('main.user', {
      abstract: true,
      url: '/user',
      template: '<div ui-view></div>'
    })
    .state('main.user.index', {
      url: '?role&active&name&page',
      params: {
        limit: 10
      },
      templateUrl: 'app/controllers/user/index/index.html',
      controller: Ctrl.UserIndexController,
      controllerAs: 'vm'
    })
    .state('main.user.add', {
      url: '/add',
      templateUrl: 'app/controllers/user/add/add.html',
      controller: Ctrl.UserAddController,
      controllerAs: 'vm'
    })
    .state('main.user.edit', {
      url: '/edit/:id',
      templateUrl: 'app/controllers/user/add/add.html',
      controller: Ctrl.UserEditController,
      controllerAs: 'vm',
      resolve: Ctrl.UserEditController.resolve
    })
    // role
    .state('main.role', {
      url: '/role?active&name&page',
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
    // log
    .state('main.log', {
      url: '/log?content&page',
      params: {
        limit: 10,
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