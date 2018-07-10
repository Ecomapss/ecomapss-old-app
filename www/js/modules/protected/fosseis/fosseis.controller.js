(function () {
    'use strict';

    angular
        .module('ecomapss.fosseis')
        .controller('FosseisCtrl', FosseisCtrl)

    /** @ngInject */
    function FosseisCtrl(EntitiesService) {
        var vm = this;

        init();

        function init() {
            getFosseis()
        }

        function getFosseis() {
            EntitiesService.getEntity('fossil')
                .then(function (fosseis) {
                    vm.fosseis = fosseis
                }).catch(function (error) {
                    vm.fosseiss = []
                })
        }

    }

}());