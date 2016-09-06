export class HomeController {
  constructor($timeout, $scope, $rootScope, ApiService) {
    'ngInject';

    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$scope = $scope;
    this.ApiService = ApiService;

    this.$rootScope.pageTitle = '首页';

    this.$timeout(() => {

      let apiArr = [{
        api: 'post',
        params: {},
        loading: 'post'
      }, {
        api: 'post',
        params: {
          published: true
        },
        loading: 'postPublished'
      }, {
        api: 'user',
        params: {},
        loading: 'user'
      }, {
        api: 'category',
        params: {},
        loading: 'category'
      }]

      this.getCount(apiArr);

      this.getPostTrend();
      this.getCategoryStat();
      this.getUserStat();
      this.getLog();
    }, 300);

  }

  getCount(apiArr, paramsShare = {}) {
    this.CountLoading = {};
    this.Count = {};

    this.$timeout(() => {
      angular.forEach(apiArr, item => {
        this.CountLoading[item.loading] = true;
        this.ApiService.get(item.api, angular.merge({
            limit: 1
          }, item.params, paramsShare))
          .then(res => {
            this.Count[item.loading] = res.count;
          })
          .finally(() => {
            this.CountLoading[item.loading] = false;
          });
      });
    });
  }

  // 文章创建趋势
  getPostTrend() {
    this.postTrendChartLoading = true;
    this.trendColors = ['#9C27B0'];
    this.ApiService.get('statistics/post', {
        limit: 6
      })
      .then(res => {
        this.trendLabels = res.data.map(item => item.name);
        this.trendSeries = ['创建文章'];
        this.trendData = new Array(res.data.map(item => item.count));
      })
      .finally(() => {
        this.postTrendChartLoading = false;
      });
  }

  // 分类占比
  getCategoryStat() {
    this.categoryChartLoading = true;
    this.ApiService.get('statistics/category', {
        limit: 10
      })
      .then(res => {
        this.categoryChartData = res.data.map(item => item.count);
        this.categoryChartLabels = res.data.map(item => item.name);
      })
      .finally(() => {
        this.categoryChartLoading = false;
      });
  }

  // 角色占比
  // getRoleStat() {
  //   this.ApiService.get('statistics/role', {
  //     limit: 10
  //   })
  //   .then(res => {
  //     this.roleChartData = res.data.map(item => item.count);
  //     this.roleChartLabels = res.data.map(item => item.name);
  //   });
  // }

  // 用户文章数统计
  getUserStat() {
    this.userChartLoading = true;
    this.ApiService.get('statistics/user', {
        limit: 10
      })
      .then(res => {
        this.userChartData = res.data.map(item => item.count);
        this.userChartLabels = res.data.map(item => item.name.substring(0, 10));
      })
      .finally(() => {
        this.userChartLoading = false;
      });
  }

  //事件
  getLog() {
    this.logLoading = true;
    this.ApiService.get('log', {
        limit: 6
      })
      .then(res => {
        this.logs = res.data;
      })
      .finally(() => {
        this.logLoading = false;
      });
  }

}