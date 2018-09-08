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
                name: 'Parque Estadual do Cocó',
                image: 'img/locations/001.jpeg',
                key: 'p001',
                ext: 'png',
                loc: {
                    lat: -3.74880925,
                    lng: -38.48508466,
                    zoom: 16
                },
                attr: 'Opencycle Maps'
            },
            {
                name: 'Parque Estadual do Sítio Fundão',
                image: 'img/locations/002.jpg',
                key: 'p002',       
                ext: 'jpg',
                loc: {
                    lat: -7.23266086,
                    lng: -39.43802725,
                    zoom: 16
                },
                attr: 'Bing Maps'     
            },
            {
                name: 'ARIE das Águas Emendadas dos Inhamuns',
                image: 'img/locations/003.jpg',
                key: 'p003',   
                ext: 'jpg',
                loc: {
                    lat: -5.39973789,
                    lng: -40.07294622,
                    zoom: 14
                },
                attr: 'Bing Maps'
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