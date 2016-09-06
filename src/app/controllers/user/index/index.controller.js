export class UserIndexController {
  constructor($rootScope, $timeout, $state, $stateParams, $mdDialog, Utils, ApiService, AuthService) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;
    this.ApiService = ApiService;
    this.AuthService = AuthService;
    this.currentUser = AuthService.currentUser;

    this.$rootScope.pageTitle = '用户';
    this.searchOptions = {
      search: [{
        name: '用户名',
        value: 'name'
      }]
    }

    this.roleFilterOptions = {
      field: 'role',
      filter: [{
        name: '全部角色',
        value: ''
      }]
    }

    this.statusFilterOptions = {
      field: 'active',
      filter: [{
        name: '全部状态',
        value: ''
      }, {
        name: '正常',
        value: true
      }, {
        name: '锁定',
        value: false
      }]
    }

    this.pageOptions = {
      perPage: this.$stateParams.limit
    }

    this.$timeout(() => {
      this.query();
      this.queryRole();
    }, 300);
  }

  inviteUser(ev) {
    this.$mdDialog.show({
      template: `
        <md-toolbar>
          <div class="md-toolbar-tools">
            <h2>邀请用户</h2>
            <span flex></span>
            <md-button class="md-icon-button" ng-click="vm.$mdDialog.cancel()">
              <md-icon>close</md-icon>
            </md-button>
          </div>
        </md-toolbar>
        <md-dialog-content layout-padding style="min-width:300px;">
          <form name="inviteForm">
            <md-input-container class="md-block">
              <label>邮箱</label>
              <input ng-model="vm.user.email" type="email" name="email" required>
              <div ng-messages="inviteForm.email.$error">
                <div ng-message="required">邮箱必填。</div>
                <div ng-message="email">邮箱格式不正确。</div>
              </div>
            </md-input-container>

            <md-input-container class="md-block">
              <label>用户组</label>
              <md-select ng-model="vm.user.role" name="role">
                <md-option value="{{item._id}}" ng-repeat="item in vm.roles">{{item.name}}</md-option>
              </md-select>
            </md-input-container>

          </form>
        </md-dialog-content>
        <md-dialog-actions layout="row" layout-align="end center">
          <md-button ng-click="vm.$mdDialog.cancel()">取消</md-button>
          <loading-button class="md-primary" data-text="提交" disabled="vm.showLoading || inviteForm.$invalid || !vm.user.role" click="vm.submit()"></loading-button>
        <md-dialog-actions>
      `,
      controller: function($mdDialog, roles, ApiService, Utils) {
        'ngInject';
        this.$mdDialog = $mdDialog;
        this.roles = roles;
        this.submit = () => {
          this.showLoading = true;
          ApiService.post('invite', this.user)
            .then(res => {
              Utils.toast('success', res.message);
              $mdDialog.hide();
            })
            .finally(() => {
              this.showLoading = false;
            });
        }
      },
      controllerAs: 'vm',
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        roles: this.allRoles
      }
    })
    .then(() => {
      this.$state.reload();
    });
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除用户`)
      .htmlContent(`<p class="margin-top-16">你确定要删除用户 <strong class="red">${item.name}</strong> ?</p>`)
      .ariaLabel('delete user')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete(item._id);
      });
  }

  query() {
    this.showLoading = true;
    this.ApiService.get('user', this.$stateParams)
      .then(res => {
        this.pageOptions.count = res.count;
        this.users = res.data;
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  queryRole() {
    this.ApiService.get('role')
      .then(res => {
        this.allRoles = res.data;
        this.roleFilterOptions.filter = this.roleFilterOptions.filter
          .concat(
            res.data.map(item => {
              return {
                name: item.name,
                value: item._id
              }
            })
          );
      });
  }

  delete(id) {
    this.Utils.showLoading();
    this.ApiService.delete(`user/${id}`)
      .then(() => {
        this.Utils.toast('success', '删除用户成功！');
        this.$state.reload();
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

}