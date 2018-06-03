(function () {
    'use strict';
  
    angular
      .module('ecomapss.protected')
      .run(protectedRoutes)
  
    /** @ngInject */
    function protectedRoutes(routerHelper, UserService) {
      routerHelper.configureStates(getStates());
    }
  
    function getStates() {
      return [{
        state: 'protected.flora',
        config: {
          templateUrl: 'js/modules/protected/flora/flora.view.html',
          controller: 'FloraCtrl',
          controllerAs: 'flora',
          url: '/protected/flora'
        }
      }];
    }
  }());
  