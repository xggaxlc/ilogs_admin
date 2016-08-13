import {
  RoleAddController
} from './add/add.controller';
import {
  RoleEditController
} from './edit/edit.controller';
export class RoleController {
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
    this.$rootScope.pageTitle = '角色';
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }
    this.query();
  }

  showAddDialog(ev) {
    this.$mdDialog.show({
        controller: RoleAddController,
        controllerAs: 'vm',
        templateUrl: 'app/controllers/role/add/add.html',
        targetEvent: ev,
        clickOutsideToClose: false
      })
      .then(newRole => {
        if (this.$stateParams.page) {
          this.$state.go(this.$state.current.name, {
            page: null
          });
        } else {
          this.roles.unshift(newRole);
          if (this.roles.length > Number(this.$stateParams.limit)) {
            this.roles.pop();
          }
          this.pageOptions.count++;
        }
      });
  }

  showEditDialog(ev, item) {
    this.$mdDialog.show({
        controller: RoleEditController,
        controllerAs: 'vm',
        locals: {
          role: angular.copy(item)
        },
        templateUrl: 'app/controllers/role/add/add.html',
        targetEvent: ev,
        clickOutsideToClose: false
      })
      .then(updatedRole => {
        angular.copy(updatedRole, item);
      });
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除角色`)
      .htmlContent(`你确定要删除角色 <strong class="red">${item.name}</strong> ?`)
      .ariaLabel('delete role')
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
      this.$http.delete(`role/${id}`)
        .then(res => {
          this.Utils.toast('success', '删除角色成功！');
          this.$state.reload();
        })
        .finally(() => {
          this.showCircleLoading = false;
        });
    });
  }

  refresh() {
    this.$state.reload();
  }

  query() {
    this.showLoading = true;
    this.$timeout(() => {
      this.$http.get('role', {
          params: this.$stateParams
        })
        .then(res => {
          this.pageOptions.count = res.data.count;
          this.roles = res.data.data;
        })
        .finally(() => {
          this.showLoading = false;
        });
    });
  }

}