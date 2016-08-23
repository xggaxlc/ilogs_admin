export function loadingButton() {
  let directive = {
    restrict: 'EA',
    scope: {
      type: '@',
      class: '@',
      disabled: '=',
      loading: '=',
      text: '@',
      click: '&'
    },
    template: `
      <md-button aria-label="loading button" type="{{type || 'submit'}}" ng-class="class" type="button" ng-disabled="disabled" ng-click="click()">
        <div layout="row" layout-align="center center">
          <span ng-show="!loading">{{text || '提交'}}</span>
          <md-progress-circular md-diameter="60%" md-mode="indeterminate" ng-show="loading"></md-progress-circular>
        </div>
      </md-button>
    `
  }

  return directive;
}