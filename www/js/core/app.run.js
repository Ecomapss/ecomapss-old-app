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

      // document.addEventListener('backbutton', function(event){
      //   event.preventDefault();
      //   routerorHelper.setBackButtonEvent(true);
      // });

      $ionicPlatform.registerBackButtonAction(function () {
        if(routerHelper.getLastRootTab()){
          routerHelper.popPage();
          $state.go(routerHelper.getLastRootTab());
        }else{
          navigator.app.exitApp();
        }
      }, 100);

      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
        StatusBar.overlaysWebView(false);
        StatusBar.hide();

        $timeout(function () {
          StatusBar.show();
        }, 3000)


        ionic.Platform.fullScreen();
        StatusBar.backgroundColorByHexString("#6a5acd");
        ionic.Platform.fullScreen(true, true);
      }  
    });
  }
}());
