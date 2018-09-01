(function () {
    'use strict';

    angular
        .module('ecomapss.flora')
        .controller('FloraCtrl', FloraCtrl)

    /** @ngInject */
    function FloraCtrl($scope, $timeout, EntitiesService) {
        var vm = this;
        var defaultOffsetSum = 10;
        var offsetStart = 0;
        var limit = 10

        vm.noMoreItemsAvailable = false;
        vm.floras = []

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
                    key: 'nome_pop',
                    string: filter
                }
            })
        }

    }

}());