export class LayoutController{
  constructor($mdSidenav) {
    'ngInject';
    this.$mdSidenav = $mdSidenav;
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
        color: '#37474f',
        backgroundColor: '#fff'
      },
      {
        color: '#eceff1',
        backgroundColor: '#37474f'
      },
      {
        color: '#eceff1',
        backgroundColor: '#e51c23'
      },
      {
        color: '#eceff1',
        backgroundColor: '#4caf50'
      },
      {
        color: '#eceff1',
        backgroundColor: '#00bcd4'
      },
      {
        color: '#eceff1',
        backgroundColor: '#03a9f4'
      },
      {
        color: '#eceff1',
        backgroundColor: '#2196f3'
      },
      {
        color: '#eceff1',
        backgroundColor: '#3f51b5'
      },
      {
        color: '#eceff1',
        backgroundColor: '#673ab7'
      },
      {
        color: '#eceff1',
        backgroundColor: '#9c27b0'
      },
      {
        color: '#eceff1',
        backgroundColor: '#e91e63'
      },
      {
        color: '#eceff1',
        backgroundColor: '#009688'
      },
      {
        color: '#eceff1',
        backgroundColor: '#8bc34a'
      },
      {
        color: '#eceff1',
        backgroundColor: '#ff9800'
      },
      {
        color: '#eceff1',
        backgroundColor: '#ff9800'
      },
      {
        color: '#eceff1',
        backgroundColor: '#607d8b'
      },
      {
        color: '#eceff1',
        backgroundColor: '#9e9e9e'
      },
      {
        color: '#eceff1',
        backgroundColor: '#795548'
      },
    ]

    this.sidebarMenuTheme = this.themeColor[11];
    this.topNavTheme = this.themeColor[11];

  }

  toggleMenu() {
    this.$mdSidenav('menu-left').toggle();
  }

  toggleSettings() {
    this.$mdSidenav('settings-right').toggle();
  }

  changeSidebarMenuTheme(theme) {
    this.sidebarMenuTheme = theme;
  }

  changeTopNavTheme(theme) {
    this.topNavTheme = theme;
  }

}