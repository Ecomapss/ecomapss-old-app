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
      state: 'protected.fauna',
      config: {
        url: '/fauna',
        views: {
          'tab-entities': {
            controller: 'FaunaCtrl',
            templateUrl: 'js/modules/protected/fauna/fauna.view.html',
            controllerAs: 'fauna',
          }
        }
      }
    },
    {
      state: 'protected.details-fauna',
      config: {
        url: '/details-fauna/:id',
        views: {
          'tab-entities': {
            controller: 'FaunaDetailsCtrl',
            templateUrl: 'js/modules/protected/fauna/details/fauna.view.html',
            controllerAs: 'details',
          }
        }
      }
    }
    ];
  }
}());
