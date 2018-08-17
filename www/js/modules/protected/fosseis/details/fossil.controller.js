(function () {
  'use strict';

  angular
    .module('ecomapss.historias')
    .controller('FossilDetailsCtrl', FossilDetailsCtrl)

  /** @ngInject */
  function FossilDetailsCtrl($state, $rootScope, EntitiesService) {
    var vm = this;

    init();

    function init() {
      getFossil()
    }

    function getFossil() {
      if (!$state.params.index && $state.params.id) {
        vm.fossil = $rootScope.fossil
      } else {
        EntitiesService
          .getByIndex($state.params.id, 'fossil')
          .then(function (result) {
            vm.fossil = result
          })
      }
    }

  }

}());