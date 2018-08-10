(function () {
    'use strict';

    angular
        .module('ecomapss.directives')
        .directive('ecMap', mapDirective);

    /* @ngInject */
    function mapDirective($cordovaGeolocation, $qs, $rootScope, $ionicPlatform, $timeout) {
        var directive = {
            link: link,
            templateUrl: 'js/directives/map/template.html',
            restrict: 'EA'
        };

        var watchProps = {
            timeout: 6000,
            enableHighAccuracy: true
        }

        return directive;

        function link(scope, element, attrs) {
            $ionicPlatform.ready(function () {
                $cordovaGeolocation.watchPosition(watchProps).then(null, function (err) {
                    alert(err.toString());
                }, function (position) {
                    $timeout(function () {
                        scope.posis = position.coords.latitude + " <> " + position.coords.longitude
                    }, 0)
                })
            })
        }
    }

})();