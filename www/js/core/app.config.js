(function(){
    'use strict';

    angular
        .module('ecomapss')
        .config(ecomapssConfig)

    /** @ngInject */
    function ecomapssConfig($ionicConfigProvider){
    	$ionicConfigProvider.tabs.position('bottom');
    }


}());
