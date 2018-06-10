(function(){
  'use strict';

  angular
  .module('ecomapss.welcome')
  .controller('WelcomeCtrl', WelcomeCtrl)

  /** @ngInject */
  function WelcomeCtrl(I18nService, UserService, $state, $ionicSideMenuDelegate,$ionicSlideBoxDelegate){
    var vm = this;
    var thisModule = 'login';
    vm.thisLocation = I18nService.getLang();
    vm.user = {};

    init();

    function init(){
      vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
      console.log(vm.langOptions);
      I18nService.geti18n(vm.thisLocation).then(function (response) {
        vm.translate = response.data[thisModule];
    });
  }

  vm.doLogin = function () {
      UserService.setUserName(vm.user.username);
      $state.go('avatar', {});
  }

}
}());
