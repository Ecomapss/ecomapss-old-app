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
       state: 'protected.location',
       config: {
        url: '/location',
        views: {
          'tab-map':{
            controller: 'LocationCtrl',
            templateUrl: 'js/modules/protected/location/location.view.html',
            controllerAs: 'vm',            
          }
        }
      }
    }];
  }

}());
