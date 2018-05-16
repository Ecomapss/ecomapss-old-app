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
    this.getLangOptions = getLangOptions;

    var langs = [{
      file: 'ptbr',
      name: 'Português (BR)',
      icon: 'flag-icon-br'
    }, {
      file: 'en',
      name: 'Inglês',
      icon: 'flag-icon-us'
    }];


    var keys = {
      lang: 'uLang',
    }

    function geti18n(location) {
      return new Promise(function (resolve, reject) {
        $http.get('/js/services/i18n/' + location + '.json').then(function (res) {
          return resolve( res );
        }).catch(function ( err ) {
          return reject( err );
        })
      })
    }

    function setLang(lang) {
      StorageService.setData(keys.lang, lang);
    }

    function getLang() {
      // return StorageService.getData(keys.lang);
      return StorageService.getData(keys.lang);
    }

    function getLangOptions() {
      var actualLang = getLang()

      var options = langs.filter(function (lang) {
        if (lang.file == actualLang) return lang;
      });

      return options;
    }

    function disponiblesLang() {
      return langs.slice();
    }
  }





})();
