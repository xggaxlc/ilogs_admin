export class AddArticleController {
  constructor($scope, $rootScope, $timeout, $state, $mdDialog, Utils, AuthService, ApiService, $stateParams, $document, $mdSidenav) {
    'ngInject';
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$mdDialog = $mdDialog;
    this.Utils = Utils;
    this.AuthService = AuthService;
    this.ApiService = ApiService;
    this.$stateParams = $stateParams;
    this.$document = $document;
    this.$mdSidenav = $mdSidenav;

    this.$rootScope.pageTitle = '新建文章';
    this.currentUser = AuthService.currentUser;
    this.article = {};
    this.showLoading = false;
    // 自定义简介开关
    this.custom_summary = false;
    // 简介长度
    this.summary_length = 200;

    this.$timeout(() => {
      this.$scope.$emit('event:showNarrowMenu');
      this.queryCategory();

      // 修正this
      this.bindEvent = this.listenEvent.bind(this);
      this.attachEvent();
      this.detachEvent();
    });
  }

  listenEvent(e) {
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
      this.save();
    }
  }

  attachEvent() {
    this.$document[0].addEventListener('keydown', this.bindEvent, false);
  }

  detachEvent() {
    this.$scope.$on('$destroy', () => {
      this.$document[0].removeEventListener('keydown', this.bindEvent, false);
    });
  }

  queryCategory() {
    this.ApiService.get('category')
      .then(res => {
        this.allCategories = res.data;
      });
  }

  searchCategory(keyword) {
    return this.allCategories.filter(item => new RegExp(`${keyword}`, 'gi').test(item.name));
  }

  toggleSidebar() {
    this.$mdSidenav('editor-right-sidebar')
    .toggle()
    .then(() => {
      this.showSidebar = this.$mdSidenav('editor-right-sidebar').isOpen();
    });
  }

  openInfo(ev) {
    let alertDialog = this.$mdDialog.alert()
      .clickOutsideToClose(true)
      .title('快捷键')
      .htmlContent(`
        <table class="margin-top-16 md-table">
          <thead class="md-head">
            <tr class="md-row">
              <th class="md-column">操作</th>
              <th class="md-column">快捷键</th>
            </tr>
          </thead>
          <tbody class="md-body">
            <tr class="md-row">
              <td class="md-cell">保存</td>
              <td class="md-cell">Ctrl + S</td>
            </tr>
          </tbody>
        </table>
      `)
      .parent(angular.element('#page-editor'))
      .targetEvent(ev)
      .ariaLabel('Alert Dialog')
      .ok('我知道了');
    return this.$mdDialog.show(alertDialog);
  }

  addNewCategory(categoryName) {
    if (!categoryName) return;
    this.ApiService.post('category', {
        name: categoryName
      })
      .then(res => {
        this.allCategories.push(res.data);
        this.categorySelected = res.data;
        this.Utils.toast('success', '创建新分类成功');
      });
  }

  showDeleteConfirm(ev) {
    let confirm = this.$mdDialog.confirm()
      .title(`删除文章`)
      .htmlContent(`<p class="margin-top-16">你确定要 <strong class="red">删除</strong> 这篇文章吗 ?</p>`)
      .ariaLabel('delete article')
      .targetEvent(ev)
      .ok('确定')
      .cancel('取消');

    this.$mdDialog.show(confirm)
      .then(() => {
        this.delete();
      });
  }

  save() {
    if (!this.article.title) return this.Utils.toast('error', '标题必填');
    if (this.showLoading) return;
    this.showLoading = true;

    if (this.custom_summary) {
      if (this.article.summary) {
        this.article.summary = this.article.summary.substring(0, this.summary_length);
      }
    } else {
      this.article.summary = this.editor.getText().substring(0, this.summary_length);
    }

    this.article.author = this.currentUser._id;
    this.article.category = this.categorySelected ? this.categorySelected._id : null;
    this.article.content = this.editor.getHTML();
    this.article._id ? this.update() : this.create();
  }

  create() {
    this.showLoading = true;
    this.ApiService.post('post', this.article)
      .then(res => {
        this.article = res.data;
        this.Utils.toast('success', '保存成功！');
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

  delete() {
    this.showLoading = true;
    this.Utils.showLoading();
    return this.ApiService.delete(`post/${this.article._id}`)
      .then(() => {
        this.Utils.toast('success', '删除文章成功！');
        if (this.$stateParams.id) {
          this.$state.go('main.article.index', {}, {
            replace: true
          })
        } else {
          this.$state.reload();
        }
      })
      .finally(() => {
        this.showLoading = false;
        this.Utils.hideLoading();
      });
  }

  publish() {
    this.article.published = true;
    this.update(false)
      .then(() => {
        this.Utils.toast('success', '发布成功！');
      })
      .catch(() => {
        this.article.published = false;
      });
  }

  unPublish() {
    this.article.published = false;
    this.update(false)
      .then(() => {
        this.Utils.toast('warn', '已撤销发布！');
      })
      .catch(() => {
        this.article.published = true;
      });
  }

  update(autoToast = true) {
    this.showLoading = true;
    return this.ApiService.put(`post/${this.article._id}`, this.article)
      .then(res => {
        this.article = res.data;
        if (autoToast) {
          this.Utils.toast('success', '更新成功！');
        }
      })
      .finally(() => {
        this.showLoading = false;
      });
  }

}