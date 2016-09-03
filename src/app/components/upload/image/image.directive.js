class ModalController {
  constructor($log, $scope, $timeout, BASEURL, Upload, Utils, file, options, $mdDialog) {
    'ngInject';
    this.$log = $log;
    this.$scope = $scope;
    this.$timeout = $timeout;
    this.BASEURL = BASEURL;
    this.Upload = Upload;
    this.Utils = Utils;
    this.file = file;
    this.options = options;
    this.progress = 0;
    this.$mdDialog = $mdDialog;
  }

  toastrInvalidFile(invalidFile) {
    switch (invalidFile.$error) {
      case 'maxSize':
        this.Utils.toast('error', `图片超出最大值！(${invalidFile.$errorParam})`);
        break;
      default:
        this.Utils.toast('error', `error:${invalidFile.$error}errorParam:${invalidFile.$errorParam}`);
    }
  }

  selectFile(file, invalidFile) {
    if (invalidFile[0]) {
      this.UtilsInvalidFile(invalidFile[0]);
    }
  }

  upload() {
    let url = `${this.BASEURL}upload/image`;
    let fileUpload;
    if (this.options.crop) {
      fileUpload = this.Upload.upload({
        url: url,
        data: {
          image:this.Upload.dataUrltoBlob(this.croppedDataUrl, this.file.name)
        }
      });
    } else {
      //返回裁剪后的图片上传promise
      if (this.options.resize) {
        //resize后的fileUpload对象拿不到进度条  也不能取消AJAX
        fileUpload = this.Upload.resize(this.file, this.options.resize.width, this.options.resize.height)
          .then(resizedFile => {
            return this.Upload.upload({
              url: url,
              data: {
                image: resizedFile
              }
            });
          });
      } else {
        fileUpload = this.Upload.upload({
          url: url,
          data: {
            image: this.file
          }
        });
      }
    }

    fileUpload.then(response => {
      this.$timeout(() => {
        this.Utils.toast('success', '上传成功!');
        this.$mdDialog.hide(response.data.files);
      });
    }, error => {
      this.$log.error(error);
    }, evt => {
      this.progress = parseInt(100.0 * evt.loaded / evt.total);
    });

    this.$scope.$on('$destroy', () => {
      fileUpload && fileUpload.abort && fileUpload.abort();
    }, fileUpload);

  }

}

export function uploadImage($timeout, $mdDialog, Utils) {
  'ngInject';

  let directive = {
    restrict: 'EA',
    replace: true,
    template: `
			<div layout="column" layout-align="center center" id="upload-priview">
				<a ng-href="{{imagePreview || placeholderUrl}}" target="_blank" ><img ng-src="{{imagePreview || placeholderUrl}}"></a>
        <md-button class="upload-btn md-fab md-mini md-primary" name="image" aria-label="upload button" ngf-select="selectFile($file, $invalidFiles)" accept="image/*" ngf-max-size="options.maxSize">
          <md-icon>cloud_upload</md-icon>
        </md-button>
			</div>
		`,
    scope: {
      image: '=',
      response: '=',
      options: '='
    },
    link: linkFuc
  }

  return directive;

  function linkFuc(scope) {
    var opts = scope.options || {};
    var pOpts = scope.options.placeholder || {};

    scope.uploadButtonText = `上传${pOpts.text || '图片'}`;

    scope.options = {
      crop: opts.crop || false,
      areaType: opts.areaType || 'circle',
      maxSize: opts.maxSize || '2MB',
      resize: opts.resize
    }

    scope.placeholderOpts = {
      size: pOpts.size || '200x200',
      bgcolor: pOpts.bgcolor || '#e3e3e3',
      color: pOpts.color || '#969696',
      text: pOpts.text || 'image',
      fstyle: pOpts.fstyle || 'oblique',
      fweight: pOpts.fweight || 'bold',
      fsize: pOpts.fsize || '40',
      ffamily: pOpts.ffamily || 'consolas'
    }

    scope.$watch('image', newVal => {
      scope.imagePreview = newVal;
    });

    $timeout(() => {
      scope.placeholderUrl = placeholder.getData(scope.placeholderOpts);
    });

    function toastrInvalidFile(invalidFile) {
      switch (invalidFile.$error) {
        case 'maxSize':
          Utils.toast('error', '图片超出最大值！ (<=' + invalidFile.$errorParam + ')');
          break;
        default:
          Utils.toast('error', 'error: ' + invalidFile.$error + 'errorParam: ' + 'invalidFile.$errorParam');
      }
    }

    function openModal(file) {

      $mdDialog.show({
          templateUrl: 'app/components/upload/image/modal.html',
          controller: ModalController,
          controllerAs: 'vm',
          locals: {
            file: file,
            options: scope.options
          }
        })
        .then(files => {
          // files => array
          scope.image = files[0].url;
          scope.response = files;
        });
    }

    scope.selectFile = function(file, invalidFile) {
      if (invalidFile[0]) {
        toastrInvalidFile(invalidFile[0]);
      } else {
        file && openModal(file);
      }
    }

  }

}