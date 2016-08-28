export function filter($state, $stateParams) {
	'ngInject';
	let directive = {
		restrict: 'EA',
		scope: {
			options: '='
		},
		replace: true,
		template: `
			<md-select aria-label="select options" ng-model="filterSelected" class="md-no-underline filter-component" ng-change="filter()">
				<md-option value="{{item.value}}" ng-repeat="item in options.filter">{{item.name}}</md-option>
			</md-select>
		`,
		link: linkFuc
	}

	return directive;

	function linkFuc(scope) {
		let field = scope.options.field;
		scope.filterSelected = $stateParams[field] || '';

		scope.filter = function() {
			let params = {};
			params.page = null;
			params[field] = scope.filterSelected || null;
			$state.go($state.current.name, params);
		}

	}

}