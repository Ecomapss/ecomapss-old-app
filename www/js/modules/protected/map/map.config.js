(function () {
    'use strict';
  
    angular
      .module('ecomapss.map')
      .run(protectedRoutes)
  
    /** @ngInject */
    function protectedRoutes(routerHelper, UserService) {
      routerHelper.configureStates(getStates());
    }
  
    function getStates() {
      return [{
        state: 'map',
        config: {
          templateUrl: 'js/modules/protected/map/map.view.html',
          controller: 'MapCtrl',
          controllerAs: 'map',
          url: '/map'
        }
      }];
    }
  }());
  