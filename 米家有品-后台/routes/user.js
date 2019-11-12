let express = require('express'),
    route = express.Router();

let {
    success
} = require('../utils/tools');
//登陆
route.post('/login', (req, res) => {
    //客户端传递信息
    let data = req.$userLogin;
    if (data) {
       
        res.send(data)

        success(res, {
            code: 0,
            codeText: 'chenggong'
        });
    }
    success(res, {
        code: 1,
        codeText: '账号密码不匹配'
    });
});
//验证是否登陆
/* route.get('/login',(req,res)=>{
    let userID=req.session.userID;
    if(userID){
        success(res);
        return;
    }
    success(res,{
        code:1,
        codeText:'当前用户未登录'
    });
}); */
//退出登陆
route.get('/sigout',(req,res)=>{
    req.session.userID=null;
    
    success(res);
});

module.exports = route;