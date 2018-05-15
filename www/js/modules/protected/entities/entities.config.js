(function () {
    'use strict';
  
    angular
      .module('ecomapss.entities')
      .run(protectedRoutes)
  
    /** @ngInject */
    function protectedRoutes(routerHelper, UserService) {
      routerHelper.configureStates(getStates());
    }
  
    function getStates() {
      return [{
        state: 'entities',
        config: {
          templateUrl: 'js/modules/protected/entities/entities.view.html',
          controller: 'EntitiesCtrl',
          controllerAs: 'entities',
          url: '/entities'
        }
      }];
    }
  }());
  