import {
  ModalController
} from '../upload/image/image.directive';
export function editorMd($timeout, Utils, $mdDialog, $rootScope, $ocLazyLoad) {
  'ngInject';
  let directive = {
    restrict: 'E',
    scope: {
      editor: '=',
      markdown: '='
    },
    template: `
      <div class="editor-wrap">
        <input 
          type="hidden" 
          id="upload-image-btn-js" 
          ngf-select="selectFile($file, $invalidFiles)" 
          accept="image/*" 
          ngf-max-size="uploadImageOptions.maxSize"
           ngf-resize="{
            width: uploadImageOptions.resize.width,
					  height: uploadImageOptions.resize.height,
            quality: .8,
            type: 'image/jpeg',
            centerCrop: true
          }"
          ngf-validate-after-resize="false"
          ngf-resize-if="uploadImageOptions.resize && uploadImageOptions.resize.width && uploadImageOptions.resize.height"
        >
        <div id="editormd"></div>
      </div>
    `,
    replace: true,
    link: linkFunc
  }

  return directive;

  function linkFunc(scope) {
    Utils.showLoading();
    $ocLazyLoad.load([
        'assets/lib/editor.md/css/editormd.min.css',
        'assets/lib/editor.md/editormd.min.js'
      ])
      .then(() => {
        initEditor();
      })
      .finally(() => {
        Utils.hideLoading();
      });

    // 图片上传配置
    scope.uploadImageOptions = {
      maxSize: '5MB',
      crop: false,
      resize: {
        width: 800,
        height: 800
      }
    }

    scope.selectFile = function(file, invalidFile) {
      if (invalidFile[0]) {
        toastrInvalidFile(invalidFile[0]);
      } else {
        file && openModal(file);
      }
    }

    // 销毁事件监听
    scope.$on('$destroy', () => {
      destroyUploadEvent();
    });

    function destroyUploadEvent() {
      try {
        scope.imageUploadListener();
        scope.imageUploadListener = null;
      } catch (e) {
        scope.imageUploadListener = null;
      }
    }

    function toastrInvalidFile(invalidFile) {
      switch (invalidFile.$error) {
        case 'maxSize':
          Utils.toast('error', '图片超出最大值！ (<=' + invalidFile.$errorParam + ')');
          break;
        default:
          Utils.toast('error', 'error: ' + invalidFile.$error + 'errorParam: ' + 'invalidFile.$errorParam');
      }
    }

    function initEditor() {
      scope.editor = editormd({
        id: 'editormd',
        path: 'assets/lib/editor.md/lib/',
        watch: true,
        lineNumbers: true,
        htmlDecode: 'style,script,iframe',
        emoji: true,
        taskList: true,
        tocm: false, // Using [TOCM]
        tex: true, // 开启科学公式TeX语言支持，默认关闭
        flowChart: true, // 开启流程图支持，默认关闭
        sequenceDiagram: true, // 开启时序/序列图支持，默认关闭,
        imageUpload: false, //使用自定义上传
        saveHTMLToTextarea: true,
        toolbarIcons: () => {
          return ["undo", "redo", "|",
            "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
            "h1", "h2", "h3", "h4", "h5", "h6", "|",
            "list-ul", "list-ol", "hr", "|",
            "uploadImage", "insertImage", "|",
            "link", "reference-link", "code", "preformatted-text", "code-block", "table", "datetime", "emoji", "html-entities", "pagebreak", "|",
            "goto-line", "watch", "preview", "clear", "search", "|",
            "help", "info"
          ]
        },
        toolbarIconsClass: {
          uploadImage: 'fa-upload',
          insertImage: 'fa-image'
        },
        lang: {
          toolbar: {
            uploadImage: '上传图片',
            insertImage: '插入网络图片'
          }
        },
        toolbarHandlers: {

          /**
           * @param {Object}      cm         CodeMirror对象
           * @param {Object}      icon       图标按钮jQuery元素对象
           * @param {Object}      cursor     CodeMirror的光标对象，可获取光标所在行和位置
           * @param {String}      selection  编辑器选中的文本
           */

          // 上传图片
          uploadImage: (cm) => {
            $('#upload-image-btn-js').click();
            addImageToEditor(cm);
          },
          // 插入图片
          insertImage: (cm) => {
            let confirm = $mdDialog.prompt()
              .title('插入网络图片')
              .htmlContent(`<p class="margin-top-16 min-width-400">请输入完整的 <strong class="red">图片地址</strong></p>`)
              .placeholder('图片地址 http://')
              .ariaLabel('image url')
              .ok('插入图片')
              .cancel('取消');

            $mdDialog.show(confirm)
              .then(imageUrl => {
                if (imageUrl) {
                  cm.replaceSelection("![" + '图片' + "](" + imageUrl + ")");
                }
              });
          }
        },
        onload: () => {
          if (scope.markdown) {
            scope.editor.setMarkdown(scope.markdown);
          }
        }
      });
    }

    function openModal(file) {
      $mdDialog.show({
          templateUrl: 'app/components/upload/image/modal.html',
          controller: ModalController,
          controllerAs: 'vm',
          locals: {
            file: file,
            options: scope.uploadImageOptions
          }
        })
        .then(files => {
          // files => array
          scope.$emit('event:editorUploadImageSuccess', files[0].url);
        });
    }

    function addImageToEditor(cm) {
      // 只监听一次
      destroyUploadEvent();
      scope.imageUploadListener = $rootScope.$on('event:editorUploadImageSuccess', (ev, imageUrl) => {
        cm.replaceSelection("![" + '图片' + "](" + imageUrl + ")");
      });
    }

  }

}