export function editorMd($timeout) {
  'ngInject';
  let directive = {
    restrict: 'E',
    scope: true,
    template: `
      <div id="editormd">
        <textarea style="display:none;">### Hello Editor.md !</textarea>
      </div>
    `,
    link: linkFunc
  }

  return directive;

  function linkFunc(scope) {
    $timeout(() => {
      let editor = editormd({
        id: 'editormd',
        path: 'assets/lib/editor.md/lib/'
      });
    });
  }

}