(function () {
    'use strict';

    angular
        .module('ecomapss.protected')
        .controller('MenuCtrl', MenuCtrl)

    /** @ngInject */
    function MenuCtrl(BarcodeService, EntitiesService) {
        var vm = this;

        init();

        function init() {
        }

        vm.scan = function () {
            
            // EntitiesService.getById('5a2946e46132ff0a62d50af6', 'entities')
            //     .then(function (item) {
            //         console.log('item ->', item);
            //     })

            // 5a2946e46132ff0a62d50af6
            BarcodeService.scan({
                showTorchButton: true,
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
