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
			$tname = $obj->{'tname'};
			$banner = $obj->{'banner'};

			$exec="update type_list set tname = '$tname',banner = '$banner' where id='$id'";
		    $result=mysql_query($exec);
		    if($result){
		    	Response::json(1,'修改成功！','');
		    }else{
		    	Response::json(0,'修改失败，重新修改！','');
		    }
		}else{
			Response::json(10001,'Token超时，重新登录！');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

