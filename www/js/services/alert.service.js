(function () {
    'use strict';

    angular
        .module('ecomapss.services')
        .service('AlertService', AlertService)

    /* @ngInject */
    function AlertService($ionicPopup) {
        this.success = success;
        this.warning = warning;
        this.error = error;


        function success(props) {
            $ionicPopup.alert({
                title: props.title,
                cssClass: 'ec-success-popup'
            });
        }

        function warning(props) {
            $ionicPopup.alert({
                title: props.title,
                cssClass: 'ec-warning-popup'
            });
        }

        function error(props) {
            $ionicPopup.alert({
                title: props.title,
                cssClass: 'ec-error-popup'
            });
        }
    }
})();