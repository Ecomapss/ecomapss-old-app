(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('TimelineCtrl', TimelineCtrl)

    /** @ngInject */
    function TimelineCtrl(I18nService, $scope, $timeout, TimelineService, ecConstants, UserService) {
        var vm = this;
        var thisModule = 'timeline';
        var histories = [];

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
            }
            $timeout(function () {
                $scope.$broadcast("scroll.refreshComplete");
            }, 1000);
        }

        init();

        $timeout(function () {
            vm.itemsIsFetched = true;
        }, 3500)


        function init() {
            vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
            I18nService.geti18n(vm.thisLocation).then(function (response) {
                vm.translate = response.data[thisModule];
            });

            vm.doRefresh();
        }

    }

}());
