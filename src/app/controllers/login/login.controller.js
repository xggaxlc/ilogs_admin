export class LoginController {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }
  submit() {
    this.$state.go('main.home');
  }
}