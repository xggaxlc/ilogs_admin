export class HomeController {
  constructor($timeout, $scope, $rootScope, $http) {
    'ngInject';

    $rootScope.pageTitle = '首页';
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.$http = $http;

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
    });

  }

  getAllArticleCount() {
    this.$http.get('post', {
        params: {
          limit: 1
        }
      })
      .then(res => {
        this.Count.allArticle = res.data.count;
      })
      .finally(() => {
        this.CountLoading.allArticle = false;
      });
  }

  getPublishedArticleCount() {
    this.$http.get('post', {
        params: {
          limit: 1,
          published: true
        }
      })
      .then(res => {
        this.Count.publishedArticle = res.data.count;
      })
      .finally(() => {
        this.CountLoading.publishedArticle = false;
      });
  }

  getAllUserCount() {
    this.$http.get('user', {
        params: {
          limit: 1
        }
      })
      .then(res => {
        this.Count.allUser = res.data.count;
      })
      .finally(() => {
        this.CountLoading.allUser = false;
      });
  }

  getAllCategoryCount() {
    this.$http.get('category', {
        params: {
          limit: 1
        }
      })
      .then(res => {
        this.Count.allCategory = res.data.count;
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