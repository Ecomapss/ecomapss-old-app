// Ecomapss App


(function () {
  angular
    .module('ecomapss', [
      'ngCordova',
      'ionic',
      
      'nemLogging',
      'leaflet-directive',

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
