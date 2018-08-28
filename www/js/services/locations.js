(function(){
    'use strict';

    angular
        .module('ecomapss.services')
        .service('LocationsService', Locations)

    /* @ngInject */
    function Locations($http) {
        this.getData = getData;
        this.getByKey = getByKey;

        var _data = [
            {
                name: 'Parque do Cocó',
                image: 'img/locations/001.jpeg',
                key: 'p001',
                loc: {
                    lat: -3.74880925,
                    lng: -38.48508466,
                    zoom: 10
                }
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

        function getByKey(key) {
            return _data.filter(function(el) {
                return el.key === key;
            })
        }
    }
})();