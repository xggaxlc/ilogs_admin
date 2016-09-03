import { UserAddController } from '../user/add/add.controller';
export class ProfileController extends UserAddController{
  constructor($rootScope, ApiService, Utils, $state, $timeout, AuthService) {
    'ngInject';
    super($rootScope, ApiService, Utils, $state, $timeout);

    this.$rootScope.pageTitle = '个人资料设置';

    this.AuthService = AuthService;
    this.user = angular.copy(AuthService.currentUser);
  }

  submit() {
    this.showLoading = true;
    this.ApiService.put(`user/${this.user._id}`, this.user)
      .then(res => {
        this.Utils.toast('success', '保存信息成功！');
        angular.copy(res.data, this.user);
        this.AuthService.saveUserInfo(angular.merge({}, this.user, res.data));
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}