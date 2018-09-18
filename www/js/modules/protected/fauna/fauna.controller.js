(function () {
    'use strict';

    angular
        .module('ecomapss.fauna')
        .controller('FaunaCtrl', FaunaCtrl)

    /** @ngInject */
    function FaunaCtrl($scope, EntitiesService) {
        var vm = this;
        var defaultOffsetSum = 10;
        var offsetStart = 0;
        var limit = 10;

        vm.noMoreItemsAvailable = false;
        vm.faunas = [];

        vm.filter = {
            current: 'ordem',
            options: [
                {
                    name: 'Nome',
                    key: 'ordem'
                }
            ]
        }


        // function getFaunas() {
        //     EntitiesService.getEntity('fauna', {})
        //         .then(function (faunas) {
        //             vm.faunas = faunas
        //         }).catch(function (error) {
        //             vm.faunas = []
        //         })
        // }

        vm.getData = function (filter, fromScroll) {
            if(fromScroll){
                offsetStart += defaultOffsetSum;
                try{
                    filter.notIn = {
                        list: vm.faunas
                    }
                }
                catch(e){}
            }
            
            var searchParams = {};
            
            Object.keys(filter).forEach(function(key){
                searchParams[key] = filter[key];
            });

            searchParams.offset = { start: offsetStart };
            searchParams.limit = { size: limit };

            EntitiesService.getEntity('fauna', searchParams)
                .then(function (response) {
                    if (response.length) {
                        if(fromScroll){
                            vm.faunas = vm.faunas.concat(response);
                        }else{
                            vm.faunas = response;
                            vm.noMoreItemsAvailable = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    } else {
                        // vm.faunas = [];
                        vm.noMoreItemsAvailable = true;
                    }
                })
                .catch(function (err) {
                })
        }

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

        vm.search();

        $scope.navigateTo = function(item){
            EntitiesService.navigateTo(item._id);
        }

        
    }

}());