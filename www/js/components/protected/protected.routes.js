(function () {
  'use strict';

  angular
    .module('ecomapss.components')
    .run(protectedRoutes)

  /** @ngInject */
  function protectedRoutes(routerHelper, UserService) {
    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [{
      state: 'protected.timeline',
      config: {
        templateUrl: './timeline/timeline.view.html',
        controller: 'TimelineCtrl',
        controllerAs: 'welcome',
        url: '/timeline'
      }
    }];
  }
}());
