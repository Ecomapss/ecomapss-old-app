(function () {
  'use strict';

  angular
    .module('ecomapss')
    .run(ecomapssRoutes)

  /* @ngInject */
  function ecomapssRoutes(routerHelper, UserService) {
    var otherwise = ''

    if (UserService.hasUser())
      otherwise = '/protected/timeline';
    else
      otherwise = '/public/welcome'

    routerHelper.configureStates(getStates(), otherwise);
  }

  function getStates() {
    return [{
        state: 'protected',
        config: {
          abstract: true,
          url: '/protected'
        }
      },
      {
        state: 'public',
        config: {
          abstract: true,
          url: '/public'
        }
      }
    ];
  }

}());
