(function() {
  'use strict';

  angular
  .module('ecomapss.directives')
  .directive('ecLanguage', directive);

  /* @ngInject */
  function directive() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'js/directives/i18n/template.html',
      scope: {
      },
      link: linkFunc,
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
  }

  /** @ngInject */
  function Controller(I18nService, $ionicModal, $scope, $state, $window) {
    var vm = this;
    var thisModule = 'i18n';
    vm.classFlag = "flag-icon flag--selected ";
    vm.$onInit = onInit;
    vm.thisLocation = I18nService.getLang();

    setLanguage();

    // Angular 1.5+ does not bind attributes until calling $onInit();
    function onInit() {
      vm.languages = I18nService.disponiblesLang();
      vm.classFlag = vm.classFlag.concat(I18nService.getLangOptions()[0].icon);
      $ionicModal.fromTemplateUrl('language-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modal = modal;
      });
      ////////////////
    }


    function setLanguage() {
      I18nService.geti18n(vm.thisLocation).then(function (response) {
        vm.translate = response.data.directives[thisModule];
      });
    }

    vm.selectLang = function(lang) {
      I18nService.setLang(lang);
      I18nService.geti18n(vm.thisLocation).then(function (response) {

        if ( navigator && navigator.splashscreen ) {
          navigator.splashscreen.show();
          $window.location.reload();
          $timeout( function () {
            navigator.splashscreen.hide();
          }, 500 );
        } else {
          $window.location.reload();
        }
        
      })
    }

    vm.openModal = function() {
      vm.modal.show();
    }

    vm.closeModal = function() {
      vm.modal.hide();
    }
  }
})();
