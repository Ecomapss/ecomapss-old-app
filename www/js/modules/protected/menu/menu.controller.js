(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MenuCtrl', MenuCtrl)

    /** @ngInject */
    function MenuCtrl($state, BarcodeService, EntitiesService) {
        var vm = this;

        init();

        function init() {
        }

        vm.scan = function () {
            BarcodeService.scan({
                showTorchButton: true,
                disableSuccessBeep: true,
                torchOn: true,
            }).then(function (response) {
                
                EntitiesService.getById($state.params.id, 'entities')
                .then(function (item) {
                    if (item.inseto) {
                        $state.go('protected.entity-details', { id: response })
                        vm.fauna = result
                    } else if (item.fossil) {
                        $state.go('protected.entity-details', { id: response })
                        vm.fossil = result
                    } else if (item.historia) {
                        $state.go('protected.entity-details', { id: response })
                        vm.historia = result
                    } else if ('nome_pop' in item) {
                        $state.go('protected.entity-details', { id: response })
                        vm.flora = result
                    } 
                })

            }).catch(function (err) {
                alert(err.toString())
            })
        }
    }

}());
