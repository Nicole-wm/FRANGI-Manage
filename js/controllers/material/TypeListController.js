app.controller('TypeListCtrl', ['$scope','$modal','toaster','$stateParams',function($scope, $modal,toaster,$stateParams) {
	$scope.CurCateName = $stateParams.cateName;

	$scope.TypeList=[{
		"id": "1",
		"tname": "女神水实拍图",
		"createtime":"2018-05-01",
		"updatetime":"2018-05-01",
		"banner":"../images/typeBanner/1/1.jpg"
	},{
		"id": "2",
		"tname": "女神水功效海报",
		"createtime":"2018-05-02",
		"updatetime":"2018-05-02",
		"banner":"../images/typeBanner/1/2.jpg"
	},{
		"id": "3",
		"tname": "女神水模特图",
		"createtime":"2018-05-03",
		"updatetime":"2018-05-03",
		"banner":"../images/typeBanner/1/3.jpg"
	},{
		"id": "4",
		"tname": "女神水使用场景图",
		"createtime":"2018-05-04",
		"updatetime":"2018-05-04",
		"banner":"../images/typeBanner/1/4.jpg"
	},{
		"id": "5",
		"tname": "买家秀",
		"createtime":"2018-05-05",
		"updatetime":"2018-05-05",
		"banner":"../images/typeBanner/1/5.jpg"
	}
	]

	$scope.openTypeModal = function (Stype,ObjDes) {
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
				toaster.pop("success","","删除成功！");
			}else{
			}
		}, function () {
		});
	};
}]); 

app.controller('TypeModalCtrl', ['$scope','$modalInstance','items','FileUploader',function($scope,$modalInstance,items,FileUploader) {
	$scope.items = items;
	if(!$scope.items){//新建
		$scope.items={
			"banner":"../img/banner.png"
		}
	}

	var uploader = $scope.uploader = new FileUploader({
		url: 'js/controllers/upload.php'
	});

	uploader.filters.push({
		name: 'customFilter',
		fn: function(item, options) {
			return this.queue.length < 10;
		}
	});

	uploader.onAfterAddingFile = function(fileItem) {
		var reader = new FileReader(); 
		reader.addEventListener("load", function (e) { 
			$scope.$apply(function(){           
				$scope.items.banner = e.target.result;         
			});       
		}, false);       
		reader.readAsDataURL(fileItem._file); 
	};

	$scope.ok = function () {
		$modalInstance.close($scope.items);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]); 

