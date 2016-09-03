import { UserAddController } from '../user/add/add.controller';
export class ProfileController extends UserAddController{
  constructor(ApiService, Utils, $state, $timeout, AuthService) {
    'ngInject';
    super(ApiService, Utils, $state, $timeout);

    this.AuthService = AuthService;
    this.user = angular.copy(AuthService.currentUser);
  }

  submit() {
    this.showLoading = true;
    this.ApiService.put(`user/${this.user._id}`, this.user)
      .then(res => {
        this.Utils.toast('success', '保存信息成功！');
        angular.copy(res.data, this.user);
        this.AuthService.saveUserInfo(res.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}