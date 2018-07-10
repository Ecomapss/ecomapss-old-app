(function () {
    'use strict';

    angular
        .module('ecomapss.historias')
        .controller('FossilDetailsCtrl', FossilDetailsCtrl)

    /** @ngInject */
    function FossilDetailsCtrl($state, EntitiesService) {
        var vm = this;

        init();

        function init() {
            getFossil()
        }

        function getFossil() {
            EntitiesService
                .getByIndex($state.params.id, 'fossil')
                .then(function (result) {
                    vm.fossil = result
                })
        }

    }

}());