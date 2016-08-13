import { RoleAddController } from '../add/add.controller';

export class RoleEditController extends RoleAddController {
  constructor($mdDialog, $http, Utils, role, $timeout) {
    'ngInject';
    super($mdDialog, $http, Utils);
    this.$timeout = $timeout;
    this.role = role;
    this.$timeout(() => {
      this.permissions = {}
      this.initSelectAll();
    });
  }

  init() {
    this.title = '编辑角色';
  }

  initSelectAll() {
    for(let attr in this.role.permissions) {
      this.updateSelect(attr);
    }
  }

  submit() {
    this.showLoading = true;
    this.$http.put(`role/${this.role._id}`, this.role)
      .then(res => {
        this.Utils.toast('success', '更新角色成功！');
        this.$mdDialog.hide(res.data.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}