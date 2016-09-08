export class PermissionService {
  constructor(AuthService, $rootScope) {
    'ngInject';
    this.AuthService = AuthService;
    this.currentUser = AuthService.currentUser;

    $rootScope.$on('event:userInfoChanged', (ev, userInfo) => {
      this.currentUser = userInfo;
      this.getPermission();
    });

    this.getPermission();
  }

  getPermission() {
    try{
      this.permissionList = this.currentUser.role.permissions;
    } catch(e) {
      this.permissionList = null;
    }
  }

  hasPermission(api, action) {
    if (!this.permissionList) return true;
    return this.permissionList[api] && this.permissionList[api][action] ? true : false;
  }

}