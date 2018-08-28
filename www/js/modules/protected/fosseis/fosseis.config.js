(function () {
  'use strict';

  angular
    .module('ecomapss.fosseis')
    .run(protectedRoutes)

  /** @ngInject */
  function protectedRoutes(routerHelper, UserService) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'protected.fosseis',
        config: {
          url: '/fosseis',
          views: {
            'tab-entities': {
              controller: 'FosseisCtrl',
              templateUrl: 'js/modules/protected/fosseis/fosseis.view.html',
              controllerAs: 'fosseis',
            }
          }
        }
      }, {
        state: 'protected.details-fossil',
        config: {
          url: '/details-fossil/:index/:id',
          views: {
            'tab-entities': {
              controller: 'FossilDetailsCtrl',
              templateUrl: 'js/modules/protected/fosseis/details/fossil.view.html',
              controllerAs: 'details',
            }
          }
        }
      }];


  }
}());
