(function(){
    'use strict';

    angular
        .module('ecomapss.timeline')
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
