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
      state: 'protected.entities',
      config: {
        url: '/entities',
        views: {
          'tab-entities': {
            controller: 'EntitiesCtrl',
            templateUrl: 'js/modules/protected/entities/entities.view.html',
            controllerAs: 'entities',
          }
        },
        tabRoot: true
      }
    }];
  }
}());
