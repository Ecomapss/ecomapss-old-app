(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('ErrorService', ErrorService)

    /** @ngInject */
    function ErrorService(ecConstants, I18nService) {
        this.showError = showError;
        var _dictonary = {};


        function init() {
            I18nService.geti18n().then(function (words) {
                var _dictonary = angular.copy(words.errors);
            })
        }

        function showError(errorIdentifier) {
            console.error(_dictonary[errorIdentifier])
        }
    }
})();