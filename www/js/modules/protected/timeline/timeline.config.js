(function () {
    'use strict';

    angular
      .module('ecomapss.timeline')
      .run(protectedRoutes)

    /** @ngInject */
    function protectedRoutes(routerHelper, UserService) {
      routerHelper.configureStates(getStates());
    }

    function getStates() {
      return [{
        state: 'timeline',
        config: {
          templateUrl: 'js/modules/protected/timeline/timeline.view.html',
          controller: 'TimelineCtrl',
          controllerAs: 'welcome',
          url: '/protected/timeline',
        }
      }];
    }
  }());
