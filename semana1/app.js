(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];

function LunchCheckController($scope, $filter) {
  $scope.menu = "";
  $scope.mymessage = "Please enter data first";
  $scope.color = "red";

  $scope.checkLunch = function () {
    	
	var itens = $scope.menu
	.split(",")
	.filter(
		function (item){
			// filtra e retorna apenas itens com length > 0
			return item.trim().length > 0;
		});
	
	if (itens.length <= 0){
		$scope.mymessage = "Please enter data first";
		$scope.color = "red";
		return;
	}

	$scope.color = "green";
	if (itens.length <= 3){
		$scope.mymessage = "Enjoy!";
	} else {
		$scope.mymessage = "Too much!";
	}

  };

}

})();
