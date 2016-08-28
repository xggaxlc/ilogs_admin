export class CategoryController {
  constructor($rootScope, $timeout, $state, $stateParams, $mdDialog, Utils, ApiService) {
    'ngInject';
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;
    this.ApiService = ApiService;

    this.$rootScope.pageTitle = '分类';
    this.newCategory = {}
    this.pageOptions = {
      perPage: this.$stateParams.limit
    }

    this.$timeout(() => {
      this.query();
    }, 200);

  }


  add(ev) {
    if (ev.keyCode === 13 && this.newCategory.name) {
      this.create();
    }
  }

  showDeleteConfirm(ev, item) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除分类`)
      .htmlContent(`<p class="margin-top-16">你确定要删除分类 <strong class="red">${item.name}</strong> ?</p>`)
      .ariaLabel('delete category')
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
      .htmlContent(`<p class="margin-top-16">你正在修改分类 <strong class="red">${item.name}</strong></p>`)
      .placeholder('新分类名')
      .ariaLabel('category name')
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
    this.Utils.showLoading();
    this.ApiService.put(`category/${item._id}`, angular.merge({}, item, { name: newName }))
      .then(res => {
        this.Utils.toast('success', '更新分类成功！');
        angular.copy(res.data, item);
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

  delete(id) {
    this.Utils.showLoading();
    this.ApiService.delete(`category/${id}`)
      .then(() => {
        this.Utils.toast('success', '删除分类成功！');
        this.$state.reload();
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

  create() {
    this.Utils.showLoading();
    this.ApiService.post('category', this.newCategory)
      .then(res => {
        
        if (this.$stateParams.page) {
          this.$state.go(this.$state.current.name, {
            page: null
          });
        } else {
          this.categories.unshift(res.data);
          if (this.categories.length > Number(this.$stateParams.limit)) {
            this.categories.pop();
          }
          this.pageOptions.count ++;
        }

        this.Utils.toast('success', '添加分类成功！');
        this.newCategory = {}
      })
      .finally(() => {
        this.Utils.hideLoading();
      });
  }

  query() {
    this.showLoading = true;
    this.ApiService.get('category', this.$stateParams)
    .then(res => {
      this.categories = res.data;
      this.pageOptions.count = res.count;
    })
    .finally(() => {
      this.showLoading = false;
    });
  }

}