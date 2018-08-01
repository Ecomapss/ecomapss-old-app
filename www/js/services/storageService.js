(function () {
    'use strict';

    angular
        .module('ecomapss.services')
        .service('StorageService', storage)

    /** @ngInject */
    function storage() {
        this.add = add;
        this.findByValue = findByValue;
        this.findByIndex = findByIndex;
        this.getData = getData;
        this.setData = setData;
        this.clearData = clearData;

        var emStorage = window.localStorage;

        /**
         * @author Matheus Lacerda
         * 
         * @param {*} key 
         * @param {*} data 
         */
        function add(key, data) {
            var list = JSON.parse(emStorage.getItem(key)) || [];
            
            list.push(data);

            list = angular.copy(JSON.stringify(list));

            emStorage.setItem(key, list);
        }

        /**
         * @author Matheus Lacerda
         * 
         * @param {*} item 
         * @param {*} key 
         * @param {*} value 
         */
        function findByValue(item, key, value) {
            var list = emStorage.getItem(item);
            if (list && list.length) {
                var results = list.filter(function (el) {
                    return el[key] === value;
                })

                return results;
            }

            return -1;
        }

        /**
         * @author Matheus Lacerda
         * 
         * @param {*} item 
         * @param {*} index 
         */
        function findByIndex(item, index) {
            var list = emStorage.getItem(item);
            if (list.length) {
                return list[index];
            }

            return -1;
        }


        /**
         * @author Matheus Lacerda
         * 
         * @param {*} key 
         * @param {*} data 
         */
        function setData(key, data) {
            emStorage.setItem(key, data);
        }


        /**
         * @author Matheus Lacerda
         * 
         * @param {*} key 
         */
        function getData(key) {
            return emStorage[key];
        }

        /**
         * @author Matheus Lacerda
         */
        function clearData() {
            return new Promise(function (resolve, reject) {
                try {
                    emStorage.clear();
                    return resolve();
                } catch (e) {
                    return reject(e);
                }
            })
        }
    }
})();