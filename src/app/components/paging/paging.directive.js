export function paging($state, $stateParams) {
  'ngInject';
  let directive = {
    restrict: 'E',
    scope: {
      options: '=',
      changePage: '&'
    },
    replace: true,
    template: `
    <div> 
      <div
        uib-pagination
        boundary-links="true"
        direction-links="true"
        first-text="<<"
        last-text=">>"
        total-items="options.count"
        items-per-page="options.perPage"
        max-size="options.maxSize"
        ng-model="options.currentPage"
        ng-change="pageChanged()"
        template-url="app/components/paging/paging.html"
      >
      </div>
    </div> 
    `,
    link: linkFunc
  }

  return directive;

  function linkFunc(scope) {
    scope.options.perPage = scope.options.perPage || $stateParams.per_page || 20;
    scope.options.currentPage = scope.options.currentPage || $stateParams.page;
    scope.options.maxSize = scope.options.maxSize || 5;

    scope.pageChanged = function() {
      if (scope.options.autoChange === false) {
        return scope.changePage();
      }
      let params = {};
      params.page = scope.options.currentPage === 1 ? null : scope.options.currentPage;
      $state.go($state.current.name, params);
    }

  }

}