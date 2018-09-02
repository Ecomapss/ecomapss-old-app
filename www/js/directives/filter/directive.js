(function () {
    'use strict';

    angular
    .module('ecomapss.directives')
    .directive('ecFilter', filterDirective);

    /* @ngInject */
    function filterDirective($ionicPlatform, $timeout) {
        var directive = {
            scope: {
                filter: '=',
                refresh: '&',
                shouldRefresh: '='
            },
            controller: controller,
            templateUrl: 'js/directives/filter/template.html',
            restrict: 'E'
        };


        return directive;

        function controller($scope, $ionicPopup){
            var originalFilter = angular.copy($scope.filter.current);

            $scope.getCurrentFilterName = function(){
                var filter = $scope.filter.options.filter(function(item){
                    return item.key == $scope.filter.current;
                });
                return filter[0].name;
            }

            $scope.showPopup = function() {

                var myPopup = $ionicPopup.show({
                  templateUrl: 'js/directives/filter/popup.html',
                  title: 'Aplicar Filtro',
                  subTitle: 'Por favor, selecione um filtro para aplicar à sua pesquisa!',
                  scope: $scope,
                  buttons: [
                    { text: 'Cancelar', onTap: function(e) { return false; } },
                    {
                      text: '<b>Aplicar</b>',
                      type: 'button-positive',
                      onTap: function(e) {
                        if($scope.shouldRefresh) {
                            return $scope.refresh()
                        };
                        return true;
                      }
                    }
                  ]
                });
              
                myPopup.then(function(res) {
                  if(res === false){
                      $scope.filter.current = originalFilter;
                  }
                });
              
                // $timeout(function() {
                //    myPopup.close(); //close the popup after 3 seconds for some reason
                // }, 3000);
               };
        }

    }

})();