(function () {
  'use strict';

  angular
    .module('ecomapss.fauna')
    .controller('FaunaDetailsCtrl', FaunaDetailsCtrl)

  /** @ngInject */
  function FaunaDetailsCtrl($state, $rootScope, EntitiesService) {
    var vm = this;

    init();

    function init() {
      getFauna()
    }

    function getFauna() {
      if (!$state.params.index && $state.params.id) {
        vm.fauna = $rootScope.fauna
      } else {
        EntitiesService
          .getByIndex($state.params.index, 'fauna')
          .then(function (result) {
            vm.fauna = result
          })
      }
    }

  }

}());