(function(){
    'use strict';

    angular
        .module('ecomapss')
        .constant('ecConstants',{
            IDENTIFIERS: {
                QR_CODE_IDENTIFIER: '<<'
            },
            ERRORS: {
                CANNOT_SCAN_QRCODE: 'cannotScanQrCode',
                HISTORY_NOT_FOUND: 'historyNotFound',
                HISTORIES_NOT_FOUND: 'historiesNotFound',
                FILTER_OFFSET_FAILED: 'filterOffsetError',
                FILTER_LIMIT_FAILED: 'filterLimitFailed',
                FILTER_WHERE_FAILED: 'filterWhereFailed'
            }

        })
}());
