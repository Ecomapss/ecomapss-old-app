(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('TimelineCtrl', TimelineCtrl)

    /** @ngInject */
    function TimelineCtrl(I18nService, $scope, $timeout, $ionicTabsDelegate) {
        var vm = this;
        var thisModule = 'timeline';
        vm.itemsIsFetched = false
        vm.thisLocation = I18nService.getLang();

        $scope.goForward = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1) {
                $ionicTabsDelegate.select(selected + 1);
            }
        }
    
        $scope.goBack = function () {
            var selected = $ionicTabsDelegate.selectedIndex();
            if (selected != -1 && selected != 0) {
                $ionicTabsDelegate.select(selected - 1);
            }
        }
    


        init();

        $timeout(function () {
            vm.itemsIsFetched = true;
            console.log('fired')
        }, 3500)

        function init() {
            vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
            console.log(vm.langOptions);
            I18nService.geti18n(vm.thisLocation).then(function (response) {
                vm.translate = response.data[thisModule];
                console.log(vm.translate)
            });
        }

    }

}());
