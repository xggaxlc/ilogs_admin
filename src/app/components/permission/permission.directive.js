export function permission(PermissionService) {
  'ngInject';

  let directive = {
    restrict: 'A',
    scope: {},
    replace: false,
    link: linkFunc
  }

  return directive;

  function linkFunc(scope, ele, attr) {

    let api = attr.permission.split('.')[0];
    let action = attr.permission.split('.')[1];

    if (!PermissionService.hasPermission(api, action)) {
      let oEle = angular.element(ele)[0];
      oEle.parentNode.removeChild(oEle);
    }
  }

}