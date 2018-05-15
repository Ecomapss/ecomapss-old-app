(function () {
    'use strict';
  
    angular
      .module('ecomapss.flora')
      .run(protectedRoutes)
  
    /** @ngInject */
    function protectedRoutes(routerHelper, UserService) {
      routerHelper.configureStates(getStates());
    }
  
    function getStates() {
      return [{
        state: 'fosseis',
        config: {
          templateUrl: 'js/modules/protected/flora/flora.view.html',
          controller: 'FloraCtrl',
          controllerAs: 'flora',
          url: '/flora'
        }
      }];
    }
  }());
  