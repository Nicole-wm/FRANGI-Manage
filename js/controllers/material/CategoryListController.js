app.controller('CategoryListCtrl', ['$scope','$modal','toaster',function($scope, $modal,toaster) {
	$scope.CateList=[{
		"id": "1",
		"cname": "女神水",
		"createtime":"2018-05-01",
		"updatetime":"2018-05-01"
	},
	{
		"id": "2",
		"cname": "巴厘岛",
		"createtime":"2018-05-01",
		"updatetime":"2018-05-02"
	}
	]

	$scope.openCateModal = function (Stype,ObjDes) {
		$scope.items = {
			MCateName: ObjDes.cname
		};
		var modalInstance = $modal.open({
			templateUrl: 'myModalCategory',
			controller: 'ComModalCtrl',
			size: '',
			resolve: {
				items: function () { 
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (result) {
			if(result!="cancel"){
				console.log(result);
				if(Stype){
					toaster.pop("success","","修改成功！");
				}else{
					toaster.pop("success","","添加成功！");
				}
			}else{
			}
		}, function () {
		});
	};

	$scope.deleteCate = function (ObjID) {
		var CurCateID=ObjID;
		var CommonText = {
			modalTitle: '删除类别',
			modalContent: '确定删除该类别？（相关类型以及素材均将删除！）'
		};
		var modalInstance = $modal.open({
			templateUrl: 'myModalConfirm',
			controller: 'ComConfirmCtrl',
			size: '',
			resolve: {
				items: function () { 
					return CommonText;
				}
			}
		});

		modalInstance.result.then(function (result) {
			if(result=="ok"){
				toaster.pop("success","","删除成功！");
			}else{
			}
		}, function () {
		});
	};
}]); 
