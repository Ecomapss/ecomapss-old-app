(function(){
    'use strict';

    angular
    .module('ecomapss.protected')
    .controller('EntitiesCtrl', EntitiesCtrl)

    /** @ngInject */
    function EntitiesCtrl($ionicSideMenuDelegate,$ionicSlideBoxDelegate, I18nService){
        var vm = this;
        var thisModule = 'entities';
        vm.thisLocation = I18nService.getLang();
        
        init();

        function init(){
          vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
          I18nService.geti18n(vm.thisLocation).then(function (response) {
            vm.translate = response.data[thisModule];
        });
      }
  }

}());