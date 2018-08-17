(function () {
  'use strict';

  angular
    .module('ecomapss.historias')
    .run(protectedRoutes)

  /** @ngInject */
  function protectedRoutes(routerHelper, UserService) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'protected.historias',
        config: {
          url: '/historias',
          views: {
            'tab-entities': {
              controller: 'HistoriasCtrl',
              templateUrl: 'js/modules/protected/historias/historias.view.html',
              controllerAs: 'historias',
            }
          }
        }
      }, {
        state: 'protected.details-historias',
        config: {
          url: '/details-historias/:index/:id',
          views: {
            'tab-entities': {
              controller: 'HistoriaDetailsCtrl',
              templateUrl: 'js/modules/protected/historias/details/historias.view.html',
              controllerAs: 'details',
            }
          }
        }
      }];
  }
}());
