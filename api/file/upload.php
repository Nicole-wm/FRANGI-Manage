<?php
    header("content-type:text/html;charset=utf-8");  
    date_default_timezone_set("PRC");
    include('../data/conn.php');
    include "upclass.php";

    $type =$_POST["type"];
    $tid = $_POST["tid"];
    
    $cur_Filepath="/upimg/".$type."/".$tid."/";
    $cur_path="../..".$cur_Filepath;
    $up = new fileupload;
        //设置属性(上传的位置， 大小， 类型，名是是否要随机生成)
    $up -> set("path",$cur_path);
    $up -> set("maxsize", 3*1024*1024);
    $up -> set("allowtype", array("gif", "png", "jpg","jpeg"));
    $up -> set("israndname", true);

    if($up -> upload('file')) {
        /*echo '<pre>';
        var_dump($up->getFileName());
        echo '</pre>';*/
        Response::json(1,'图片上传成功！',$cur_Filepath.$up->getFileName());
        
    } else {
        /*echo '<pre>';
        var_dump($up->getErrorMsg());
        echo '</pre>';*/
        Response::json(0,'图片上传失败！',$up->getErrorMsg());
    }
?>

