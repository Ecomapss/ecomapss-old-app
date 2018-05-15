(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('BarcodeService', BarcodeService)

    /** @ngInject */
    function BarcodeService($http) {
        this.getData = getData;

        function getData() { }
    }
})();