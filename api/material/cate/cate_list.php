<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../../data/conn.php');

	if($select){
		$ctoken=new Token();
		$cresult = $ctoken->checktoken($_SERVER['HTTP_TOKEN']);
		if($cresult){
			$array=[];
			$query = mysql_query("select * from cate_list where deleted='0'"); 
			while($rows = mysql_fetch_array($query)){
				$array[] = $rows;
			}
			Response::json(1,'获取素材类别列表成功！',$array);
		}else{
			Response::json(10001,'Token超时，重新登录！');
		}
	}else{
		Response::json(0,'Server Error！');   
	}

	mysql_close($conn);
?>

