(function(){
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('UserCtrl', UserCtrl)

    /** @ngInject */
    function UserCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste Timeline');
        }

    }

}());