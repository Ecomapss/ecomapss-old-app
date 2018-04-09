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

        var keys = {
            username: 'uName',
        }

        function hasUser() {
            return !!StorageService.getData(keys.username);
        }

        function getUserName() { 
            return StorageService.getData(keys.username);
        }

        function setUserName(name) {
            StorageService.setData(keys.username, name);
        }
    }
})();