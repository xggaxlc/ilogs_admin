export class UserAddController {
  constructor($mdDialog, $http, Utils) {
    'ngInject';
    this.$mdDialog = $mdDialog;
    this.$http = $http;
    this.Utils = Utils;

    this.init();
    this.getRole();
  }

  init() {
    this.title = '添加用户';
    this.user = {
      sex: true,
      active: true
    }
  }

  getRole() {
    this.$http.get('role', {
        params: {
          active: true
        }
      })
      .then(res => {
        this.roles = res.data.data;
      });
  }

  submit() {
    this.showLoading = true;
    this.$http.post('user', this.user)
      .then(res => {
        this.Utils.toast('success', '添加用户成功！');
        this.$mdDialog.hide(res.data.data);
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}