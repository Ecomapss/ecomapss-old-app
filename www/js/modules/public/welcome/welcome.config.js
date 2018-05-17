(function () {
  'use strict';

  angular
  .module('ecomapss.welcome')
  .run(publicRoutes)

  /** @ngInject */
  function publicRoutes(routerHelper, UserService) {
    var otherwise = '/'

    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'welcome',
      config: {
        templateUrl: 'js/modules/public/welcome/welcome.view.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcome',
        url: '/login',
      }
    }];
  }
}());
