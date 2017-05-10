(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.mymessage = "";
  $scope.menu = "";

  $scope.checkLunch = function () {
    	
	var list = $scope.menu.split(",");
	
	if ($scope.menu == ""){
		$scope.mymessage = "Please enter data first";
		return;
	} 

	
	if (list.length <= 3){
		$scope.mymessage = "Enjoy!";
	} else {
		$scope.mymessage = "Too much!";
	}
  };

}

})();
