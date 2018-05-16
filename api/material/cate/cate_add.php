<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../../data/conn.php');

	if($select){
		$ctoken=new Token();
		$cresult = $ctoken->checktoken($_SERVER['HTTP_TOKEN']);
		if($cresult){
			$content = file_get_contents("php://input");
	    	$obj=json_decode($content);
			$cname = $obj->{'cname'};

			$exec="insert into cate_list(cname,createtime) values('$cname',now())";
		    $result=mysql_query($exec);
		    if($result){
		    	Response::json(1,'添加成功！','');
		    }else{
		    	Response::json(0,'添加失败，重新添加！','');
		    }
		}else{
			Response::json(10001,'Token超时，重新登录！');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

