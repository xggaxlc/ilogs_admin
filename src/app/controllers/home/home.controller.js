export class HomeController {
  constructor($timeout, $rootScope) {
    'ngInject';

    $rootScope.pageTitle = '首页';
    this.$timeout = $timeout;

    this.labels = ["January", "February", "March", "April", "May", "June", "July"];
    this.series = ['Series A', 'Series B'];
    this.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];

    this.categoryChartData = [300, 500, 100, 40, 120];

    this.categoryChartLabels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];

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