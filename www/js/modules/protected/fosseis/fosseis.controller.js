(function(){
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('TimelineCtrl', TimelineCtrl)

    /** @ngInject */
    function TimelineCtrl(){
        var vm = this;
        
        init();

        function init(){
            console.log('teste Timeline');
        }

    }

}());