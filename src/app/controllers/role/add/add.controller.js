export class RoleAddController {
  constructor($mdDialog, ApiService, Utils, $timeout, $state) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.ApiService = ApiService;
    this.Utils = Utils;
    this.$timeout = $timeout;
    this.$state = $state;

    this.title = '添加角色';

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
        this.initSelectAll();
      })
      .finally(() => {
        this.initLoading = false;
      });
  }

  initSelectAll() {
    for(let attr in this.role.permissions) {
      this.updateSelect(attr);
    }
  }

  submit() {
    this.showLoading = true;
    this.ApiService.post('role', this.role)
      .then(() => {
        this.Utils.toast('success', '添加角色成功！');
        this.$state.reload();
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