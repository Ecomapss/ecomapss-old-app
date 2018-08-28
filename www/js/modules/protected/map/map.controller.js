(function(){
    'use strict';

    angular
    .module('ecomapss.protected')
    .controller('MapCtrl', MapCtrl)

    /** @ngInject */
    function MapCtrl(){
        var vm = this;
        
        angular.extend($scope, {
            defaults: {
                tileLayer: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
                maxZoom: 14,
                path: {
                    weight: 10,
                    color: '#800000',
                    opacity: 1
                }
            }
        });
        
        init();

        function init(){
            console.log('teste Timeline');
        }

    }

}());