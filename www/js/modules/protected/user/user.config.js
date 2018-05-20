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
        state: 'user',
        config: {
          templateUrl: 'js/modules/protected/user/user.view.html',
          controller: 'UserCtrl',
          controllerAs: 'user',
          url: '/protected/user'
        }
      }];
    }
  }());
  