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
      state: 'protected.fauna',
      config: {
        url: '/fauna',
        views: {
          'tab-entities':{
            controller: 'FaunaCtrl',
            templateUrl: 'js/modules/protected/fauna/fauna.view.html',
            controllerAs: 'fauna',            
          }
        }
      }
    }];
  }
}());
