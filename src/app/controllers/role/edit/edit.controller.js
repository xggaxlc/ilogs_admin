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

    let confirm = this.$mdDialog.confirm()
      .title(`修改角色`)
      .htmlContent(`<p class="margin-top-16">修改角色成功会导致所有<strong class="red">使用此角色的用户</strong>被<strong class="red">强制下线</strong>`)
      .ariaLabel('update role')
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.showLoading = true;
        return this.ApiService.put(`role/${this.role._id}`, this.role);
      })
      .then(res => {
        this.Utils.toast('success', '更新角色成功！');
        this.$mdDialog.hide(res.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}