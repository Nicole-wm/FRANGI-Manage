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
			
			//$exec="delete from type_list where id='$id'";
			$exec="update type_list set deleted='1' where id='$id'";
		    $result=mysql_query($exec);
		    if($result){
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

