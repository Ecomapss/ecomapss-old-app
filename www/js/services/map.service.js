(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('MapService', MapService)

    /** @ngInject */
    function MapService($http) {
        this.getData = getData;

        function getData() { }
    }
})();