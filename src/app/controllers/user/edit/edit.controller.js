import { UserAddController } from '../add/add.controller';
export class UserEditController extends UserAddController{
  constructor($mdDialog, $http, Utils, user) {
    'ngInject';
    super($mdDialog, $http, Utils);
    this.user = user;
    if (!this.user.master) {
      this.user.role = this.user.role._id;
    }
  }

  init() {
    this.title = '编辑用户';
  }

  submit() {
    this.showLoading = true;
    this.$http.put(`user/${this.user._id}`, this.user)
      .then(res => {
        this.Utils.toast('success', '更新用户成功！');
        this.$mdDialog.hide(res.data.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}