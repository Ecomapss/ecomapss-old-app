(function(){
    'use strict';

    angular
        .module('ecomapss.map')
        .controller('MapCtrl', MapCtrl)

    /** @ngInject */
    function MapCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste Timeline');
        }

    }

}());