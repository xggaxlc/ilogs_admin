export function mediumEditor($timeout) {
  'ngInject';
  let directive = {
    restrict: 'E',
    scope: true,
    replace: true,
    template: `
      <div id="medium-editor"></div>
    `,
    link: linkFunc
  }

  return directive;

  function linkFunc() {
    let editor = new MediumEditor('#medium-editor', {
      placeholder: {
        text: '在此输入正文!',
        hideOnClick: true
      },
      targetBlank: true,
      disableExtraSpaces: false
    });
  }

}