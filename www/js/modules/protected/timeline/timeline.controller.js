(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('TimelineCtrl', TimelineCtrl)

    /** @ngInject */
    function TimelineCtrl(I18nService, $scope, $timeout, TimelineService, ecConstants, UserService, $state, EntitiesService, $rootScope) {
        var vm = this;
        var thisModule = 'timeline';
        var histories = [];

        vm.username = UserService.getUserName();
        vm.fetchedHistories = [];
        vm.itemsIsFetched = false
        vm.thisLocation = I18nService.getLang();

        vm.doRefresh = function () {
            histories = TimelineService.getHistories();
            console.log('a', histories);
            if (histories === ecConstants.ERRORS.HISTORIES_NOT_FOUND) {

            } else {
                histories = JSON.parse(histories);
                vm.fetchedHistories = angular.copy(histories);
            }
            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
            }, 1000);
        }

        init();

        $timeout(function () {
            vm.itemsIsFetched = true;
        }, 3500)

        vm.goInHistory = function(item){
            if(!item.id) return;
            EntitiesService.getById(item.id, 'entities')
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
            
        }

        function init() {
            vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
            I18nService.geti18n(vm.thisLocation).then(function (response) {
                vm.translate = response.data[thisModule];
            });

            vm.doRefresh();
        }

    }

}());
