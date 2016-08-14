export function mediumEditor() {
  // 'ngInject';
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
        text: '在此输入正文!',
        hideOnClick: true
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

  function initMediumInsert(eleObj, editor, enabled = true) {
    eleObj.mediumInsert({
      editor: editor,
      enabled: enabled,
      addons: {
        images: {
          label: '<i class="material-icons">image</i>',
          uploadScript: null,
          deleteScript: 'delete.php',
          deleteMethod: 'POST',
          fileDeleteOptions: {},
          preview: true,
          captions: true,
          captionPlaceholder: '图片标题',
          autoGrid: 3,
          formData: {},
          fileUploadOptions: {
            url: 'upload.php',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
          },
          styles: {
            wide: {
              label: '<i class="material-icons">format_align_justify</i>',
              added: function($el) {},
              removed: function($el) {}
            },
            left: {
              label: '<i class="material-icons">format_align_left</i>'
            },
            right: {
              label: '<i class="material-icons">format_align_right</i>'
            },
            grid: {
              label: '<i class="material-icons">format_align_center</i>'
            }
          },
          actions: {
            remove: {
              label: '<i class="material-icons">close</i>',
              clicked: function($el) {
                var $event = $.Event('keydown');
                $event.which = 8;
                $(document).trigger($event);
              }
            }
          },
          messages: {
            acceptFileTypesError: '不支持此格式的图片！',
            maxFileSizeError: '图片太大！'
          },
          uploadCompleted: function($el, data) {}
        },
        embeds: {
          label: '<span class="material-icons">movie</span>',
          placeholder: '粘贴视频地址，然后enter',
          captions: true,
          captionPlaceholder: '视频标题',
          // oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1',
          styles: {
            wide: {
              label: '<i class="material-icons">format_align_justify</i>',
              added: function($el) {},
              removed: function($el) {}
            },
            left: {
              label: '<i class="material-icons">format_align_left</i>'
            },
            right: {
              label: '<i class="material-icons">format_align_right</i>'
            }
          },
          actions: {
            remove: {
              label: '<i class="material-icons">close</i>',
              clicked: function($el) {
                var $event = $.Event('keydown');

                $event.which = 8;
                $(document).trigger($event);
              }
            }
          }
        }
      }
    });
  }

  function linkFunc(scope, ele) {
    //初始化编辑器
    let editor = initMedium(ele);
    //初始化编辑器insert插件
    initMediumInsert(angular.element(ele), editor);

    scope.exprotEditor = {
      getHTML: () => {
        return editor.serialize()['medium-editor'].value;
      },
      setHTML: (str) => {
        return editor.setContent(str);
      }
    }

  }

}