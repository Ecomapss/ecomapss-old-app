(function () {
  'use strict';

  angular
    .module('ecomapss.flora')
    .controller('FloraDetailsCtrl', FloraDetailsCtrl)

  /** @ngInject */
  function FloraDetailsCtrl($state,$rootScope, EntitiesService) {
    var vm = this;

    init();

    function init() {
      getFlora()
    }

    function getFlora() {
      if (!$state.params.index && $state.params.id) {
        vm.flora = $rootScope.flora
      } else {
        EntitiesService
          .getByIndex($state.params.id, 'flora')
          .then(function (result) {
            vm.flora = result
          })
      }
    }

  }

}());