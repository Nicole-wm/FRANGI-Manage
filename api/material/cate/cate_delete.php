<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../../data/conn.php');

	if($select){
		$ctoken=new Token();
		$cresult = $ctoken->checktoken($_SERVER['HTTP_TOKEN']);
		if($cresult){
			$content = file_get_contents("php://input");
	    	$obj=json_decode($content);
			$id = $obj->{'id'};

			//$exec="delete from cate_list where id='$id'";
			$deletcate="update cate_list set deleted='1' where id='$id'";
			$delettype="update type_list set deleted='1' where cateid='$id'";
		    $resultcate=mysql_query($deletcate);
		    $resulttype=mysql_query($delettype);
		    
		    if($resultcate){
		    	Response::json(1,'删除成功！','');
		    }else{
		    	Response::json(0,'删除失败，重新删除！','');
		    }
		}else{
			Response::json(10001,'Token超时，重新登录！');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

