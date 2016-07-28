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

  function linkFunc(scope, ele) {
    let editor = new MediumEditor(ele, {
      placeholder: {
        text: '在此输入正文!',
        hideOnClick: true
      },
      targetBlank: true,
      disableExtraSpaces: false
    });

    angular.element(ele).mediumInsert({
      editor: editor,
      enabled: true,
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

}