app.controller('TypeListCtrl', ['$scope','$modal','toaster','$stateParams','$http',function($scope, $modal,toaster,$stateParams,$http) {
	if($stateParams.cateID){
		$scope.CurCateID = $stateParams.cateID;
		$scope.CurCateName = $stateParams.cateName;
	}else{
		$scope.CurCateID = "";
		$scope.CurCateName = "全部";
	}

	$scope.TypeList=[];
	$scope.ShowListFlag=false;

	$scope.InitTypeList = function() {
		var GetTypeUrl = 'api/material/type/type_list.php?cateID='+$scope.CurCateID;
		$http.get(GetTypeUrl).success(function(response){
			if(response.code==1) {
				$scope.TypeList=response.data;
				if($scope.TypeList==""){
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

	$scope.InitTypeList();

	$scope.openTypeModal = function (Stype,ObjDes) {
		if(ObjDes){
			ObjDes.iscreate=false;
		}else{
			ObjDes={
				'iscreate':true,
				'cateid':$scope.CurCateID
			};
		}
		$scope.items = ObjDes;
		var modalInstance = $modal.open({
			templateUrl: 'myModalType',
			controller: 'TypeModalCtrl',
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
					if(result.bannerUrl){
						var UpdateTypeUrl = 'api/material/type/type_update.php';
						var Param = {
							id:ObjDes.id,
							tname:result.tname,
							banner:result.bannerUrl
						};

						$http.post(UpdateTypeUrl,Param).success(function(response){
							if(response.code==1) {
								toaster.pop("success","","修改成功！");
								$scope.InitTypeList();
							}else{
								toaster.pop("error","","修改失败！");
								console.log('Server Error');
							}
						}).error(function(response, status){
							toaster.pop("error","","修改失败！");
							console.log(response.error);
						});
					}else{
						$scope.InitTypeList();
					}
				}else{
					if(result.bannerUrl){
						var AddTypeUrl = 'api/material/type/type_add.php';
						var Param = {
							tname:result.tname,
							banner:result.bannerUrl,
							cateid:$scope.CurCateID
						};

						$http.post(AddTypeUrl,Param).success(function(response){
							if(response.code==1) {
								toaster.pop("success","","添加成功！");
								$scope.InitTypeList();
							}else{
								toaster.pop("error","","添加失败！");
								console.log('Server Error');
							}
						}).error(function(response, status){
							toaster.pop("error","","添加失败！");
							console.log(response.error);
						});
					}else{
						$scope.InitTypeList();
					}
				}
			}else{
			}
		}, function () {
		});
	};

	$scope.deleteType = function (ObjID) {
		var CurTypeID=ObjID;
		var CommonText = {
			modalTitle: '删除类型',
			modalContent: '确定删除该类型？（相关素材均将删除！）'
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
				var DeleteTypeUrl = 'api/material/type/type_delete.php';
				var Param = {
					id:CurTypeID
				};

				$http.post(DeleteTypeUrl,Param).success(function(response){
					if(response.code==1) {
						toaster.pop("success","","删除成功！");
						$scope.InitTypeList();
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

app.controller('TypeModalCtrl', ['$scope','$modalInstance','items','toaster','FileUploader',function($scope,$modalInstance,items,toaster,FileUploader) {
	$scope.items = items;
	if($scope.items.iscreate){//新建
		$scope.items.banner="../upimg/typeBanner/banner.png"
	}
	$scope.items.bannerUrl=$scope.items.banner;

	var uploader = $scope.uploader = new FileUploader({
		url: 'api/file/upload.php',
		formData:[
		{type:'typeBanner'},
		{tid:$scope.items.cateid}
		]
	}); 

	$scope.clearItems = function(){ 
		uploader.clearQueue();
		$scope.items.banner="../upimg/typeBanner/banner.png";
	};

	uploader.onAfterAddingFile = function(fileItem) {
		var reader = new FileReader(); 
		reader.addEventListener("load", function (e) { 
			$scope.$apply(function(){  
				$scope.items.banner = e.target.result;      
			});       
		}, false);       
		reader.readAsDataURL(fileItem._file); 
	};
	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		if(response.code==1) {
			$scope.items.bannerUrl=response.data;
		}else{
			$scope.items.bannerUrl='';
			toaster.pop("error","","图片上传失败！请刷新页面重试");
		}
	};
	uploader.onCompleteAll = function() {
		$modalInstance.close($scope.items);
	};

	$scope.intendSuccess = function () {  
		if(uploader.queue==0){
			$modalInstance.close($scope.items);
		}else{
			uploader.uploadAll();
		}
	};

	$scope.ok = function () {
		$scope.intendSuccess();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]); 

