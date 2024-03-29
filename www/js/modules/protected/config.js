(function () {
  'use strict';

  angular
  .module('ecomapss.protected')
  .run(publicRoutes)

  /** @ngInject */
  function publicRoutes(routerHelper, UserService) {
    var otherwise = '/protected/timeline';
    
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'protected',
      config: {
        abstract: true,
        controller: 'MenuCtrl',
        controllerAs: 'menu',
        templateUrl: 'templates/menu.html',
        url: '/protected',
      }
    }];
  }
}());
