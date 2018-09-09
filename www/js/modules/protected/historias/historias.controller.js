(function(){
    'use strict';

    angular
        .module('ecomapss.historias')
        .controller('HistoriasCtrl', HistoriasCtrl)

    /** @ngInject */
    function HistoriasCtrl($scope, EntitiesService){
        var vm = this;
        var defaultOffsetSum = 10;
        var offsetStart = 0;
        var limit = 10;

        vm.noMoreItemsAvailable = false;
        vm.historias = [];

        vm.filter = {
            current: 'titulo',
            options: [
                {
                    name: 'Título',
                    key: 'titulo'
                }
            ]
        }

        vm.getData = function (filter, fromScroll) {
            
            if(fromScroll){
                offsetStart += defaultOffsetSum;
                try{
                    filter.notIn = {
                        list: vm.historias
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
            

            EntitiesService.getEntity('historia', searchParams)
                .then(function (response) {
                    console.log('aq', response);
                    if (response.length) {
                        if(fromScroll){
                            vm.historias = vm.historias.concat(response);
                        }else{
                            vm.historias = response;
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
            console.log('aq', item);
            EntitiesService.navigateTo(item._id);
        }

    }

}());