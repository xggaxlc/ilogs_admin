import {
  UserAddController
} from './add/add.controller';
import {
  UserEditController
} from './edit/edit.controller';
export class UserController {
  constructor($rootScope, $timeout, $http, $state, $stateParams, $mdDialog, Utils) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$http = $http;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;

    this.init();
  }

  init() {
    this.$rootScope.pageTitle = '用户列表';
    this.keyword = this.$stateParams.name;
    this.selected = [];
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }
    this.query();
  }

  search(e) {
    if (e.keyCode === 13) {
      this.$state.go(this.$state.current.name, {
        page: null,
        name: this.keyword
      });
    }
  }

  check(ev, item) {

  }

  showEditDialog(ev, item) {
    this.$mdDialog.show({
        controller: UserEditController,
        controllerAs: 'vm',
        locals: {
          user: angular.copy(item)
        },
        templateUrl: 'app/controllers/user/add/add.html',
        targetEvent: ev,
        clickOutsideToClose: false
      })
      .then(updatedUser => {
        angular.copy(updatedUser, item);
      });
  }

  showAddDialog(ev) {
    this.$mdDialog.show({
        controller: UserAddController,
        controllerAs: 'vm',
        templateUrl: 'app/controllers/user/add/add.html',
        targetEvent: ev,
        clickOutsideToClose: false
      })
      .then(newUser => {
        if (this.$stateParams.page) {
          this.$state.go(this.$state.current.name, {
            page: null
          });
        } else {
          this.users.unshift(newUser);
          if (this.users.length > Number(this.$stateParams.limit)) {
            this.users.pop();
          }
          this.pageOptions.count++;
        }
      });
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除用户`)
      .htmlContent(`你确定要删除用户 <strong class="red">${item.name}</strong> ?`)
      .ariaLabel('delete user')
      .theme('confirm')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete(item._id);
      });
  }

  delete(id) {
    this.showCircleLoading = true;
    this.$timeout(() => {
      this.$http.delete(`user/${id}`)
        .then(res => {
          this.Utils.toast('success', '删除用户成功！');
          this.$state.reload();
        })
        .finally(() => {
          this.showCircleLoading = false;
        });
    });
  }

  query() {
    this.users = [];
    this.showLoading = true;
    this.$timeout(() => {
      this.$http.get('user', {
          params: this.$stateParams
        })
        .then(res => {
          this.pageOptions.count = res.data.count;
          this.users = res.data.data;
        })
        .finally(() => {
          this.showLoading = false;
        });
    }, this.$rootScope.viewAnimateDelay);
  }


}