export class CategoryController {
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
    this.$rootScope.pageTitle = '分类';
    this.newCategory = {}
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }
    this.query();
  }


  add(ev) {
    if (ev.keyCode === 13 && this.newCategory.name) {
      this.create();
    }
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除分类`)
      .htmlContent(`你确定要删除分类 <strong class="red">${item.name}</strong> ?`)
      .ariaLabel('delete category')
      .theme('confirm')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete(item._id);
      });
  }

  showEditPrompt(ev, item) {
    let confirm = this.$mdDialog.prompt()
      .title('修改分类')
      .htmlContent(`你正在修改分类 <strong class="red">${item.name}</strong>`)
      .placeholder('新分类名')
      .ariaLabel('category name')
      .theme('prompt')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(newName => {
        if (newName) {
          this.update(item, newName);
        }
      });
  }

  update(item, newName) {
    this.$http.put(`category/${item._id}`, angular.merge({}, item, { name: newName }))
      .then(res => {
        this.Utils.toast('success', '更新分类成功！');
        angular.copy(res.data.data, item);
      })
      .finally(() => {

      });
  }

  delete(id) {
    this.showCircleLoading = true;
    this.$timeout(() => {
      this.$http.delete(`category/${id}`)
        .then(res => {
          this.Utils.toast('success', '删除分类成功！');
          this.query();
        })
        .finally(() => {
          this.showCircleLoading = false;
        });
    });
  }

  create() {
    this.showCircleLoading = true;
    this.$http.post('category', this.newCategory)
      .then(res => {
        
        if (this.$stateParams.page) {
          this.$state.go(this.$state.current.name, {
            page: null
          });
        } else {
          this.categories.unshift(res.data.data);
          if (this.categories.length > Number(this.$stateParams.limit)) {
            this.categories.pop();
          }
          this.pageOptions.count ++;
        }

        this.Utils.toast('success', '添加分类成功！');
        this.newCategory = {}
      })
      .finally(() => {
        this.showCircleLoading = false;
      });
  }

  query() {
    this.categories = [];
    this.showLoading = true;
    this.$timeout(() => {
      this.$http.get('category', {
        params: this.$stateParams
      })
      .then(res => {
        this.categories = res.data.data;
        this.pageOptions.count = res.data.count;
      })
      .finally(() => {
        this.showLoading = false;
      });
    }, this.$rootScope.viewAnimateDelay);
  }

}