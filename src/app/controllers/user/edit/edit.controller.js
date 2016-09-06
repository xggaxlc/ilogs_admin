import {
  UserAddController
} from '../add/add.controller';
export class UserEditController extends UserAddController {
  constructor($rootScope, ApiService, Utils, $state, $timeout, user, $mdDialog) {
    'ngInject';
    super($rootScope, ApiService, Utils, $state, $timeout);
    this.user = user;
    this.$mdDialog = $mdDialog;
    if (!this.user.master) {
      this.user.role = this.user.role._id;
    }

    this.$rootScope.pageTitle = '编辑用户';
    this.title = '编辑用户';
    this.requirePass = false;

  }

  submit() {

    let confirm = this.$mdDialog.confirm()
      .title(`修改用户`)
      .htmlContent(`<p class="margin-top-16">修改用户会导致此用户被<strong class="red">强制下线</strong>， 修改成功此用户会收到<strong class="red">邮件提示</strong></p>`)
      .ariaLabel('update user')
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.showLoading = true;
        return this.ApiService.put(`user/${this.user._id}`, this.user);
      })
      .then(res => {
        this.Utils.toast('success', '更新用户成功！');
        angular.copy(res.data, this.user);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}

UserEditController.resolve = {
  user: (ApiService, $stateParams, Utils) => {
    'ngInject';
    Utils.showLoading();
    return ApiService.get(`user/${$stateParams.id}`)
      .then(res => {
        return res.data;
      })
      .finally(() => {
        Utils.hideLoading();
      });
  }
}