<?php
header("Content-type:text/html;charset=utf-8"); 
include('../../data/conn.php');

if($select){
	$ctoken=new Token();
	$cresult = $ctoken->checktoken($_SERVER['HTTP_TOKEN']);
	if($cresult){
		class type {
			public $id = "";
			public $tname  = "";
			public $cateid  = "";
		}
		class cate {
			public $id = "";
			public $cname  = "";
			public $type = array(); 
		}

		$arrcate=array(); 
		$selectcate = mysql_query("select id,cname from cate_list where deleted='0'"); 
		while($crows = mysql_fetch_array($selectcate)){
			$newItemCate=new cate();
			$newItemCate->id=$crows['id'];
			$newItemCate->cname=$crows['cname'];

			$selecttype = mysql_query("select id,tname,cateid from type_list where deleted='0'and cateid=".$crows['id']); 
			while($trows = mysql_fetch_array($selecttype)){
				$newItemType=new type();
				$newItemType->id=$trows['id'];
				$newItemType->tname=$trows['tname'];
				$newItemType->cateid=$trows['cateid'];
				$newItemCate->type[]=$newItemType;
			}

			$arrcate[] = $newItemCate;
		}
		
		Response::json(1,'获取类别列表成功！',$arrcate);
	}else{
		Response::json(10001,'Token超时，重新登录！');
	}
}else{
	Response::json(0,'Server Error！');   
}

mysql_close($conn);
?>

