(function () {
  'use strict';

  angular
    .module('ecomapss.services')
    .service('EntitiesService', EntitiesService)

  /** @ngInject */
  function EntitiesService($http, $q, TimelineService, ecConstants, $rootScope, $state) {
    this.getEntity = getEntity
    this.getByIndex = getByIndex
    this.getById = getById
    this.navigateTo = navigateTo
    let baseUrl = 'json/'
    let local = ""

    /**
     * Get entities by type
     * @author João Willamy
     * @author Matheus Lacerda
     * 
     * @param {Object} filter
     * @param {String} type 
     * @returns {Promise}
     */
    function getEntity(type, filter) {
      return $q(function (resolve, reject) {
        var fetchedData = [];
        local = type

        _getData(type)
          .then(function (response) {
            _applyFilter(response, filter).then(function (filteredData) {
              return resolve(filteredData);
            })
          })
          .catch(function (err) {
            return reject(err);
          })
      })

    }

    function _getData(local) {

      return $q(function (resolve, reject) {
        $http
          .get(baseUrl + local + ".json")
          .then(function (response) {
            if (response.status < 400) {
              $q.all(_getImages(response.data.Data, true)).then(function (result) {
                return resolve(result);
              })
            }
            else return reject(response);
          }).catch(function (error) { });
      });
    }

    function getByIndex(index, type) {
      local = type
      console.log('index, type ->', index, type);
      return $q(function (resolve, reject) {
        $http
          .get(baseUrl + local + ".json")
          .then(function (response) {
            if (response.status < 400) {
              _getImage(response.data.Data[index]).then(function (result) {
                console.log('result', result);
                return resolve(result);
              })
            }
            else return reject(response);
          }).catch(function (error) { });
      });
    }

    function getById(id, type) {
      local = type
      return $q(function (resolve, reject) {
        $http
          .get(baseUrl + local + ".json")
          .then(function (response) {
            if (response.status < 400) {
              var entity = response.data.Data.filter(function (item) {
                return item._id == id
              })[0]
              if (entity.inseto) {
                local = 'fauna'
              } else if (entity.fossil) {
                local = 'fossil'
              } else if (entity.historia) {
                local = 'historia'
              } else if ('nome_pop' in entity) {
                local = 'flora'
              }
              var type_name = {
                fauna: 'Fauna',
                fossil: 'Fossil',
                historia: 'História',
                flora: 'Flora'
              }
              console.log(entity);
              TimelineService.saveHistory({
                date: new Date(),
                id: entity._id,
                type: type_name[local],
                info: entity.nome_pop || entity.titulo || entity.ordem || entity.designacao,
                sub_info: entity.nome_cie
              })
              console.log('entity ->', entity);
              _getImage(entity).then(function (result) {
                // TimelineService.saveHistory({
                //   date: new Date(),
                //   id: result.id,
                //   type,
                //   info: result.nome_pop || result.filo || result.idade || result.titulo,
                //   sub_info: result.nome_cie || result.reino || result.designacao || result.localidade
                // })
                console.log('result ->', result);
                return resolve(result);
              })
            }
            else return reject(response);
          }).catch(function (error) { });
      });
    }
    /**
     * @param {Array} entities 
     * 
     * @returns {Array<Promise>}
     */
    function _getImages(entities, isList = false) {
      return entities.map(entity => {
        return _getImage(entity, isList)
      })
    }

    function _getImage(entity, isList = false) {
      return $q(function (resolve, reject) {
        var picture
        isList ? picture = "img/entities/" + local + "/" + entity._id + ".thumbnail" : picture = "img/entities/" + local + "/" + entity._id + ".jpg"  
        $http.get(picture).then(
          function () {
            entity.picture = picture
            return resolve(entity);
          },
          function (err) {
            entity.hide = true 
            entity.picture = "img/entities/noimage.jpeg"
            return resolve(entity);
          })
      })
    }

    function navigateTo(item_id){
      getById(item_id, 'entities')
        .then(function(item){
          if (item.inseto) {
            $rootScope.fauna = item
            $state.go('protected.details-fauna', { index:'', id: item._id })
        } else if (item.fossil) {
            $rootScope.fossil = item
            $state.go('protected.details-fossil', { id: item._id })
        } else if (item.historia) {
            $rootScope.historia = item
            $state.go('protected.details-historias', { id: item._id })
        } else if ('nome_pop' in item) {
            $rootScope.flora = item
            $state.go('protected.details-flora', { id: item._id })
        }
        })
        .catch(function(){

        });
    }

    function _unaccent(str){
      
      if(!str) return '';

      var chars = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
      var regexs =[
          /[\300-\306]/g, /[\340-\346]/g, /[\310-\313]/g, /[\350-\353]/g, /[\314-\317]/g, /[\354-\357]/g, /[\322-\330]/g, /[\362-\370]/g, /[\331-\334]/g, /[\371-\374]/g, /[\321]/g, /[\361]/g, /[\307]/g, /[\347]/g
      ];

      for (var i = 0; i < regexs.length; i++){
          str = str.replace(regexs[i],chars[i]);
      }

      return str.toLowerCase();
    }


    function resolveFilters(filters, filterObject, currentData, callback){
      var keys = Object.keys(filterObject);
      if(keys.length == 0){
        return callback(currentData);
      }
      currentData = filters[keys[0]](currentData, filterObject[keys[0]]);
      var newFilters = {};
      keys.shift();
      keys.forEach(function(key){
        newFilters[key] = filterObject[key];
      });

      resolveFilters(filters, newFilters, currentData, callback);

    }

    function getListTotalItems(array){
      return [...array].length;
    }

    /**
     * Method to filter a array
     * @author Matheus Lacerda
     * 
     * @example
     *  _applyFilter(data[] , { limit: 2, where: {string: ''}, offset: {start: 1, end: 5}})
     * 
     * @param {Array} data 
     * @param {Object} filterObject 
     * 
     * @return {Promise} data
     */
    function _applyFilter(data, filterObject) {
      return $q(function (resolve, reject) {
        var oldData = angular.copy(data);
        var currentData = angular.copy(data);
        var newData = [];

        var filters = {
          offset: function (data, params) {
            var currentData = data;
            var response = [];
            var start = params.start;
            var end = getListTotalItems(data);
            
            // return data;
            if (start > end) {
              return data;
            }
            
            try {
              response = angular.copy(data.slice(start, data.length));
            } catch (err) {
              return reject(ecConstants.ERRORS.FILTER_OFFSET_FAILED, err);
            }

            return response;
          },
          limit: function (data, params) {
            var size = params.size;
            var response = [];
            var total = getListTotalItems(data);

            if (size >= total) {
              size = total;
            }

            try {
              response = angular.copy(data.slice(0, size));
            } catch (err) {
              return reject(ecConstants.ERRORS.FILTER_LIMIT_FAILED, err);
            }

            return response
          },
          where: function (data, params) {
            var string = params.string;
            var key = params.key;
            return data.filter(function (el) {
              return _unaccent(el[key]).indexOf(_unaccent(string)) !== -1 && !el.hide;
            });
          },
          notIn: function(data, params){
            var result = data.filter(function(item){
              var isInCurrentList = params.list.some(function(it){
                return it._id == item._id;
              });
              if(!isInCurrentList) return item;
            }); 
            return result;
          }
        }

        resolveFilters(filters, filterObject, currentData, function(resolvedData){
          resolve(resolvedData);
        });

      })
    }
  }
})();