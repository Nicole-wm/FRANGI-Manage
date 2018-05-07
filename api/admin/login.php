<?php
	header("Content-type:text/html;charset=utf-8"); 
	include('../data/conn.php');

	if($select){
	    $content = file_get_contents("php://input");
	    $obj=json_decode($content);
		$username = $obj->{'username'}; 
		$password = MD5($obj->{'password'}); 

		$query = mysql_query("select * from user where name='$username'"); 
		$row = mysql_fetch_array($query); 

		if($password == $row['pass']){
			$logininfo['id']=$row['id'];
			$logininfo['username'] = $username;
			$ctoken=new Token();
			$logininfo['token'] = $ctoken->settoken($logininfo['id']);
			Response::json(1,'登录成功！',$logininfo);  
		}else{
			Response::json(0,'用户名或密码错误！');  
		}
	}
	Response::json(0,'Server Error！');  

	mysql_close($conn);
?>

