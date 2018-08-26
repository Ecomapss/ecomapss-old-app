(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MenuCtrl', MenuCtrl)

    /** @ngInject */
    function MenuCtrl($state, $rootScope, BarcodeService, EntitiesService, routerHelper) {
        var vm = this;
        vm.hideBackButton = false;
        init();

        function init() {
        }

        vm.scan = function () {
            console.log('response ->');
            BarcodeService.scan({
                showTorchButton: true,
                disableSuccessBeep: true,
                torchOn: true,
            }).then(function (response) {
                if(response){
                    EntitiesService.getById(response, 'entities')
                    .then(function (item) {
                        if (item.inseto) {
                            $rootScope.fauna = item
                            $state.go('protected.details-fauna', { id: item._id })
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

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            routerHelper.pushPage(toState);
            if(fromState.tabRoot){
                routerHelper.setLastRootTab(angular.copy(fromState.name));
            }

            if(!toState.tabRoot){
                vm.hideBackButton = false;
            }else{
                vm.hideBackButton = true;
            }

        });

        vm.navigateTo = function(stateName){
            $state.go(stateName);
            vm.hideBackButton = true;
        }
    }

}());
