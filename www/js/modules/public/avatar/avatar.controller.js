(function(){
  'use strict';

  angular
  .module('ecomapss.avatar')
  .controller('AvatarCtrl', AvatarCtrl)

  /** @ngInject */
  function AvatarCtrl(I18nService){
    var vm = this;
    var thisModule = 'avatar';
    var avatars = {ext: '.png', max: 6};
    var prefix = '';
    vm.thisLocation = I18nService.getLang();
    vm.user = {};
    vm.avatars = [];

    for (var i = 1; i <= avatars.max; i++) {
      if (i>10) prefix = '0';
      else prefix = '00';
      vm.avatars.push({
        file: prefix + i + avatars.ext, id: prefix+i, marked: false
      });
    }

    init();

    function init(){
      vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
      I18nService.geti18n(vm.thisLocation).then(function (response) {
        vm.translate = response.data[thisModule];
      });
    }

    vm.choose = function(id) {
      vm.avatars.map(function (avatar) {
        if (id == avatar.id) avatar.marked = !avatar.marked;
        else avatar.marked = false;
      })
    }
  }
}());
