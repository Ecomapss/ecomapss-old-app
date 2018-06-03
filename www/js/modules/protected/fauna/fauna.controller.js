(function(){
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('FaunaCtrl', FaunaCtrl)

    /** @ngInject */
    function FaunaCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste Fauna');
        }

    }

}());