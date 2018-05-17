(function () {
    'use strict';

    angular
      .module('ecomapss.avatar')
      .run(publicRoutes)

    /** @ngInject */
    function publicRoutes(routerHelper, UserService) {
      var otherwise = '/'

      routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
      return [{
        state: 'avatar',
        config: {
          templateUrl: 'js/modules/public/avatar/avatar.view.html',
          controller: 'AvatarCtrl',
          controllerAs: 'avatar',
          url: '/avatar'
        }
      }];
    }
  }());
