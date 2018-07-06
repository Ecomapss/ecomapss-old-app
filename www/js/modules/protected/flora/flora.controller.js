(function(){
    'use strict';

    angular
        .module('ecomapss.flora')
        .controller('FloraCtrl', FloraCtrl)

    /** @ngInject */
    function FloraCtrl($scope,EntitiesService){
        var vm = this;
        
        init();

        function init() {
            getFlora()
        }

        function getFlora() {
            EntitiesService.getEntity('flora')
                .then(function (flora) {
                    vm.floras = flora
                }).catch(function (error) {
                    vm.floras = []
                })
        }
    }

}());