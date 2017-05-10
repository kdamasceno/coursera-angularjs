(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.message = "";
  $scope.lunch-menu = "";

  // $scope.sayMessage = function () {
  //   return "Yaakov likes to eat healthy snacks at night!";
  // };

  $scope.checkLunch = function () {
    var list = lunch-menu.split(",");
	console.log(list.length);
	if (list.length <= 0){
		$scope.message = "Please enter data first";
	} else if (list.length <= 3){
		$scope.message = "Enjoy!";
	} else {
		$scope.message = "Too much!";
	}
  };

}

})();
