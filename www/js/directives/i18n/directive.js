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
  function Controller(I18nService, $ionicModal, $scope) {
    var vm = this;
    vm.classFlag = "flag-icon ";
    vm.$onInit = onInit;

    // Angular 1.5+ does not bind attributes until calling $onInit();
    function onInit() {
      vm.classFlag = vm.classFlag.concat(I18nService.getLangOptions()[0].icon);
      $ionicModal.fromTemplateUrl('my-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        vm.modal = modal;
      });
    }

    vm.openModal = function() {
      vm.modal.show();
    }

    vm.closeModal = function() {
      vm.modal.hide();
    }
  }
})();
