const express = require("express");
//引入连接池模块
const pool = require("../pool.js");
//创建路由器对象
var router = express.Router();
//添加路由
//用户登录
//2.用户登录
router.post('/login',function(req,res){
	//2.1获取数据
    var obj=req.body;
    var uname = obj.uname;
    var upwd = obj.upwd;
	console.log(obj);
	//2.3执行数据
	pool.query('SELECT * FROM login WHERE uname=? AND upwd=?',[uname,upwd],function(err,result){
        if(err) throw err;
		console.log(result);
		//判断数据长度会否大于0
		if(result.length>0){
			res.redirect("../index.html");
			
		}else{
			res.redirect("../login.html");
		}
	});
});


//导出路由器
module.exports = router;