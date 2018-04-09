(function(){
    'use strict';

    angular
        .module('ecomapss.components')
        .controller('WelcomeCtrl', WelcomeCtrl)

    /** @ngInject */
    function WelcomeCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste')
        }

    }
}());