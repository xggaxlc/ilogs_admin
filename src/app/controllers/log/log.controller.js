export class LogController{
  constructor(ApiService, $timeout, $stateParams, $rootScope) {
    'ngInject';
    this.ApiService = ApiService;
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.$rootScope = $rootScope;

    this.$rootScope.pageTitle = '事件';
    this.pageOptions = {}
    this.searchOptions = {
      search: [{
        name: '内容',
        value: 'content'
      }]
    }

    this.$timeout(() => {
      this.query();
    });

  }

  query() {
    this.showLoading = true;
    this.ApiService.get('log', this.$stateParams)
      .then(res => {
        this.logs = res.data;
        this.pageOptions.count = res.count;
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}