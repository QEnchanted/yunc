const express=require("express")
const router=express.Router();
const pool=require("../pool.js")

//app.use("/details",Details)
//服务端接口地址http://localhost:3000/details
//客户端请求时:
//http://localhost:3000/details?lid=1
router.get("/",(req,res)=>{
  var lid=req.query.lid;
  console.log(lid);
  var output={
    // product:{},
     pics:[]
  }
  if(lid!==undefined){
    var sql=`select * from yunc_details_pic where lid=?`;
    pool.query(sql,[lid],(err,result)=>{
      if(err) console.log(err);    
          output.pics=result;
          console.log(result);
          res.send(output);
        })
  }else{
    res.send(output);
  }
})

module.exports=router;