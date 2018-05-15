(function(){
    'use strict';

    angular
        .module('ecomapss.flora')
        .controller('FloraCtrl', FloraCtrl)

    /** @ngInject */
    function FloraCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste flora');
        }

    }

}());