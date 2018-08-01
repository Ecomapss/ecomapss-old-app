(function () {
    'use strict';

    angular
        .module('ecomapss.services')
        .service('EntitiesService', EntitiesService)

    /** @ngInject */
    function EntitiesService($http, $q, TimelineService, ecConstants) {
        this.getEntity = getEntity
        this.getByIndex = getByIndex
        let baseUrl = 'json/'
        let local = ""

        /**
         * Get entities by type
         * @author João Willamy
         * @author Matheus Lacerda
         * 
         * @param {Object} filter
         * @param {String} type 
         * @returns {Promise}
         */
        function getEntity(type, filter) {
            return $q(function (resolve, reject) {
                var fetchedData = [];
                local = type

                _getData(type)
                    .then(function (response) {
                        _applyFilter(response, filter).then(function (filteredData) {
                            return resolve(filteredData);
                        })
                    })
                    .catch(function (err) {
                        return reject(err);
                    })
            })

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
                                TimelineService.saveHistory({
                                    date: new Date(),
                                    type,
                                    entity: result
                                })
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
         * @returns {Array<Promise>}
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
                    function (err) {
                        entity.picture = "img/entities/noimage.jpeg"
                        return resolve(entity);
                    })
            })
        }

        /**
         * Method to filter a array
         * @author Matheus Lacerda
         * 
         * @example
         *  _applyFilter(data[] , { limit: 2, where: {string: ''}, offset: {start: 1, end: 5}})
         * 
         * @param {Array} data 
         * @param {Object} filterObject 
         * 
         * @return {Promise} data
         */
        function _applyFilter(data, filterObject) {
            return $q(function (resolve, reject) {
                var oldData = angular.copy(data);
                var currentData = angular.copy(data);
                var newData = [];

                var filters = {
                    offset: function (data, params) {
                        var currentData = data;
                        var response = [];
                        var start = params.start;

                        if (start >= data.lenght){
                            return response;
                        }

                        try {
                            response = angular.copy(data.slice(start, data.length));
                        } catch (err) {
                            return reject(ecConstants.ERRORS.FILTER_OFFSET_FAILED, err);
                        }

                        return response;
                    },
                    limit: function (data, params) {
                        var size = params.size;
                        var response = [];

                        if (size >= data.length) {
                            size = data.length;
                        }

                        try {
                            response = angular.copy(data.slice(0, size));
                        } catch (err) {
                            return reject(ecConstants.ERRORS.FILTER_LIMIT_FAILED, err);   
                        }

                        return response
                    },
                    where: function (data, params) {
                        var string = params.string;

                        return data.filter(function (el) {
                            return el[key].indexOf(string) !== -1
                        })
                    }
                }

                Object.keys(filterObject).forEach(function (key, index) {
                    currentData = angular.copy(filters[key](currentData, filterObject[key]));
                });

                newData = angular.copy(currentData);

                return resolve(newData);
            })
        }
    }
})();