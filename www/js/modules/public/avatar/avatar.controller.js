(function(){
  'use strict';

  angular
  .module('ecomapss.avatar')
  .controller('AvatarCtrl', AvatarCtrl)

  /** @ngInject */
  function AvatarCtrl(I18nService){
    var vm = this;
    var thisModule = 'avatar';
    vm.thisLocation = I18nService.getLang();
    vm.user = {};

    init();

    function init(){
      vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
      I18nService.geti18n(vm.thisLocation).then(function (response) {
        vm.translate = response.data[thisModule];
      });
    }
  }
}());
