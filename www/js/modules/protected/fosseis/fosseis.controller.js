(function () {
    'use strict';

    angular
        .module('ecomapss.fosseis')
        .controller('FosseisCtrl', FosseisCtrl)

    /** @ngInject */
    function FosseisCtrl($scope, EntitiesService) {
        var vm = this;
        var defaultOffsetSum = 10;
        var offsetStart = 0;
        var limit = 10

        vm.noMoreItemsAvailable = false;
        vm.fosseis = [];

        vm.getData = function () {
            EntitiesService.getEntity('fossil', {
                offset: {
                    start: offsetStart
                },
                limit: {
                    size: limit
                }
            })
                .then(function (response) {
                    if (response.length) {
                        vm.fosseis = vm.fosseis.concat(response);
                        $scope.$broadcast('scroll.infiniteScrollComplete');

                        offsetStart += defaultOffsetSum;
                    } else {
                        vm.noMoreItemsAvailable = true;
                    }
                })
                .catch(function (err) {
                    console.error(err);
                })
        }

        vm.getData();
    }

}());