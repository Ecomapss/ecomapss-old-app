(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('TimelineCtrl', TimelineCtrl)

    /** @ngInject */
    function TimelineCtrl(I18nService, $scope, $timeout) {
        var vm = this;
        var thisModule = 'timeline';
        vm.itemsIsFetched = false
        vm.thisLocation = I18nService.getLang();

        init();

        $timeout(function () {
            vm.itemsIsFetched = true;
            console.log('fired')
        }, 2500)

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
