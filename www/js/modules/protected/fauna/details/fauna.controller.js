(function () {
    'use strict';

    angular
        .module('ecomapss.fauna')
        .controller('FaunaDetailsCtrl', FaunaDetailsCtrl)

    /** @ngInject */
    function FaunaDetailsCtrl($state, EntitiesService) {
        var vm = this;

        init();

        function init() {
            getFauna()
        }

        function getFauna() {
            EntitiesService
                .getByIndex($state.params.id, 'fauna')
                .then(function (result) {
                    vm.fauna = result
                })
        }

    }

}());