import { RoleAddController } from '../add/add.controller';

export class RoleEditController extends RoleAddController {
  constructor($mdDialog, ApiService, Utils, $timeout, role) {
    'ngInject';
    super($mdDialog, ApiService, Utils, $timeout);
    this.role = role;
    this.title = '编辑角色';
  }

  init() {
    this.$timeout(() => {
      this.permissions = {}
      this.initSelectAll();
    });
  }

  initSelectAll() {
    for(let attr in this.role.permissions) {
      this.updateSelect(attr);
    }
  }

  submit() {
    this.showLoading = true;
    this.ApiService.put(`role/${this.role._id}`, this.role)
      .then(res => {
        this.Utils.toast('success', '更新角色成功！');
        this.$mdDialog.hide(res.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}