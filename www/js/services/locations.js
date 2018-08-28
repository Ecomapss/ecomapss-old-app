(function(){
    'use strict';

    angular
        .module('ecomapss.servoce')
        .service('LocationsService', Locations)

    /* @ngInject */
    function Locations($http) {
        this.getData = getData;

        var _data = [
            {
                name: 'Parque do Cocó',
                image: 'img/locations/001.jpeg',
                key: 'p001',
            },
            {
                name: 'Sitio Fundão',
                image: 'img/locations/002.jpg',
                key: 'p002',            
            },
            {
                name: 'Parque dos Inhamuns',
                image: 'img/locations/003.jpg',
                key: 'p003',   
            }
        ];
        

        function getData() {
            return _data;
         }
    }
})();