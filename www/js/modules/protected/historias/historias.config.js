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
      return [{
        state: 'historias',
        config: {
          templateUrl: 'js/modules/protected/historias/historias.view.html',
          controller: 'HistoriasCtrl',
          controllerAs: 'historias',
          url: '/historias'
        }
      }];
    }
  }());
  