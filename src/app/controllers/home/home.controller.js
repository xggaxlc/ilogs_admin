export class HomeController {
  constructor($timeout, $scope, $rootScope, ApiService) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.ApiService = ApiService;

    this.$rootScope.pageTitle = '首页';
    this.labels = ["January", "February", "March", "April", "May", "June", "July"];
    this.series = ['Series A', 'Series B'];
    this.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    this.categoryChartData = [300, 500, 100, 40, 120];

    this.categoryChartLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];

    this.getCount();

  }

  getCount() {
    this.CountLoading = {
      allArticle: true,
      publishedArticle: true,
      allUser: true,
      allCategory: true
    }

    this.Count = {
      allArticle: 0,
      publishedArticle: 0,
      allUser: 0,
      allCategory: 0
    }

    this.$timeout(() => {
      this.getAllArticleCount();
      this.getPublishedArticleCount();
      this.getAllUserCount();
      this.getAllCategoryCount();
    }, this.$rootScope.viewAnimateDelay);

  }

  getAllArticleCount() {
    this.ApiService.get('post', {
        limit: 1
      })
      .then(res => {
        this.Count.allArticle = res.count;
      })
      .finally(() => {
        this.CountLoading.allArticle = false;
      });
  }

  getPublishedArticleCount() {
    this.ApiService.get('post', {
        limit: 1,
        published: true
      })
      .then(res => {
        this.Count.publishedArticle = res.count;
      })
      .finally(() => {
        this.CountLoading.publishedArticle = false;
      });
  }

  getAllUserCount() {
    this.ApiService.get('user', {
        limit: 1
      })
      .then(res => {
        this.Count.allUser = res.count;
      })
      .finally(() => {
        this.CountLoading.allUser = false;
      });
  }

  getAllCategoryCount() {
    this.ApiService.get('category', {
        limit: 1
      })
      .then(res => {
        this.Count.allCategory = res.count;
      })
      .finally(() => {
        this.CountLoading.allCategory = false;
      });
  }

  refreshMainChart() {
    this.$timeout(() => {
      this.data = [
        [28, 48, 40, 19, 86, 27, 90],
        [65, 59, 80, 81, 56, 55, 40]
      ];
    });
  }

}