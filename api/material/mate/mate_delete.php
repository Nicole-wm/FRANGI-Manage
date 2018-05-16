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

			$deletmate="update mate_list set deleted='1' where id='$id'";
		    $resultcate=mysql_query($deletmate);
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
