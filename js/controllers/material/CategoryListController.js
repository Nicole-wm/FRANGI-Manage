app.controller('CategoryListCtrl', ['$scope','$modal','toaster','$http',function($scope, $modal,toaster,$http) {
	$scope.ShowListFlag=false;
	$scope.CateList=[];
	$scope.InitCateList = function() {
		var GetCateUrl = 'api/material/cate/cate_list.php';
		$http.get(GetCateUrl).success(function(response){
			if(response.code==1) {
				$scope.CateList=response.data;
				if($scope.CateList==""){
					$scope.ShowListFlag=true;
				}else{
					$scope.ShowListFlag=false;
				}
			}else{
				console.log('Server Error');
			}
		}).error(function(response, status){
			console.log(response.error);
		});
	};

	$scope.InitCateList();

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
				if(Stype){
					var UpdateCateUrl = 'api/material/cate/cate_update.php';
					var Param = {
						id:ObjDes.id,
						cname:result.MCateName
					};

					$http.post(UpdateCateUrl,Param).success(function(response){
						if(response.code==1) {
							toaster.pop("success","","修改成功！");
							$scope.InitCateList();
						}else{
							toaster.pop("error","","修改失败！");
							console.log('Server Error');
						}
					}).error(function(response, status){
						toaster.pop("error","","修改失败！");
						console.log(response.error);
					});
				}else{
					var AddCateUrl = 'api/material/cate/cate_add.php';
					var Param = {
						cname:result.MCateName
					};

					$http.post(AddCateUrl,Param).success(function(response){
						if(response.code==1) {
							toaster.pop("success","","添加成功！");
							$scope.InitCateList();
						}else{
							toaster.pop("error","","添加失败！");
							console.log('Server Error');
						}
					}).error(function(response, status){
						toaster.pop("error","","添加失败！");
						console.log(response.error);
					});
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
				var DeleteCateUrl = 'api/material/cate/cate_delete.php';
				var Param = {
					id:CurCateID
				};

				$http.post(DeleteCateUrl,Param).success(function(response){
					if(response.code==1) {
						toaster.pop("success","","删除成功！");
						$scope.InitCateList();
					}else{
						toaster.pop("error","","删除失败！");
						console.log('Server Error');
					}
				}).error(function(response, status){
					toaster.pop("error","","删除失败！");
					console.log(response.error);
				});
			}else{
			}
		}, function () {
		});
	};

	$scope.sortCate = function(){
		alert("功能开发中，敬请期待！");
	};
}]); 
