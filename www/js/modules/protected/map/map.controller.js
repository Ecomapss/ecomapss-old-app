(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MapCtrl', MapCtrl)

    /** @ngInject */
    function MapCtrl($scope, $state, $log, leafletData, UserService, LocationsService) {
        var vm = this;
        // Trigger every time enter in this view, but not trigger in first time
        $scope.$on("$ionicView.enter", function (scopes, states) {
            init();
        });

        // Trigger in first time of enter in this view
        init();

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
            ////////////////////////
        }

        $scope.doInit = function () {
            leafletData.getMap('map1').then(function (map) {
                $scope.map = map;
                $log.info(map);
                $log.info(map);
            });
        }
    }
}());