(function () {
    'use strict';

    angular
        .module('ecomapss.fosseis')
        .controller('FosseisCtrl', FosseisCtrl)

    /** @ngInject */
    function FosseisCtrl($scope, $timeout, EntitiesService) {
        var vm = this;
        var defaultOffsetSum = 10;
        var offsetStart = 0;
        var limit = 10;

        vm.noMoreItemsAvailable = false;
        vm.fosseis = []

        vm.filter = {
            current: 'estratigrafia',
            options: [
                {
                    name: 'Estratigrafia',
                    key: 'estratigrafia'
                }
            ]
        }
        

        vm.getData = function (filter, fromScroll) {
            
            if(fromScroll){
                offsetStart += defaultOffsetSum;
                try{
                    filter.notIn = {
                        list: vm.fosseis
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
            

            EntitiesService.getEntity('fossil', searchParams)
                .then(function (response) {
                    if (response.length) {
                        if(fromScroll){
                            vm.fosseis = vm.fosseis.concat(response);
                        }else{
                            vm.fosseis = response;
                            vm.noMoreItemsAvailable = false;
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    } else {
    
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

        $scope.navigateTo = function(item){
            EntitiesService.navigateTo(item._id);
        }

    }

}());