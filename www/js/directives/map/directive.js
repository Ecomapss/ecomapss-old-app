(function () {
    'use strict';

    angular
    .module('ecomapss.directives')
    .directive('ecMap', mapDirective);

    /* @ngInject */
    function mapDirective($cordovaGeolocation, $q, $rootScope, $ionicPlatform, $timeout) {
        var directive = {
            scope: {
                onCreate: "&"
            },
            link: link,
            templateUrl: 'js/directives/map/template.html',
            restrict: 'EA'
        };

        var watchProps = {
            timeout: 10000,
            enableHighAccuracy: true
        }

        return directive;

        function link(scope, element, attrs) {
            var lat = '-3.749617';
            var long = '-38.485649';


            var mapOptions = {
                center: [lat, long],
                zoom: 15,
                zoomControl: true,
                maxZoom: 18,
                minZoom: 9
            };
            $timeout(function () {
                var map = L.map(element[0], mapOptions);
                L.tileLayer("tiles/{z}/{x}/{y}.png", {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                scope.onCreate({ map: map, L: L });
            }, 0)
        }
    }

})();