(function(){
  'use strict';

  angular
  .module('ecomapss.services')
  .service('UserService', userService)

  /* @ngIject */
  function userService(StorageService) {
    this.setUserName = setUserName;
    this.getUserName = getUserName;
    this.hasUser = hasUser;
    this.setAvatar = setAvatar;
    this.getAvatar = getAvatar;
    this.validationSteps = validationSteps;

    var keys = {
      username: 'uName',
      avatar: 'uAvatar'
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
  }
})();
