export class LayoutController {
  constructor($mdSidenav, $localStorage, $scope, $timeout, AuthService, PermissionService) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
    this.$localStorage = $localStorage;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.AuthService = AuthService;
    this.PermissionService = PermissionService;
    this.currentUser = AuthService.currentUser;

    this.themeColor = [{
      name: 'White',
      color: '#37474f',
      backgroundColor: '#fff'
    }, {
      name: 'Red',
      color: '#eceff1',
      backgroundColor: '#F44336'
    }, {
      name: 'Pink',
      color: '#eceff1',
      backgroundColor: '#E91E63'
    }, {
      name: 'Purple',
      color: '#eceff1',
      backgroundColor: '#9C27B0'
    }, {
      name: 'Deep Purple',
      color: '#eceff1',
      backgroundColor: '#673AB7'
    }, {
      name: 'Indigo',
      color: '#eceff1',
      backgroundColor: '#3F51B5'
    }, {
      name: 'Blue',
      color: '#eceff1',
      backgroundColor: '#2196F3'
    }, {
      name: 'Light Blue',
      color: '#eceff1',
      backgroundColor: '#03A9F4'
    }, {
      name: 'Cyan',
      color: '#eceff1',
      backgroundColor: '#00BCD4'
    }, {
      name: 'Teal',
      color: '#eceff1',
      backgroundColor: '#009688'
    }, {
      name: 'Green',
      color: '#eceff1',
      backgroundColor: '#4CAF50'
    }, {
      name: 'Light Green',
      color: '#eceff1',
      backgroundColor: '#8BC34A'
    }, {
      name: 'Lime',
      color: '#eceff1',
      backgroundColor: '#CDDC39'
    }, {
      name: 'Yellow',
      color: '#eceff1',
      backgroundColor: '#FFEB3B'
    }, {
      name: 'Amber',
      color: '#eceff1',
      backgroundColor: '#FFC107'
    }, {
      name: 'Orange',
      color: '#eceff1',
      backgroundColor: '#FF9800'
    }, {
      name: 'Deep Orange',
      color: '#eceff1',
      backgroundColor: '#FF5722'
    }, {
      name: 'Brown',
      color: '#eceff1',
      backgroundColor: '#795548'
    }, {
      name: 'Grey',
      color: '#eceff1',
      backgroundColor: '#9E9E9E'
    }, {
      name: 'Blue Grey',
      color: '#eceff1',
      backgroundColor: '#607D8B'
    }, {
      name: 'Black',
      color: '#eceff1',
      backgroundColor: '#37474f'
    }]

    this.sidebarMenuTheme = $localStorage.sidebarMenuTheme || this.themeColor[3];
    this.topNavTheme = $localStorage.topNavTheme || this.themeColor[3];
    this.showNarrowMenu = this.$localStorage.showNarrowMenu || false;

    this.menu = this.createMenu();
    this.handleEvent();

    // 监听用户资料  事件来自AuthService，全局广播
    this.$scope.$on('event:userInfoChanged', (ev, userInfo) => {
      //根据用户权限 重新渲染菜单
      this.currentUser = userInfo;
      this.menu = this.createMenu();
    });

  }

  createMenu() {
    return [{
      name: '首页',
      icon: 'home',
      state: '.home'
    }, {
      name: '文章',
      icon: 'code',
      state: '.article.index'
    }, {
      name: '分类',
      icon: 'attachment',
      state: '.category'
    }, {
      name: '用户',
      icon: 'perm_identity',
      state: '.user.index'
    }, {
      name: '角色',
      icon: 'people',
      state: '.role'
    }, {
      name: '记录',
      icon: 'event',
      state: '.log'
    }, {
      name: '设置',
      icon: 'settings',
      state: '.settings',
      hide: !this.PermissionService.hasPermission('setting', 'get')
    }]
  }

  handleEvent() {

    this.$scope.$on('event:showNarrowMenu', (ev) => {
      ev.stopPropagation();
      this.$timeout(() => {
        this.showNarrowMenu = this.$localStorage.showNarrowMenu = true;
      });
    });

    document.addEventListener('fullscreenchange', () => {
      // angular不知道要更新...
      this.$scope.$apply(() => {
        this.isFullScreen = document.fullscreen;
      });
    });

    document.addEventListener('mozfullscreenchange', () => {
      // angular不知道要更新...
      this.$scope.$apply(() => {
        this.isFullScreen = document.mozFullScreen;
      });
    });

    document.addEventListener('webkitfullscreenchange', () => {
      // angular不知道要更新...
      this.$scope.$apply(() => {
        this.isFullScreen = document.webkitIsFullScreen;
      });
    });

  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
  toggleFullScreen() {

    let isFullScreen = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen;

    if (isFullScreen) {
      if (document.exitFullscreen)
        return document.exitFullscreen();

      if (document.webkitExitFullscreen)
        return document.webkitExitFullscreen();

      if (document.mozCancelFullScreen)
        return document.mozCancelFullScreen();

      if (document.msExitFullscreen)
        return document.msExitFullscreen();

    } else {

      if (document.documentElement.requestFullscreen)
        return document.documentElement.requestFullscreen();

      if (document.documentElement.webkitRequestFullscreen)
        return document.documentElement.webkitRequestFullscreen();

      if (document.documentElement.mozRequestFullScreen)
        return document.documentElement.mozRequestFullScreen();

      if (document.documentElement.msRequestFullscreen)
        return document.documentElement.msRequestFullscreen();

    }
  }

  toggleNarrowMenu() {
    this.showNarrowMenu = this.$localStorage.showNarrowMenu = !this.showNarrowMenu;
    this.$timeout(() => {
      $(window).trigger('resize');
    }, 350);
  }

  toggleMenu() {
    //menu关闭状态先恢复至正常宽度再打开
    if (!this.$mdSidenav('menu-left').isOpen()) {
      this.showNarrowMenu = false;
    }
    this.$mdSidenav('menu-left').toggle();
  }

  toggleSettings() {
    this.$mdSidenav('settings-right').toggle();
  }

  changeSidebarMenuTheme(theme) {
    this.sidebarMenuTheme = theme;
    this.$localStorage.sidebarMenuTheme = theme;
  }

  changeTopNavTheme(theme) {
    this.topNavTheme = theme;
    this.$localStorage.topNavTheme = theme;
  }

}