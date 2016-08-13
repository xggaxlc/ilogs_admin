export class RoleAddController {
  constructor($mdDialog, $http, Utils) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.Utils = Utils;

    this.init();
  }

  init() {
    this.title = '添加角色';
    this.getRole();
  }

  getRole() {
    this.initLoading = true;
    this.$http.get('role/template')
      .then(res => {
        this.role = res.data.data;
        this.permissions = {}
      })
      .finally(() => {
        this.initLoading = false;
      });
  }

  submit() {
    this.showLoading = true;
    this.$http.post('role', this.role)
      .then(res => {
        this.Utils.toast('success', '添加角色成功！');
        this.$mdDialog.hide(res.data.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  toggleSelectAll(parentKey) {
    let childPermissionList = this.role.permissions[parentKey];
    angular.forEach(childPermissionList, (item, attr) => {
      childPermissionList[attr] = this.permissions[parentKey];
    });
  }

  updateSelect(parentKey) {
    let childPermissionList = this.role.permissions[parentKey];
    for(let attr in childPermissionList) {
      if (!childPermissionList[attr]) {
        return this.permissions[parentKey] = false;
      }
    }
    return this.permissions[parentKey] = true;
  }

}