export class LayoutController{
  constructor($mdSidenav, $localStorage) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
    this.$localStorage = $localStorage;
    this.menu = [
      {
        name: '首页',
        icon: 'home',
        state: '.home'
      },
      {
        name: '文章',
        icon: 'code',
        state: 'test'
      },
      {
        name: '用户',
        icon: 'people',
        state: 'people'
      },
      {
        name: '统计',
        icon: 'trending_up',
        state: 'test'
      },
      {
        name: '记录',
        icon: 'event',
        state: 'test'
      },
      {
        name: '设置',
        icon: 'settings',
        state: 'test'
      }
    ]

    this.themeColor = [
      {
        name: 'White',
        color: '#37474f',
        backgroundColor: '#fff'
      },
      {
        name: 'Red',
        color: '#eceff1',
        backgroundColor: '#F44336'
      },
      {
        name: 'Pink',
        color: '#eceff1',
        backgroundColor: '#E91E63'
      },
      {
        name: 'Purple',
        color: '#eceff1',
        backgroundColor: '#9C27B0'
      },
      {
        name: 'Deep Purple',
        color: '#eceff1',
        backgroundColor: '#673AB7'
      },
      {
        name: 'Indigo',
        color: '#eceff1',
        backgroundColor: '#3F51B5'
      },
      {
        name: 'Blue',
        color: '#eceff1',
        backgroundColor: '#2196F3'
      },
      {
        name: 'Light Blue',
        color: '#eceff1',
        backgroundColor: '#03A9F4'
      },
      {
        name: 'Cyan',
        color: '#eceff1',
        backgroundColor: '#00BCD4'
      },
      {
        name: 'Teal',
        color: '#eceff1',
        backgroundColor: '#009688'
      },
      {
        name: 'Green',
        color: '#eceff1',
        backgroundColor: '#4CAF50'
      },
      {
        name: 'Light Green',
        color: '#eceff1',
        backgroundColor: '#8BC34A'
      },
      {
        name: 'Lime',
        color: '#eceff1',
        backgroundColor: '#CDDC39'
      },
      {
        name: 'Yellow',
        color: '#eceff1',
        backgroundColor: '#FFEB3B'
      },
      {
        name: 'Amber',
        color: '#eceff1',
        backgroundColor: '#FFC107'
      },
      {
        name: 'Orange',
        color: '#eceff1',
        backgroundColor: '#FF9800'
      },
      {
        name: 'Deep Orange',
        color: '#eceff1',
        backgroundColor: '#FF5722'
      },
      {
        name: 'Brown',
        color: '#eceff1',
        backgroundColor: '#795548'
      },
      {
        name: 'Grey',
        color: '#eceff1',
        backgroundColor: '#9E9E9E'
      },
      {
        name: 'Blue Grey',
        color: '#eceff1',
        backgroundColor: '#607D8B'
      },
      {
        name: 'Black',
        color: '#eceff1',
        backgroundColor: '#37474f'
      }
    ]

    this.sidebarMenuTheme = $localStorage.sidebarMenuTheme || this.themeColor[4];
    this.topNavTheme = $localStorage.topNavTheme || this.themeColor[4];

  }

  toggleMenu() {
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