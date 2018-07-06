(function(){
    'use strict';

    angular
        .module('ecomapss.historias')
        .controller('HistoriasCtrl', HistoriasCtrl)

    /** @ngInject */
    function HistoriasCtrl(EntitiesService){
        var vm = this;
        
        init();

        function init() {
            getHistoria()
        }

        function getHistoria() {
            EntitiesService.getEntity('historia')
                .then(function (historia) {
                    vm.historias = historia
                }).catch(function (error) {
                    vm.historias = []
                })
        }
    }

}());