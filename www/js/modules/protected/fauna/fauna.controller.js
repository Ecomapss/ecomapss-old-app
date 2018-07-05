(function () {
    'use strict';

    angular
        .module('ecomapss.fauna')
        .controller('FaunaCtrl', FaunaCtrl)

    /** @ngInject */
    function FaunaCtrl(EntitiesService) {
        var vm = this;

        init();

        function init() {
            getFaunas()
        }

        function getFaunas() {
            EntitiesService.getEntity('fauna')
                .then(function (faunas) {
                    vm.faunas = faunas
                }).catch(function (error) {
                    vm.faunas = []
                })
        }
    }

}());