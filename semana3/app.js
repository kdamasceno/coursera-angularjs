(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    }
    ,
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.warning = function () {
    return (list.foundItems.length <= 0);
  };

  list.onRemove = function (index) {
    list.foundItems.splice(index,1);
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;

  narrow.found = function (searchTerm) {
    
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
     narrow.menu_items = response;
    })
    .catch(function (error) {
      console.log(error);
    })    
  };

 narrow.removeItem = function (itemIndex) {
    narrow.found.removeItem(itemIndex);
  };

}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")      
    }).then(function (result) {
        var menu_items = result.data.menu_items;
        var foundItems = [];
        for (var i = 0; i < menu_items.length; i++) {
            var description = menu_items[i].description;
            if (description.search(searchTerm) != -1){
                foundItems.push(menu_items[i]);
            }
        }
        return foundItems;
        });

    return response;
  };

}

})();