(function () {
    'use strict';
  
    angular
      .module('ecomapss.fauna')
      .run(protectedRoutes)
  
    /** @ngInject */
    function protectedRoutes(routerHelper, UserService) {
      routerHelper.configureStates(getStates());
    }
  
    function getStates() {
      return [{
        state: 'fauna',
        config: {
          templateUrl: 'js/modules/protected/fauna/fauna.view.html',
          controller: 'FaunaCtrl',
          controllerAs: 'fauna',
          url: '/fauna'
        }
      }];
    }
  }());
  