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
            var _lastRootTab;
            var _backButton = false;
            var _history = new Array('protected.timeline');
            var service = {
                configureStates: configureStates,
                getStates: getStates,
                getLastRootTab: getLastRootTab,
                setLastRootTab: setLastRootTab,
                setBackButtonEvent: setBackButtonEvent,
                getBackButtonEvent: getBackButtonEvent,
                pushPage: pushPage,
                popPage: popPage,
                historyIsEmpty: historyIsEmpty
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

            function setLastRootTab(name){
                _lastRootTab = name;
            }

            function getLastRootTab(){
                return _history[_history.length -1];
            }

            function setBackButtonEvent(status){
                _backButton = status;
            }
            
            function getBackButtonEvent(){
                return _backButton;
            }

            function pushPage(page){
                var pname = page.name;
                if(_history.indexOf(pname) != -1 || !page.tabRoot) return;
                _history.push(pname);
            }

            function popPage(){
                _history.pop();
            }

            function historyIsEmpty(){
                return _history.length === 0;
            }
        }
    }

}());