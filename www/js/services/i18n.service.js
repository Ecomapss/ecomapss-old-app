(function () {
  'use strict';

  angular
    .module('ecomapss.services')
    .service('I18nService', I18nService)

  /** @ngInject */
  function I18nService($http, StorageService) {
    this.getLang = getLang;
    this.geti18n = geti18n;
    this.disponiblesLang = disponiblesLang;
    this.setLang = setLang;


    var keys = {
      lang: 'uLang',
    }

    function geti18n() {
      return new Promise(function (resolve, reject) {
        $http.get('i18n/' + getLang() + '.json').then(function (res) {
          return resolve( res );
        }).cactch(function ( err ) {
          return reject( err );
        })
      })
    }

    function setLang(lang) {
      StorageService.setData(keys.lang, lang);
    }

    function getLang() {
      // return StorageService.getData(keys.lang);
      return 'ptbr'
    }

    function disponiblesLang() {
      return langs.slice();
    }
  }

  var langs = ['ptbr', 'en'];



})();
