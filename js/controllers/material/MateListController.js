app.controller('MateListCtrl', ['$scope','$modal','toaster','$stateParams','$http',function($scope, $modal,toaster,$stateParams,$http) {
	if($stateParams.cateID){
		$scope.CurCateID = $stateParams.cateID;
		$scope.CurCateName = $stateParams.cateName;
	}else{
		$scope.CurCateID = "";
		$scope.CurCateName = "全部类别";
	}

	if($stateParams.typeID){
		$scope.CurTypeID = $stateParams.typeID;
		$scope.CurTypeName = $stateParams.typeName;
	}else{
		$scope.CurTypeID = "";
		$scope.CurTypeName = "全部类型";
	}

	$scope.ShowListFlag=false;
	$scope.MateList=[];

	$scope.totalItems=0;
	$scope.currentPage = 1;
	$scope.pageSize = 10;

	function InitPage(currentPage){
		return param={
			'page':currentPage,
			'limit':$scope.pageSize
		}
	}

	$scope.InitMateList = function(param){
		if(!param){
			param=InitPage(1);
		}
		var GetCateUrl = 'api/material/mate/mate_list.php?cateID='+$scope.CurCateID+'&typeID='+$scope.CurTypeID+'&page='+param.page+'&limit='+param.limit;
		$http.get(GetCateUrl).success(function(response){
			if(response.code==1) {
				$scope.totalItems=response.data.count;
				$scope.MateList=response.data.results;
				if(response.data.count==0){
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

	$scope.InitMateList(InitPage(1));

	$scope.openMateModal = function (Stype,ObjDes) {
		if(ObjDes){
			ObjDes.isstype="update";
		}else{
			ObjDes.isstype="add";
			if($scope.CurCateID){
				ObjDes={
					cateid:$scope.CurCateID,
					typeid:$scope.CurTypeID
				}
			}
		}

		$scope.items = ObjDes;
		var modalInstance = $modal.open({
			templateUrl: 'myModalMate',
			controller: 'MateModalCtrl',
			size: 'lg',
			resolve: {
				items: function () { 
					return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (result) {
			if(result!="cancel"){
				if(Stype){
					var UpdateMateUrl = 'api/material/mate/mate_update.php';
					var Param = {
						id:ObjDes.id,
						cateid:result.cateid,
						typeid:result.typeid,	
						content:result.content,	
						posters:result.postersUrl
					};

					$http.post(UpdateMateUrl,Param).success(function(response){
						if(response.code==1) {
							toaster.pop("success","","修改成功！");
							$scope.InitMateList(InitPage($scope.currentPage));
						}else{
							toaster.pop("error","","修改失败！");
							console.log('Server Error');
						}
					}).error(function(response, status){
						toaster.pop("error","","修改失败！");
						console.log(response.error);
					});
				}else{
					var AddMateUrl = 'api/material/mate/mate_add.php';
					var Param = {
						cateid:result.cateid,
						typeid:result.typeid,	
						content:result.content,	
						posters:result.postersUrl
					};

					$http.post(AddMateUrl,Param).success(function(response){
						if(response.code==1) {
							toaster.pop("success","","添加成功！");
							$scope.InitMateList(InitPage($scope.currentPage));
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

	$scope.deleteMate = function (ObjID) {
		var CurMateID=ObjID;
		var CommonText = {
			modalTitle: '删除素材',
			modalContent: '确定删除该素材？'
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
				var DeleteMateUrl = 'api/material/mate/mate_delete.php';
				var Param = {
					id:CurMateID
				};

				$http.post(DeleteMateUrl,Param).success(function(response){
					if(response.code==1) {
						toaster.pop("success","","删除成功！");
						$scope.InitMateList(InitPage($scope.currentPage));
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

	$scope.sortMate = function(){
		alert("功能开发中，敬请期待！");
	};

	$scope.publishMate = function(){
		alert("功能开发中，敬请期待！");
	};

	$scope.pageChanged = function()/*Fun-分页*/
	{
		$scope.InitMateList(InitPage($scope.currentPage));
	};
}]); 

app.controller('MateModalCtrl', ['$scope','$modalInstance','items','FileUploader','taOptions','$http','toaster',function($scope,$modalInstance,items,FileUploader,taOptions,$http,toaster) {
	$scope.CurShow=-1;
	$scope.mate={};
	taOptions.toolbar = [
	['h1', 'h2', 'h3', 'h4', 'h5', 'h6','p'],
	['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
	['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
	];

	if(items.isstype=="update"){
		$scope.mate = items;
		$scope.mate.posters = angular.fromJson(items.posters);
		$scope.mate.postersUrl = angular.fromJson(items.posters);
	}else{
		$scope.mate.cateid = null;
		$scope.mate.typeid = null;
		$scope.mate.posters=["/img/poster.png"];
		$scope.mate.postersUrl=["/img/poster.png"];
		$scope.mate.content = '<h3>在此输入素材内容!</h3><p>例如</p><p><b>【FRANGI 微商 · 开门红】</b></p><p>开好头，起好步，整年运势挡不住</p><p>活动福利三重奏</p><p>最大的优惠 + 最热卖的产品</p><p>打下全年业绩好基础</p>';
		if(items.cateid){
			$scope.mate.cateid = items.cateid;
			$scope.mate.typeid = items.typeid;
		}
	}

	$scope.ChangeCate = function () {
		if($scope.mate.cateid==null){
			$scope.mate.typeid = null;
		}
		$.each($scope.CateList, function(index,value) {  
			if ($scope.CateList[index]["id"] == $scope.mate.cateid) {  
				$scope.CurCate=$scope.CateList[index];
				return false;  
			} 
		});
	};

	$scope.CateList=[];
	$scope.InitCateList = function() {
		var GetCateUrl = 'api/material/mate/category.php';
		$http.get(GetCateUrl).success(function(response){
			if(response.code==1) {
				$scope.CateList=response.data;
				$scope.ChangeCate();
			}else{
				console.log('Server Error');
			}
		}).error(function(response, status){
			console.log(response.error);
		});
	};

	$scope.InitCateList();

	var uploader = $scope.uploader = new FileUploader({
		url: 'api/file/upload.php',
		formData:[
		{type:'mateImg'},
		{tid:$scope.mate.typeid}
		]
	});

	$scope.clearItems = function(){ 
		uploader.clearQueue();
		$scope.mate.posters=[];
		$scope.mate.postersUrl=[];
	};

	uploader.onAfterAddingFile = function(fileItem) {
		var reader = new FileReader(); 
		reader.addEventListener("load", function (e) { 
			$scope.$apply(function(){      
				$scope.mate.posters.push(e.target.result);         
			});       
		}, false);       
		reader.readAsDataURL(fileItem._file); 
	};

	uploader.onCompleteItem = function(fileItem, response, status, headers) {
		if(response.code==1) {
			$scope.mate.postersUrl.push(response.data);
		}else{
			toaster.pop("error","","图片上传失败！请刷新页面重试");
		}
	};
	uploader.onCompleteAll = function() {
		$modalInstance.close($scope.mate);
	};

	$scope.intendSuccess = function () {  
		if(uploader.queue==0){
			$modalInstance.close($scope.mate);
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
