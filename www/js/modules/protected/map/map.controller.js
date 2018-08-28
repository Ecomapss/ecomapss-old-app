(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MapCtrl', MapCtrl)

    /** @ngInject */
    function MapCtrl($scope, $state, $log, leafletData, UserService, LocationsService) {
        var vm = this;


        $scope.$on('$ionicView.enter', function () {
            init();
        });


        function init() {
            /**
             * Get saved location, if exists continue, if not, redirect
             * to location route
             */
            var place = null;
            var location = UserService.getLocation();
            if (location) {
                place = LocationsService.getByKey(location)[0];
            } else {
                $state.go('protected.location', {});
            }
            /////////////////////////


            /**
             * Only execute this code if user has selected the location
             */

            var tiles = {
                url: 'tiles/' + place.key + '/{z}/{x}/{y}.png',
                options: {
                    attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                }
            };
            /////////////////////////


            console.log(place);
            /**
             * Extend $scope with leaflet directive atributes
             */
            angular.extend($scope, {
                center: place.loc,
                tiles: tiles,
                defaults: {
                    scrollWheelZoom: false
                }
            });

            console.log($scope)
            $scope.doInit();
        }



        $scope.changeTiles = function (tiles) {
            $scope.tiles = tilesDict[tiles];
        };

        $scope.doInit = function () {
            leafletData.getMap('map1').then(function (map) {
                $scope.map = map;
                $log.info(map);
                $log.info(map);
            });
        }
    }
}());