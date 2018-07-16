(function(){
    'use strict';

    angular
        .module('ecomapss')
        .constant('ecConstants',{
            IDENTIFIERS: {
                QR_CODE_IDENTIFIER: '<<'
            },
            ERRORS: {
                CANNOT_SCAN_QRCODE: 'cannotScanQrCode'
            }

        })
}());
