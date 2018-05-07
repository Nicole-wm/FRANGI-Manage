app.controller('MateListCtrl', ['$scope','$modal','toaster','$stateParams',function($scope, $modal,toaster,$stateParams) {
	$scope.CurTypeID = $stateParams.typeID;
	$scope.CurTypeName = $stateParams.typeName;

	$scope.MateList=[{
		"id": 1,
		"cid":1,
		"tid":1,
		"createtime":"2018-05-01",
		"updatetime":"2018-05-01",
		"content":"种草好精华又不想太贵？请选择FRANGI二代女神水",
		"publish":1,
		"posters":["../images/mateImg/1/1.jpg","../images/mateImg/1/2.jpg","../images/mateImg/1/3.jpg"]
	},{
		"id":2,
		"cid":1,
		"tid":2,
		"createtime":"2018-05-02",
		"updatetime":"2018-05-03",
		"content":"<p><b>护肤Tips</b></p>看过来~",
		"publish":1,
		"posters":["../images/mateImg/1/4.jpg","../images/mateImg/1/5.jpg","../images/mateImg/1/1.jpg"]
	},{
		"id":3,
		"cid":2,
		"tid":1,
		"createtime":"2018-05-03",
		"updatetime":"2018-05-04",
		"content":"<p><b>【FRANGI 微商 · 开门红】</b></p><p>开好头，起好步，整年运势挡不住</p><p>活动福利三重奏</p><p>最大的优惠 + 最热卖的产品</p><p>打下全年业绩好基础</p>",
		"publish":0,
		"posters":["../images/mateImg/1/2.jpg","../images/mateImg/1/4.jpg"]
	}
	]

	$scope.openMateModal = function (Stype,ObjDes) {
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

	$scope.deleteMate = function (ObjID) {
		var CurCateID=ObjID;
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
				toaster.pop("success","","删除成功！");
			}else{
			}
		}, function () {
		});
	};
}]); 

app.controller('MateModalCtrl', ['$scope','$modalInstance','items','FileUploader','taOptions',function($scope,$modalInstance,items,FileUploader,taOptions) {
	$scope.CurShow=-1;
	taOptions.toolbar = [
	['h1', 'h2', 'h3', 'h4', 'h5', 'h6','p'],
	['bold', 'italics', 'underline', 'ul', 'ol', 'redo', 'undo', 'clear'],
	['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
	];

	$scope.CateList = [
	{
		"id": 1, 
		"cname": "女神水",
		"type": [{
			"id":1,
			"tname": "女神水实拍图",
			"createtime":"2018-05-01",
			"updatetime":"2018-05-01",
			"banner":"../images/typeBanner/1/1.jpg"
		},{
			"id":2,
			"tname": "女神水功效海报",
			"createtime":"2018-05-02",
			"updatetime":"2018-05-02",
			"banner":"../images/typeBanner/1/2.jpg"
		},{
			"id":3,
			"tname": "女神水模特图",
			"createtime":"2018-05-03",
			"updatetime":"2018-05-03",
			"banner":"../images/typeBanner/1/3.jpg"
		},{
			"id":4,
			"tname": "女神水使用场景图",
			"createtime":"2018-05-04",
			"updatetime":"2018-05-04",
			"banner":"../images/typeBanner/1/4.jpg"
		},{
			"id":5,
			"tname": "买家秀",
			"createtime":"2018-05-05",
			"updatetime":"2018-05-05",
			"banner":"../images/typeBanner/1/5.jpg"
		}
		]
	},{
		"id": 2, 
		"cname": "巴厘岛",
		"type": [{
			"id":1,
			"tname": "产品图",
			"createtime":"2018-05-01",
			"updatetime":"2018-05-01",
			"banner":"../images/typeBanner/1/3.jpg"
		},{
			"id":2,
			"tname": "经销商",
			"createtime":"2018-05-05",
			"updatetime":"2018-05-05",
			"banner":"../images/typeBanner/1/2.jpg"
		}
		]
	}
	]

	$scope.mate = items;
	if(!$scope.mate){//新建
		$scope.mate={
			"posters":["../img/poster.png"]
		}
		$scope.mate.content = '<h3>在此输入素材内容!</h3><p>例如</p><p><b>【FRANGI 微商 · 开门红】</b></p><p>开好头，起好步，整年运势挡不住</p><p>活动福利三重奏</p><p>最大的优惠 + 最热卖的产品</p><p>打下全年业绩好基础</p>';
		$scope.mate.cid = null;
		$scope.mate.tid = null;
	}

	$scope.ChangeCate = function () {
		$.each($scope.CateList, function(index,value) {  
			if ($scope.CateList[index]["id"] == $scope.mate.cid) {  
				$scope.CurCate=$scope.CateList[index];
				return false;  
			}  
		});  
	};
	
	$scope.ChangeCate();

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
		$scope.mate.posters=[];
		var reader = new FileReader(); 
		reader.addEventListener("load", function (e) { 
			$scope.$apply(function(){      
				$scope.mate.posters.push(e.target.result);         
			});       
		}, false);       
		reader.readAsDataURL(fileItem._file); 
	};

	$scope.ok = function () {
		console.log($scope.mate.CurCate);
		$modalInstance.close($scope.mate);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]); 
