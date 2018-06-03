(function(){
    'use strict';

    angular
    .module('ecomapss.protected')
    .controller('EntitiesCtrl', EntitiesCtrl)

    /** @ngInject */
    function EntitiesCtrl($ionicSideMenuDelegate,$ionicSlideBoxDelegate, I18nService, $state){
        var vm = this;
        var thisModule = 'entities';
        var abstract = "protected.";
        var states = {
          'fauna': abstract + 'fauna',
          'flora': abstract + 'flora',
          'historias': abstract + 'historias',
          'fosseis': abstract + 'fosseis'
        }

        vm.thisLocation = I18nService.getLang();
        

        init();

        function init(){
          vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
          I18nService.geti18n(vm.thisLocation).then(function (response) {
            vm.translate = response.data[thisModule];
        });


        vm.go = function(state) {
          $state.go(states[state], {});
        }
      }
  }

}());