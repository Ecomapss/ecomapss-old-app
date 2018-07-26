// Ecomapss App


(function () {
  angular
    .module('ecomapss', [
      'ngCordova',
      'ionic',

      // Modules
      'ecomapss.protected',
      'ecomapss.avatar',
      'ecomapss.welcome',

      // Services
      'ecomapss.services',

      // Directives
      'ecomapss.directives'
    ]);
}());
