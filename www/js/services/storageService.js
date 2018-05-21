(function(){
    'use strict';

    angular
    .module('ecomapss.services')
    .service('StorageService', storage)

    /** @ngInject */
    function storage() {
        this.getData = getData;
        this.setData = setData;
        this.clearData = clearData;

        var emStorage = window.localStorage;


        function setData(key, data) {
            emStorage.setItem(key, data);
        }

        function getData(key) { 
            return emStorage[key];
        }

        function clearData() {
            return new Promise(function (resolve, reject) {
                try {
                 emStorage.clear(); 
                 return resolve();
             }catch(e) {
                return reject(e);
            }
        }) 
        }
    }
})();