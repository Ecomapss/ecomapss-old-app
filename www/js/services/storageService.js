(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('StorageService', storage)

    /** @ngInject */
    function storage() {
        this.getData = getData;
        this.setData = setData;

        var emStorage = window.localStorage;


        function setData(key, data) {
            emStorage.setItem(key, data);
        }

        function getData(key) { 
            return emStorage[key];
        }
    }
})();