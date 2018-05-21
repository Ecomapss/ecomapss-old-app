(function(){
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MenuCtrl', MenuCtrl)

    /** @ngInject */
    function MenuCtrl(){
        var vm = this;

        init();

        function init(){
            console.log('teste Timeline');
        }

    }

}());
