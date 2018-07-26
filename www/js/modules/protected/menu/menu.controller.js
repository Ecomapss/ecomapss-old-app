(function(){
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MenuCtrl', MenuCtrl)

    /** @ngInject */
    function MenuCtrl(BarcodeService){
        var vm = this;

        init();

        function init(){
        }

        vm.scan = function () {
            BarcodeService.scan({
                showTorchButton : true,
                disableSuccessBeep: true,
                torchOn: true,
            }).then(function (response) {
                alert(response)
            }).catch(function (err) {
                alert(err.toString())
            })
        }
    }

}());
