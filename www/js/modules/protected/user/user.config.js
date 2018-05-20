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
      state: 'protected.user',
     config: {
      url: '/user',
      views: {
        'tab-user':{
          controller: 'UserCtrl',
          templateUrl: 'js/modules/protected/user/user.view.html',
          controllerAs: 'user',            
        }
      }
    }
  }];
}
}());
