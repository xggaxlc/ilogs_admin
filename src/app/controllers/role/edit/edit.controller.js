import { RoleAddController } from '../add/add.controller';

export class RoleEditController extends RoleAddController {
  constructor($mdDialog, ApiService, Utils, $timeout, $state, role) {
    'ngInject';
    super($mdDialog, ApiService, Utils, $timeout, $state);
    this.role = role;
    this.title = '编辑角色';
  }

  getRole() {
    this.initLoading = true;
    this.ApiService.get('role/template')
      .then(res => {
        let obj = {};
        angular.forEach(res.data.permissions, (value, attr) => {
          obj[attr] = value;
          angular.forEach(value, (deepValue, deepAttr) => {
            try{
              obj[attr][deepAttr] = this.role.permissions[attr][deepAttr];
            } catch(e) {
              obj[attr][deepAttr] = false;
            }
          });
        });
        this.role.permissions = obj;
        this.permissions = {};
        this.initSelectAll();
      })
      .finally(() => {
        this.initLoading = false;
      });
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
        this.Utils.showLoading();
        return this.ApiService.put(`role/${this.role._id}`, this.role);
      })
      .then(() => {
        this.Utils.toast('success', '更新角色成功！');
        this.$state.reload();
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

}