(function () {
  'use strict';

  angular
  .module('ecomapss')
  .run(ecomapssRun)

  /** @ngInject */
  function ecomapssRun($ionicPlatform, UserService, $state ,I18nService) {
    if (!I18nService.getLang())
      I18nService.setLang('ptbr');
    if(UserService.hasUser()) {
      console.log("has")
      $state.go('timeline', {});
    }else{
      $state.go('welcome', {});
    }

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  }
}());
