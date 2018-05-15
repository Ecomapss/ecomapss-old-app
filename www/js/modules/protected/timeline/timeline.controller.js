(function(){
    'use strict';

    angular
        .module('ecomapss.timeline')
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