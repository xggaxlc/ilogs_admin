export class Utils {
  constructor($mdToast, $rootScope) {
    'ngInject';
    this.$mdToast = $mdToast;
    this.$rootScope = $rootScope;
  }

  toast(type = 'success', msg, timeout = '5000', position = 'top right') {
    return this.$mdToast.show({
      template: `
      <md-toast class="md-toast ${type}"> 
        <div class="md-toast-content">
          <span>${msg}</span>
          <span flex></span>
          <md-button class="md-icon-button md-default" ng-click="closeToast()">
            <md-icon>close</md-icon>
          </md-button>
        </div>
      </md-toast>
      `,
      controller: function($scope, $mdToast) {
        'ngInject';
        $scope.closeToast = function() {
          $mdToast.hide();
        }
      },
      hideDelay: timeout,
      position: position
    });
  }

  showLoading() {
    this.$rootScope.showGlobalLoading = true;
  }

  hideLoading() {
    this.$rootScope.showGlobalLoading = false;
  }

  isObjEmpty(obj) {
    for (let attr in obj) {
      return false;
    }
    return true;
  }

}