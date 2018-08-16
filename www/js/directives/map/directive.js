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
            // templateUrl: 'js/directives/map/template.html',
            restrict: 'EA'
        };

        var watchProps = {
            timeout: 10000,
            enableHighAccuracy: true
        }

        return directive;

        function link(scope, element, attrs) {

            $ionicPlatform.ready(function () {
                $cordovaGeolocation.getCurrentPosition(watchProps).then(function (res) {
                    var mapOptions = {
                        center: [res.coords.latitude, res.coords.longitude],
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
                }, function(err) {
                    alert("Error ao recuperar localização, por favor verifique o seu gps está ativado ou se o ecomapss tem as permissões adequadas.")
                })
            })
        }
    }

})();