(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$timeout', '$http']
function MenuDataService($q, $timeout, $http) {
  var service = this;

  // List of shopping items
  var items = [];

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };
}

 service.getAllCategories = function () {
    var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"      
    }).then(function (result) {
        // return result.data.menu_items;
        return result;  
        });

    return response;
  };


service.getItemsForCategory = function (categoryShortName) {
var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json?category",

    }).then(function (result) {
        return result;  
        });
    return response;
};

})();
