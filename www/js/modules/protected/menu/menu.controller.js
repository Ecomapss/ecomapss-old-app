(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MenuCtrl', MenuCtrl)

    /** @ngInject */
    function MenuCtrl($state, $rootScope, BarcodeService, EntitiesService) {
        var vm = this;

        init();

        function init() {
        }

        vm.goEntiti =function(){
            // $state.reload('protected.entities');

            $state.transitionTo('protected.entities', null, { reload: false, inherit: false, notify: true });
        }

        vm.scan = function () {
            BarcodeService.scan({
                showTorchButton: true,
                disableSuccessBeep: true,
                torchOn: false,
            }).then(function (response) {
                console.log('response ->', response);
                if(response){
                    EntitiesService.getById(response, 'entities')
                    .then(function (item) {
                        console.log('item ->', item);
                        if (item.inseto) {
                            $rootScope.fauna = item
                            console.log('$rootScope.fauna ->', $rootScope.fauna);
                            $state.go('protected.details-fauna', { index:'', id: item._id })
                        } else if (item.fossil) {
                            $rootScope.fossil = item
                            $state.go('protected.details-fossil', { id: item._id })
                        } else if (item.historia) {
                            $rootScope.historia = item
                            $state.go('protected.details-historias', { id: item._id })
                        } else if ('nome_pop' in item) {
                            $rootScope.flora = item
                            $state.go('protected.details-flora', { id: item._id })
                        }
                    })
                }else{
                    alert(response)
                    console.log('response ->', response);
                }
                    
            }).catch(function (err) {
                alert(err.toString())
            })
        }

    }

}());
