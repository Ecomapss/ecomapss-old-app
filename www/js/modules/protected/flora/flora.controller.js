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
        var limit = 10

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
        

        vm.getData = function (filter) {
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
                        console.log('response', response);
                        vm.floras = response;
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                        offsetStart += defaultOffsetSum;
                    } else {
                        vm.noMoreItemsAvailable = true;
                    }
                })
                .catch(function (err) {
                })
        }

        vm.getData();

        vm.search = function(filter){
            vm.getData({
                where: {
                    key: vm.filter.current,
                    string: filter
                }
            })
        }

        $scope.teste = function(){
            alert('aa');
        }

        $scope.navigateTo = function(item){
            EntitiesService.navigateTo(item._id);
        }

    }

}());