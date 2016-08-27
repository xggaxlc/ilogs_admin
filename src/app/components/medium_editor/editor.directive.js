export function mediumEditor(BASEURL, $localStorage, $sessionStorage, ApiService, Utils) {
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
          // $ele, data
          uploadCompleted: function() {
            Utils.toast('success', '上传图片成功!');
          },
          // uploadErrors, data
          uploadFailed: function(uploadErrors) {
            Utils.toast('error', uploadErrors)
          },
          label: '<md-icon class="material-icons">image</md-icon>',
          deleteScript: null,
          preview: true,
          captions: true,
          captionPlaceholder: '图片标题',
          autoGrid: 2,
          fileUploadOptions: {
            headers: {
              token: $localStorage.token || $sessionStorage.token
            },
            url: `${BASEURL}upload/image`,
            type: 'POST',
            paramName: 'image',
            dataType: 'json',
            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
            // 最大500K
            maxFileSize: 500 * 1024
          },
          styles: {
            wide: {
              label: '<i class="material-icons">format_align_justify</i>'
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
              clicked: function($ele) {
                let fileName = $ele.attr('src').split('/').pop();
                ApiService.delete(`upload/${fileName}`)
                  .then(res => {
                    Utils.toast('success', res.message);
                  })
                  .finally(() => {
                    $ele.remove();
                  });
              }
            }
          },
          messages: {
            acceptFileTypesError: '不支持此格式的图片！',
            maxFileSizeError: '图片太大！'
          }
        },
        embeds: {
          label: '<md-icon class="material-icons">movie</md-icon>',
          placeholder: '粘贴视频地址，然后enter',
          captions: true,
          captionPlaceholder: '视频标题',
          // oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1',
          styles: {
            wide: {
              label: '<i class="material-icons">format_align_justify</i>'
            },
            left: {
              label: '<i class="material-icons">format_align_left</i>'
            },
            right: {
              label: '<i class="material-icons">format_align_right</i>'
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