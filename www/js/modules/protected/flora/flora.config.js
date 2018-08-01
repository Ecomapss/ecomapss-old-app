(function () {
  'use strict';

  angular
    .module('ecomapss.flora')
    .run(protectedRoutes)

  /** @ngInject */
  function protectedRoutes(routerHelper, UserService) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'protected.flora',
        config: {
          url: '/flora',
          views: {
            'tab-entities': {
              controller: 'FloraCtrl',
              templateUrl: 'js/modules/protected/flora/flora.view.html',
              controllerAs: 'flora',
            }
          }
        }
      }, {
        state: 'protected.details-flora',
        config: {
          url: '/details-flora/:id',
          views: {
            'tab-entities': {
              controller: 'FloraDetailsCtrl',
              templateUrl: 'js/modules/protected/flora/details/flora.view.html',
              controllerAs: 'vm',
            }
          }
        }
      }];
  }
}());
