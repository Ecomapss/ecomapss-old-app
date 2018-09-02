(function () {
    'use strict';

    angular
        .module('ecomapss.flora')
        .controller('FloraCtrl', FloraCtrl)

    /** @ngInject */
    function FloraCtrl($scope, $timeout, EntitiesService, $state, $rootScope) {
        var vm = this;
        var defaultOffsetSum = 10;
        var offsetStart = 0;
        var limit = 10;

        vm.noMoreItemsAvailable = false;
        vm.floras = []

        vm.filter = {
            current: 'nome_pop',
            options: [
                {
                    name: 'Nome Popular',
                    key: 'nome_pop'
                },
                {
                    name: 'Nome Ciêntifico',
                    key: 'nome_cie'
                },
                {
                    name: 'Categoria',
                    key: 'categoria'
                }
            ]
        }
        

        vm.getData = function (filter, fromScroll) {
            
            if(fromScroll){
                offsetStart += defaultOffsetSum;
                try{
                    filter.notIn = {
                        list: vm.floras
                    }
                }
                catch(e){}
            }
            
            var searchParams = {
                ...filter,
                offset: {
                    start: offsetStart
                },
                limit: {
                    size: limit
                }
            }
            

            EntitiesService.getEntity('flora', searchParams)
                .then(function (response) {
                    if (response.length) {
                        if(fromScroll){
                            vm.floras = vm.floras.concat(response);
                        }else{
                            vm.floras = response;
                            // vm.noMoreItemsAvailable = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    } else {
                        // vm.floras = [];
                        vm.noMoreItemsAvailable = true;
                    }
                })
                .catch(function (err) {
                })
        }

        vm.getData();

        vm.search = function(filter, fromScroll){
            if(filter == '' && !fromScroll){
                offsetStart = 0;
            }
            vm.getData({
                where: {
                    key: vm.filter.current,
                    string: filter
                }
            }, fromScroll);
        }

        $scope.teste = function(){
            alert('aa');
        }

        $scope.navigateTo = function(item){
            EntitiesService.navigateTo(item._id);
        }

    }

}());