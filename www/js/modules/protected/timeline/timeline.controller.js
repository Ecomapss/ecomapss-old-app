(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('TimelineCtrl', TimelineCtrl)

    /** @ngInject */
    function TimelineCtrl(I18nService,$ionicScrollDelegate, $scope, $timeout, TimelineService, ecConstants, UserService, $state, EntitiesService, $rootScope) {
        var vm = this;
        var thisModule = 'timeline';
        var histories = [];

        vm.scrolled = false;

        vm.username = UserService.getUserName();
        vm.fetchedHistories = [];
        vm.itemsIsFetched = false
        vm.thisLocation = I18nService.getLang();

        vm.doRefresh = function () {
            histories = TimelineService.getHistories();
            if (histories === ecConstants.ERRORS.HISTORIES_NOT_FOUND) {

            } else {
                histories = JSON.parse(histories);
                vm.fetchedHistories = angular.copy(histories);
                vm.fetchedHistories.reverse();
            }
            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
            }, 1000);
        }
        $scope.$on('$ionicView.enter', function() {
            init();
        });

        $timeout(function () {
            vm.itemsIsFetched = true;
        }, 1500)

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

        vm.getScrollPosition = function() {
            var currentTop = $ionicScrollDelegate.getScrollPosition().top;
            var header = angular.element(document.getElementById('header-timeline'));
            var timeline = angular.element(document.getElementById('timeline-container'));

            if (currentTop > 50) {
                $timeout(function () {
                    vm.scrolled = true;

                    header.css({'height': '90px'});
                    timeline.css('top', '100px');
                }, 0);
            } else {
                $timeout(function () {
                    vm.scrolled = false;
                    
                    header.css({'height': '142px'});
                    timeline.css('top', '160px');
                }, 0);
            }
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
