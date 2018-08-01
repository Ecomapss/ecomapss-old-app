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

        vm.getData = function () {
            EntitiesService.getEntity('flora', {
                offset: {
                    start: offsetStart
                },
                limit: {
                    size: limit
                }
            })
                .then(function (response) {
                    if (response.length) {
                        vm.floras = vm.floras.concat(response);
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
    }

}());