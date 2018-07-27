(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('TimelineService', TimelineService)

    /** @ngInject */
    function TimelineService(StorageService, ecConstants) {
        this.saveHistory = saveHistory;
        this.getHistory = getHistory;

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
    }
})();