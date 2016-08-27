export function mediumEditor() {
  'ngInject';
  let directive = {
    restrict: 'E',
    scope: {
      exprotEditor: '=editor'
    },
    replace: true,
    template: `
      <div id="medium-editor"></div>
    `,
    link: linkFunc
  }

  return directive;

  function initMedium(ele) {
    // https://github.com/yabwe/medium-editor/blob/master/OPTIONS.md
    return new MediumEditor(ele, {
      activeButtonClass: 'medium-editor-button-active',
      buttonLabels: false,
      contentWindow: window,
      delay: 0,
      disableReturn: false,
      disableDoubleReturn: false,
      disableExtraSpaces: false,
      disableEditing: false,
      elementsContainer: false,
      extensions: {},
      ownerDocument: document,
      spellcheck: false,
      targetBlank: false,
      placeholder: {
        text: '在此输入正文',
        hideOnClick: false
      },
      imageDragging: true,
      toolbar: {
        allowMultiParagraphSelection: true,
        buttons: ['bold', 'italic', 'underline', 'anchor', 'h2', 'h3', 'quote', 'strikethrough', 'pre', 'justifyLeft']
      },
      autoLink: false,
      anchor: {
        // customClassOption: null,
        // customClassOptionText: 'Button',
        linkValidation: false,
        placeholderText: '输入链接',
        targetCheckbox: false,
        targetCheckboxText: '在新窗口打开'
      },
      anchorPreview: {
        hideDelay: 500,
        previewValueSelector: 'a'
      },
      paste: {
        forcePlainText: true,
        cleanPastedHTML: true,
        cleanReplacements: [],
        cleanAttrs: ['class', 'style', 'dir'],
        cleanTags: ['meta', 'style', 'script']
      },
      keyboardCommands: {
        commands: [{
          command: 'bold',
          key: 'b',
          meta: true,
          shift: false
        }, {
          command: 'italic',
          key: 'i',
          meta: true,
          shift: false
        }, {
          command: 'underline', //argument passed to editor.execAction() when key-combination is used
          key: 'u',
          meta: true, //whether the ctrl/meta key has to be active or inactive
          shift: false
        }]
      }
    });
  }

  function linkFunc(scope, ele) {
    //初始化编辑器
    let editor = initMedium(ele);
    //初始化编辑器insert插件

    scope.exprotEditor = {
      getText: () => {
        return $(editor.serialize()['medium-editor'].value).text();
      },
      getHTML: () => {
        return editor.serialize()['medium-editor'].value;
      },
      setHTML: (str) => {
        return editor.setContent(str);
      }
    }

  }

}