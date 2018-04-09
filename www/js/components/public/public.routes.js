(function () {
  'use strict';

  angular
    .module('ecomapss.components')
    .run(publicRoutes)

  /** @ngInject */
  function publicRoutes(routerHelper, UserService) {
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [{
      state: 'public.welcome',
      config: {
        templateUrl: 'js/components/public/welcome/welcome.view.html',
        controller: 'WelcomeCtrl',
        controllerAs: 'welcome',
        url: '/welcome'
      }
    }];
  }
}());
