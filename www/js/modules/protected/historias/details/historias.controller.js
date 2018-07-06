(function () {
    'use strict';

    angular
        .module('ecomapss.historias')
        .controller('HistoriaDetailsCtrl', HistoriaDetailsCtrl)

    /** @ngInject */
    function HistoriaDetailsCtrl($state, EntitiesService) {
        var vm = this;

        init();

        function init() {
            getHistoria()
        }

        function getHistoria() {
            EntitiesService
                .getByIndex($state.params.id, 'historia')
                .then(function (result) {
                    vm.historia = result
                })
        }

    }

}());