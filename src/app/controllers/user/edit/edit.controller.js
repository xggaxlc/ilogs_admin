import { UserAddController } from '../add/add.controller';
export class UserEditController extends UserAddController{
  constructor(ApiService, Utils, $state, $timeout, user) {
    'ngInject';
    super(ApiService, Utils, $state, $timeout);
    this.user = user;
    if (!this.user.master) {
      this.user.role = this.user.role._id;
    }

    this.title = '编辑用户';
    this.requirePass = false;

  }

  submit() {
    this.showLoading = true;
    this.ApiService.put(`user/${this.user._id}`, this.user)
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