(function(){
  'use strict';

  angular
  .module('ecomapss.services')
  .service('UserService', userService)

  /* @ngIject */
  function userService(StorageService, I18nService,  $state, $window) {
    this.setUserName = setUserName;
    this.getUserName = getUserName;
    this.hasUser = hasUser;
    this.setAvatar = setAvatar;
    this.getAvatar = getAvatar;
    this.validationSteps = validationSteps;
    this.logOut = logOut;
    this.setLocation = setLocation;
    this.getLocation  = getLocation;


    this.avatarsUrl = "img/avatars/";
    this.avatarsExt = ".png";

    var keys = {
      username: 'uName',
      avatar: 'uAvatar',
      location: 'uLocation'
    }

  /**
   * Function to test if all of user attributes is setted
   * response says if the one of the tests failed and the route to navigate
   */
    function validationSteps() {
      var response = {
        failed: false
      };
      var steps = [
        {
          failedToState: 'welcome', func: getUserName
        },
        {
          failedToState: 'avatar', func: getAvatar
        }
      ];

      for (var i = 0; i < steps.length; i++) {
        var test = steps[i];
        var check = test.func();
        if (typeof check == 'undefined') {
          response = {
            failed: true,
            state: test.failedToState
          }
          break;
        }
      }

      return response;

    }

    // Username
    function hasUser() {
      return !!StorageService.getData(keys.username);
    }

    function getUserName() {
      return StorageService.getData(keys.username);
    }

    function setUserName(name) {
      StorageService.setData(keys.username, name);
    }

    // Avatar
    function setAvatar(id) {
      StorageService.setData(keys.avatar, id);
    }

    function getAvatar() {
      return StorageService.getData(keys.avatar);
    }

    function setLocation(key) {
      StorageService.setData(keys.location, key);
    }

    function getLocation() {
      return StorageService.getData(keys.location);
    }

    function logOut() {
      StorageService.clearData().then(function () {
        I18nService.setLang("ptbr");
        $state.go('welcome', {reload: true});
        $window.location.reload();        
      })
    }
  }
})();
