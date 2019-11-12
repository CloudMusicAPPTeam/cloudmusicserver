let express = require('express');
let route = express.Router();
let {
    success
} = require('../utils/tools');

route.post('/list', (req, res) => {
    let data = req.$dynamic;
    
    if (data) {
        res.send(data);
        success(res, {
            
            code: 0,
            codeText: '获取成功'
        });

    }
    success(res, {
        code: 1,
        codeText: '获取失败'
    });
});
module.exports = route;