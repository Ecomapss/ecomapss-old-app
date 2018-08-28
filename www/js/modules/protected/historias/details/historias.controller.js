(function () {
  'use strict';

  angular
    .module('ecomapss.historias')
    .controller('HistoriaDetailsCtrl', HistoriaDetailsCtrl)

  /** @ngInject */
  function HistoriaDetailsCtrl($state, $rootScope, EntitiesService) {
    var vm = this;

    init();

    function init() {
      console.log('$state.params ->', $state.params);
      getHistoria()
    }

    function getHistoria() {
      if (!$state.params.index && $state.params.id) {
        vm.historia = $rootScope.historia
      } else {
        EntitiesService
          .getByIndex($state.params.index, 'historia')
          .then(function (result) {
            vm.historia = result
          })
      }
    }

  }

}());