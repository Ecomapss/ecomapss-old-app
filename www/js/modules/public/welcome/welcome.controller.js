(function(){
    'use strict';

    angular
<<<<<<< HEAD:www/js/modules/public/welcome/welcome.controller.js
        .module('ecomapss.welcome')
=======
        .module('ecomapss.timeline')
>>>>>>> 0eed8494da6503a978c55520b1d7df140299d875:www/js/components/public/welcome/welcome.controller.js
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
