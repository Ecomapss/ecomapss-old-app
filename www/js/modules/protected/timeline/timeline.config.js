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
      state: 'protected.timeline',
      config: {
        url: '/timeline',
        views: {
          'tab-timeline':{
            controller: 'TimelineCtrl',
            templateUrl: 'js/modules/protected/timeline/timeline.view.html',
            controllerAs: 'vm',            
          }
        },
        tabRoot: true
      }
    }];
  }
}());
