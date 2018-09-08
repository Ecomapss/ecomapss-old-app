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

        // vm.goEntiti =function(){
        //     // $state.reload('protected.entities');

        //     $state.transitionTo('protected.entities', null, { reload: false, inherit: false, notify: true });
        // }

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
                        
                        vm.hideBackButton = true;
                    })
                }else{
                    // alert(response)
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
            if(stateName == 'protected.timeline' && $state.current.name == stateName){
               
            }else{
                $state.go(stateName);
            }
            vm.hideBackButton = true;
        }
    }

}());
