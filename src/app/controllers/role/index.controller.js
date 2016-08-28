import {
  RoleAddController
} from './add/add.controller';
import {
  RoleEditController
} from './edit/edit.controller';
export class RoleController {
  constructor($rootScope, $timeout, ApiService, $state, $stateParams, $mdDialog, Utils) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.ApiService = ApiService;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;

    this.$rootScope.pageTitle = '角色';
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }

    this.searchOptions = {
      search: [{
        name: '角色名',
        value: 'name'
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

    this.$timeout(() => {
      this.query();
    }, 200);

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
      .htmlContent(`<p class="margin-top-16">你确定要删除角色 <strong class="red">${item.name}</strong> ？</p>`)
      .ariaLabel('delete role')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete(item._id);
      });
  }

  delete(id) {
    this.Utils.showLoading();
    this.ApiService.delete(`role/${id}`)
      .then(() => {
        this.Utils.toast('success', '删除角色成功！');
        this.$state.reload();
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

  query() {
    this.showLoading = true;
    this.ApiService.get('role', this.$stateParams)
      .then(res => {
        this.pageOptions.count = res.count;
        this.roles = res.data;
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}