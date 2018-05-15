(function(){
    'use strict';

    angular
        .module('ecomapss.historias')
        .controller('HistoriasCtrl', HistoriasCtrl)

    /** @ngInject */
    function HistoriasCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste Timeline');
        }

    }

}());