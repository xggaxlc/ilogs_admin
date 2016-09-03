export class UserAddController {
  constructor(ApiService, Utils, $state, $timeout) {
    'ngInject';
    this.ApiService = ApiService;
    this.Utils = Utils;
    this.$state = $state;
    this.$timeout = $timeout;

    this.title = '添加用户';
    this.requirePass = true;

    this.user = {
      sex: true,
      active: true
    }

    this.uploadOptions = {
      crop: true,
      maxSize: '2MB',
      resize: {
        width: 240,
        height: 240
      },
      placeholder: {
        size: '300x300',
        text: '头像'
      }
    };

    this.$timeout(() => {
      this.getRole();
    });
  }

  getRole() {
    this.ApiService.get('role', {
        active: true
      })
      .then(res => {
        if (!res.data.length) return this.Utils.toast('error', '没有角色可选，请先添加角色，否则无法添加用户');
        this.roles = res.data;
      });
  }

  submit() {
    this.showLoading = true;
    this.ApiService.post('user', this.user)
      .then(() => {
        this.Utils.toast('success', '添加用户成功！');
        this.$state.go('main.user.index');
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}