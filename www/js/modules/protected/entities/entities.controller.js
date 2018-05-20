(function(){
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('EntitiesCtrl', EntitiesCtrl)

    /** @ngInject */
    function EntitiesCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste entities');
        }

    }

}());