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
       state: 'protected.map',
       config: {
        url: '/map',
        views: {
          'tab-map':{
            controller: 'MapCtrl',
            templateUrl: 'js/modules/protected/map/map.view.html',
            controllerAs: 'vm',            
          }
        }
      }
    }];
  }

}());
