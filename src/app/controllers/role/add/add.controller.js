export class RoleAddController {
  constructor($mdDialog, ApiService, Utils, $timeout) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.ApiService = ApiService;
    this.Utils = Utils;
    this.$timeout = $timeout;

    this.title = '添加角色';

    this.init();
  }

  init() {
    this.$timeout(() => {
      this.getRole();
    });
  }

  getRole() {
    this.initLoading = true;
    this.ApiService.get('role/template')
      .then(res => {
        this.role = res.data;
        this.permissions = {}
      })
      .finally(() => {
        this.initLoading = false;
      });
  }

  submit() {
    this.showLoading = true;
    this.ApiService.post('role', this.role)
      .then(res => {
        this.Utils.toast('success', '添加角色成功！');
        this.$mdDialog.hide(res.data);
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