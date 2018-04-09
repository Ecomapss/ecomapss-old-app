(function(){
    'use strict';

    angular
        .module('ecomapss')
        .provider('routerHelper', routerHelperProvider)

    /** @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider){
        this.$get = RouterHelper;

        /** @ngInject */
        function RouterHelper($state){
            var hasOtherwise = false;

            var service = {
                configureStates: configureStates,
                getStates: getStates
            };

            return service;

            //////////////////////////////

            function configureStates(states, otherwisePath){
                states.forEach(state => {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() {
                return $state.get();
            }
        }
    }

}());