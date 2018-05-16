(function(){
  'use strict';

  angular
  .module('ecomapss.welcome')
  .controller('WelcomeCtrl', WelcomeCtrl)

  /** @ngInject */
  function WelcomeCtrl(I18nService){
    var vm = this;
    var thisModule = 'login';
    vm.thisLocation = I18nService.getLang();

    init();

    function doLogin() {
      console.log('doing login');
    }

    function init(){
      vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
      console.log(vm.langOptions);
      I18nService.geti18n(vm.thisLocation).then(function (response) {
        vm.translate = response.data[thisModule];
      });
    }

  }
}());
