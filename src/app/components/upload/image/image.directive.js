export class ModalController {
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

    this.$scope.$on('$destroy', () => {
      try {
        this.fileUpload && this.fileUpload.abort();
      } catch (err) {
        this.$log.log('无法取消上传');
      }
    });

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
    // 重新选择先abort请求
    try {
      this.fileUpload && this.fileUpload.abort();
    } catch (err) {
      this.$log.log('无法取消上传');
    }
    if (invalidFile[0]) {
      this.toastrInvalidFile(invalidFile[0]);
    }
  }

  upload() {

    this.uploading = true;

    this.fileUpload = this.Upload.upload({
      url: `${this.BASEURL}upload/image`,
      data: {
        image: this.options.crop ? this.Upload.dataUrltoBlob(this.croppedDataUrl, this.file.name) : this.file
      }
    });

    this.fileUpload.then(response => {
      this.$timeout(() => {
        this.Utils.toast('success', '上传成功!');
        this.$mdDialog.hide(response.data.files);
      });
    }, error => {
      if (error.status === -1) {
        this.Utils.toast('error', '上传被取消');
      }
    }, evt => {
      this.progress = parseInt(100.0 * evt.loaded / evt.total);
    });

    this.fileUpload.finally(() => {
      this.uploading = false;
    });

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
        <md-button 
          aria-label="upload button"
          class="upload-btn md-fab md-mini md-primary" 
          ngf-select="selectFile($file, $invalidFiles)" 
          accept="image/*" 
          ngf-max-size="options.maxSize"
          ngf-resize="{
            width: options.resize.width,
					  height: options.resize.height,
            quality: .8,
            type: 'image/jpeg',
            centerCrop: true
          }"
          ngf-validate-after-resize="true"
          ngf-resize-if="options.resize && options.resize.width && options.resize.height"
        >
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
      resize: opts.resize //resize.width resize.height
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