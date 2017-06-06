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
    return (list.foundItems == undefined || list.foundItems.length === 0);
  };

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  controller.found = function () {
    
    if (controller.searchTerm.trim() == ""){
      controller.menu_items = [];
    }
    var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);

    promise.then(function (response) {
     controller.menu_items = response;
    })
    .catch(function (error) {
      console.log(error);
    })    
  };

 controller.removeItem = function (itemIndex) {
    controller.menu_items.splice(index,1);
  };

}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;
  var foundItems = [];
  
  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"      
    }).then(function (result) {
        var menu_items = result.data.menu_items;
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