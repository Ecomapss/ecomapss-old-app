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
        resolve: {
          location: function($q, $location, UserService) {
            // var deferred = $q.defer();
            
            if (UserService.getLocation()) {
              console.log('RESOLVED');
              return true
            } else {
              console.log('NOT RESOLVED');              
              $location.url('/protected/location');
              return false
            }

            // return deferred.promise;
          }
        },
        params: {
          markers: []
        },
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
