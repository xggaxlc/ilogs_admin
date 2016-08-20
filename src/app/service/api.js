export class ApiService {
  constructor($http, $q, BASEURL) {
    'ngInject';
    this.$http = $http;
    this.$q = $q;
    this.BASEURL = BASEURL;
    this.timeout = 10000;
  }

  get(api, params = {}, config = {}) {
    config = angular.merge({}, config, {
      timeout: this.timeout
    });
    let route = `${this.BASEURL+ api}`;
    return this.$http.get(route, angular.merge({}, {
        params: params
      }, config))
      .then(res => {
        return res.data;
      });
  }

  post(api, data = {}, config = {}) {
    config = angular.merge({}, config, {
      timeout: this.timeout
    });
    let route = `${this.BASEURL+ api}`;
    return this.$http.post(route, data, config)
      .then(res => {
        return res.data;
      });
  }

  put(api, data = {}, config = {}) {
    config = angular.merge({}, config, {
      timeout: this.timeout
    });
    let route = `${this.BASEURL+ api}`;
    return this.$http.put(route, data, config)
      .then(res => {
        return res.data;
      });
  }

  delete(api, params, config = {}) {
    config = angular.merge({}, config, {
      timeout: this.timeout
    });
    let route = `${this.BASEURL+ api}`;
    return this.$http.delete(route, angular.merge({}, {
        params: params
      }, config))
      .then(res => {
        return res.data;
      });
  }

}