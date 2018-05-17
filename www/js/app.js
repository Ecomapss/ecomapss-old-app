// Ecomapss App


(function () {
  angular
    .module('ecomapss', [
      'ionic',

      // Modules
      'ecomapss.flora',
      'ecomapss.avatar',
      'ecomapss.fauna',
      'ecomapss.fosseis',
      'ecomapss.historias',
      'ecomapss.map',
      'ecomapss.welcome',
      'ecomapss.timeline',
      'ecomapss.user',


      // Services
      'ecomapss.services',

      // Directives
      'ecomapss.directives'
    ]);
}());
