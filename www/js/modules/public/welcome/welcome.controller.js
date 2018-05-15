(function(){
    'use strict';

    angular
        .module('ecomapss.welcome')
        .controller('WelcomeCtrl', WelcomeCtrl)

    /** @ngInject */
    function WelcomeCtrl(I18nService){
        var vm = this;

        vm.thisLocation = I18nService.getLang();
        vm.translate = I18nService.geti18n().then(function (response) {
            console.log(response);
        });

        init();

        function doLogin() {
            console.log('doing login');
        }


        function init(){
            
        }

    }
}());
