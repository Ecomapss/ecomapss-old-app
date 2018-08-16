(function () {
  'use strict';

  angular
  .module('ecomapss')
  .run(ecomapssRun)

  /** @ngInject */
  function ecomapssRun($ionicPlatform, UserService, $state, I18nService, $timeout, routerHelper) {
    if (!I18nService.getLang())
      I18nService.setLang('ptbr');

    var tests = UserService.validationSteps();
    if (tests.failed) {
      $state.go(tests.state, {});
    } else {
      $state.go('protected.timeline', {
        reload: true
      });
    }

    ///////////////////////////////////////

    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(false);
        StatusBar.hide();

        $timeout(function () {
          StatusBar.show();
        }, 3000)

        if (ionic.Platform.isAndroid()) {
          ionic.Platform.fullScreen();
          StatusBar.backgroundColorByHexString("#6a5acd");
        } else {
          StatusBar.styleLightContent();
        }
        ionic.Platform.fullScreen(true, true);
      }  
    });
  }
}());
