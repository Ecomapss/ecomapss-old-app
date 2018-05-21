(function(){
    'use strict';

    angular
    .module('ecomapss.protected')
    .controller('UserCtrl', UserCtrl)

    /** @ngInject */
    function UserCtrl(UserService, I18nService){
        var vm = this;
        var thisModule = "user";
        var sharedModule = "shared";
        var preAvatar = UserService.getAvatar();
        var avatarsURL = UserService.avatarsUrl;
        var avatarExt = UserService.avatarsExt;
        vm.username = UserService.getUserName();
        vm.thisLocation = I18nService.getLang();
        vm.shared = {};

        init();

        function init(){
            vm.avatar = avatarsURL + preAvatar + avatarExt;

            vm.langOptions = I18nService.getLangOptions(vm.thisLocation);
            I18nService.geti18n(vm.thisLocation).then(function (response) {
                vm.translate = response.data[thisModule];
                vm.shared = response.data[sharedModule];
            });
        }


        vm.logOut = function () {
            UserService.logOut();
        }

    }

}());