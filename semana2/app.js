(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.bought = function (itemIndex) {
    ShoppingListCheckOffService.boughtItem(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();

}


function ShoppingListCheckOffService() {
  var service = this;

  // to buy list
  var toBuyList = [	
  {
    name: "Leite",
    quantity: "4"
  },
  {
    name: "Suco de laranja",
    quantity: "2"
  },
  {
    name: "Abacaxi",
    quantity: "1"
  },
  {
    name: "Laranja",
    quantity: "10"
  },
  {
    name: "Melancia",
    quantity: "5"
  },
  ];

  // bought list
  var boughtList = [];

  service.boughtItem = function (itemIdex) {
	var toMoveItem = toBuyList[itemIdex];	
	toBuyList.splice(itemIdex, 1);	
	boughtList.push(toMoveItem);    	
  };

  service.getToBuyItems = function () {
    return toBuyList;
  };

  service.getBoughtItems = function () {
    return boughtList;
  };

}

})();
