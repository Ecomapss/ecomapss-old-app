(function () {
  'use strict';

  angular
    .module('ecomapss')
    .config(ecomapssConfig)

  /** @ngInject */
  function ecomapssConfig($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    if (ionic.Platform.isAndroid()) {
      $ionicConfigProvider.scrolling.jsScrolling(false);
      $ionicConfigProvider.views.maxCache(5);
    }
  }


}());
