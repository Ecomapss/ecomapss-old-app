(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('TimelineService', TimelineService)

    /** @ngInject */
    function TimelineService(StorageService, ecConstants) {
        this.saveHistory = saveHistory;
        this.getHistory = getHistory;
        this.getHistories = getHistories;

        var keys = {
            localStorage: 'ecTimeline'
        }

        function saveHistory(history) {
            StorageService.add(keys.localStorage, history);
        }

        function getHistory(index) {
            var history = StorageService.findByIndex(index);
            if (history !== -1) return history;
            return ecConstants.ERRORS.HISTORY_NOT_FOUND;
        }

        function getHistories() {
            var histories = [];
            histories = StorageService.getData(keys.localStorage);
            if (histories) {
                return histories;
            }

            return ecConstants.ERRORS.HISTORIES_NOT_FOUND;
        }
    }
})();