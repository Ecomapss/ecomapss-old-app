(function () {
    'use strict';

    angular
        .module('ecomapss.services')
        .service('MapService', MapService)

    /** @ngInject */
    function MapService($http, $rootScope, $cordovaGeolocation, $q) {
        this.wtPosition = wtPosition;

        var watchProps = {
            timeout: 6000,
            enableHighAccuracy: true
        }

        function _enableGPS(params) {
            if (!window.cordova) {
                return $q(function (resolve, reject) {
                    navigator.geolocation.watchPosition(function (position) {
                        return resolve(position);
                    }, function (err) {
                        return reject(err);
                    }, watchProps);
                })
            }
            return $q(function (resolve, reject) {
                $cordovaGeolocation.watchPosition(watchProps).then(null, function (err) {
                    return reject(response);
                }, function (pos) {
                    return resolve(pos);
                })
            })
        }

        /**
         * @author Matheus Lacerda
         * 
         * returns {Pormise}
         */
        function wtPosition() {
            return $q(function (resolve, reject) {
                _enableGPS().then(function (position) {
                    return resolve(position)
                }).catch(function (err) {
                    return reject(err);
                })
            })
        }
    }
})();