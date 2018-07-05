(function () {
    'use strict';

    angular
        .module('ecomapss.services')
        .service('EntitiesService', EntitiesService)

    /** @ngInject */
    function EntitiesService($http, $q) {
        this.getEntity = getEntity
        this.getByIndex = getByIndex
        let baseUrl = 'json/'
        let local = ""

        /**
         * Get entities by type
         * @author João Willamy
         * 
         * @param {String} type 
         * @returns {Promise}
         */
        function getEntity(type) {
            local = type
            switch (type) {
                case 'fauna':
                    return _getData('fauna')
                case 'flora':
                    return _getData('flora')
                case 'fossil':
                    return _getData('fossil')
                default:
            }
        }

        function _getData(local) {
            return $q(function (resolve, reject) {
                $http
                    .get(baseUrl + local + ".json")
                    .then(function (response) {
                        if (response.status < 400) {
                            $q.all(_getImages(response.data.Data)).then(function (result) {
                                return resolve(result);
                            })
                        }
                        else return reject(response);
                    }).catch(function (error) { });
            });
        }

        function getByIndex(index, type) {
            local = type
            return $q(function (resolve, reject) {
                $http
                    .get(baseUrl + local + ".json")
                    .then(function (response) {
                        if (response.status < 400) {
                            _getImage(response.data.Data[index]).then(function (result) {
                                return resolve(result);
                            })
                        }
                        else return reject(response);
                    }).catch(function (error) { });
            });
        }

        /**
         * @param {Array} entities 
         * 
         * @returns {Array of Promise}
         */
        function _getImages(entities) {
            return entities.map(entity => {
                return _getImage(entity)
            })
        }

        function _getImage(entity) {
            return $q(function (resolve, reject) {
                $http.get("img/entities/" + local + "/" + entity._id + ".jpg").then(
                    function () {
                        entity.picture = "img/entities/" + local + "/" + entity._id + ".jpg"
                        return resolve(entity);
                    },
                    function () {
                        entity.picture = "img/entities/noimage.jpeg"
                        return resolve(entity);
                    })
            })
        }
    }
})();