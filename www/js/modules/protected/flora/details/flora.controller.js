(function () {
    'use strict';

    angular
        .module('ecomapss.flora')
        .controller('FloraDetailsCtrl', FloraDetailsCtrl)

    /** @ngInject */
    function FloraDetailsCtrl($state, EntitiesService) {
        var vm = this;

        init();

        function init() {
            getFlora()
        }

        function getFlora() {
            EntitiesService
                .getByIndex($state.params.id, 'flora')
                .then(function (result) {
                    vm.flora = result
                })
        }

    }

}());