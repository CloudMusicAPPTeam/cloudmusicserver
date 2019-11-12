let express=require('express');
let route =express.Router();
let {success}=require('../utils/tools');

route.post('/list',(req,res)=>{
    let data =req.$shipin;
    if(data){
        res.send(data);
        success(res,{
            code:0,
            codeText:'成功'
        })
    }
    success(res,{
        code:1,
        codeText:'失败'
    })
})
module.exports=route;