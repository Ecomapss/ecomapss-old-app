(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('LocationCtrl', LocationCtrl)

    /** @ngInject */
    function LocationCtrl($scope, UserService, LocationsService) {
        var vm = this;

        vm.data = LocationsService.getData().slice();

        vm.setLocation = function (key) {
            UserService.setLocation(key);
        }
    }
}());