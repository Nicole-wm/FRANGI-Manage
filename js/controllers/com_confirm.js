app.controller('ComConfirmCtrl', ['$scope','$modalInstance','items', function($scope,$modalInstance,items) {
	$scope.CommonText = items;
	
	$scope.ok = function () {
		$modalInstance.close('ok');
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]); 