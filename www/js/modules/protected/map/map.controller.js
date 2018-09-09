(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MapCtrl', MapCtrl)

    /** @ngInject */
    function MapCtrl($scope, $stateParams,$location, $state, $timeout, $log, leafletData, UserService, LocationsService, AlertService) {
        var vm = this;
        var markers = $stateParams.markers;
        var normalizedMarkers = {};
        var place = null;
        var location = null;
        // Trigger every time enter in this view, but not trigger in first time
        $scope.$on("$ionicView.enter", function (scopes, states) {
            init();
        });

        // Trigger in first time of enter in this view
        init();

        function init() {
            normalizedMarkers = resolveMarkers(markers);

            /**
             * Get saved location, if exists continue, if not, redirect
             * to location route
             */
            location = UserService.getLocation();
            if (location) {
                
                place = LocationsService.getByKey(location)[0];
                /**
                 * Only execute this code if user has selected the location
                 */
                /////////////////////////
                var tiles = {
                    url: 'tiles/' + place.key + '/{z}/{x}/{y}.' + place.ext,
                    options: {
                        attribution: 'All maps &copy; ' + place.attr
                    }
                };

                /**
                * Extend $scope with leaflet directive atributes
                */
                angular.extend($scope, {
                    center: angular.copy(place.loc),
                    tiles: tiles,
                    markers: normalizedMarkers,
                    defaults: {
                        scrollWheelZoom: false
                    }
                });
                ////////////////////////

            } else {
                $state.go('protected.location', {});
            }
            ////////////////////////
        }

        $scope.doInit = function () {
            leafletData.getMap('map1').then(function (map) {
                $scope.map = map;
            });
        }

        function resolveMarkers(markers) {
            var result = {};
            var filtered = markers.filter(function (ele) {
                return !!ele.lat && !!ele.lng;
            })

            if (filtered) {
                filtered.map(function (ele, index) {
                    result[index] = {
                        lat: ele.lat,
                        lng: ele.lng,
                        message: 'Lat: ' + ele.lat + ' Lng: ' + ele.lng
                    }
                })

                return result;
            }

            return [];
        }

        $scope.centerMap = function () {
            var center = LocationsService.getByKey(location)[0].loc;
            console.log(center);

            $scope.center = angular.copy(center);
            $scope.doInit();
        }
    }
}());