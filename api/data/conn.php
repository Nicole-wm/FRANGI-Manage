<?php
	$db_host = "localhost"; //数据库主机名
	// $db_user = "root";//数据库用户名
	// $db_pwd = "123456";//数据库密码
	// $db_name = "manage";//数据库名称
	$db_user = "cms_frangi_cn";//数据库用户名
	$db_pwd = "a73fb578d8";//数据库密码
	$db_name = "cms_frangi_cn";//数据库名称
	$db_port = "3306";//数据库端口////数据库连接
	$conn = @mysql_connect($db_host, $db_user,$db_pwd);
	mysql_query ( 'SET NAMES utf8',$conn);
	mysql_query ( "SET CHARACTER_SET_CLIENT='utf8'" ,$conn);
	mysql_query ( "SET CHARACTER_SET_RESULTS='utf8'" ,$conn);
	if(!$conn)
	{
		die("数据库读取失败，请打开data/conn.php修改数据库连接。");
	}
	$select=mysql_select_db($db_name,$conn);
	
	class Response{  
		public static function json($code,$message="",$data=array()){  
			$result=array(  
				'code'=>$code,  
				'message'=>$message,  
				'data'=>$data   
				);  
			echo json_encode($result);  
			exit;  
		}  
	}

	class Token{  
		public function settoken($user_id){
			global $conn;
			$str = md5(uniqid(md5(microtime(true)),true)); 
			$user_token=sha1($str); 
			$expire_time = time() + 604800;

			$result = mysql_query("select * from user_token where u_id ='$user_id'");
			if(is_resource($result)){
				$row = mysql_fetch_array($result,MYSQL_ASSOC); 
				if (mysql_num_rows($result)){
					$sql = "update user_token set u_token='$user_token' where u_id='$user_id'";
					if (mysql_query($sql,$conn)) {
						return $user_token; //return json_encode(array('code'=>1000,'message'=>'token更新成功','data'=>$user_token));
					}else{
						return false; //return json_encode(array('code'=>2000,'message'=>'token更新失败!原因：'.$conn->error));
					}
				}else {
					$sql = "insert into user_token (u_id, u_token,expire_time) values ('$user_id','$user_token','$expire_time')";
					if (mysql_query($sql,$conn)) {
						return $user_token; //return json_encode(array('code'=>1001,'message'=>'token插入成功','data'=>$user_token));
					}else{
						return false; //return json_encode(array('code'=>2001,'message'=>'token插入失败!原因：'.$conn->error));
					}
				}
			}
			mysql_close($conn);
		}

		public function checktoken($user_token){
			global $conn;
			$result = mysql_query("select * from user_token where u_token ='$user_token'");

			if(is_resource($result)){
				$row = mysql_fetch_array($result,MYSQL_ASSOC);
				if (mysql_num_rows($result)){
					$user_id = $row['u_id'];
					if (time()-$row['expire_time'] > 0){
						return json_encode(array('code'=>3000,'message'=>'token长时间未使用而过期，需重新登陆!'));
					}else{
	                	$new_expire_time = time() + 604800;//604800是七天
	                	$sql = "update user_token set expire_time='$new_expire_time' where u_id='$user_id'";
	                	if (mysql_query($sql,$conn)) {
	                		return $user_token; //return json_encode(array('code'=>3001,'message'=>'token验证成功，expire_time刷新成功','data'=>$user_token));
	                	}else{
	                		return false; //return json_encode(array('code'=>3002,'message'=>'token验证成功，expire_time刷新失败!原因：'.$conn->error));
	                	}
	                }
	            }else{
					return false; //return json_encode(array('code'=>3000,'message'=>'token不存在，需重新登陆!'));
	            }
	        }
	        mysql_close($conn);
	    }
	} 
	?>