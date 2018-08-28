(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MapCtrl', MapCtrl)

    /** @ngInject */
    function MapCtrl($scope, $log, leafletData, UserService) {
        var vm = this;

        var tilesDict = {
            opencyclemap: {
                url: "tiles/{z}/{x}/{y}.png",
                options: {
                    attribution: 'All maps &copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, map data &copy; <a href="http://www.openstreetmap.org">OpenStreetMap</a> (<a href="http://www.openstreetmap.org/copyright">ODbL</a>'
                }
            }
        };

        angular.extend($scope, {
            center: {
                lat: -3.74880925,
                lng: -38.48508466,
                zoom: 10
            },
            tiles: tilesDict.opencyclemap,
            defaults: {
                scrollWheelZoom: false
            }
        });

        $info = 'Eu te Amo';
        console.log($info);

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