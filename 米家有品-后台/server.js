const CONFIG = require('./config'),
  session = require('express-session'),
  bodyParser = require('body-parser');
const promiseFS = require('./utils/promiseFS');
/*-CREATE SERVER-*/
const express = require('express'),
  app = express();
app.listen(CONFIG.PORT, () => {
  console.log(`THE WEB SERVICE IS CREATED SUCCESSFULLY AND IS LISTENING TO THE PORT：${CONFIG.PORT}`);
});

/*-MIDDLE WARE-*/
app.use((req, res, next) => {
  const {
    ALLOW_ORIGIN,
    CREDENTIALS,
    HEADERS,
    ALLOW_METHODS
  } = CONFIG.CROS;
  res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
  res.header("Access-Control-Allow-Credentials", CREDENTIALS);
  res.header("Access-Control-Allow-Headers", HEADERS);
  res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
  req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});
app.use(session(CONFIG.SESSION));
//api的请求
//将post请求基于请求主体传递的信息获取到，放在req.body上
app.use(bodyParser.urlencoded({
  extended: false
}));
//将json文件中所有存储数据都获取到，放在req.xxx上
app.use((req, res, next) => {
  /* promiseFS.readFile('./mock/userLogin.json').then(result=>{
    console.log(result);
  }).catch(err=>{
    console.log(err);
  }); */
  let userLogin = promiseFS.readFile('./mock/userLogin.json');
  let headBanner = promiseFS.readFile('./mock/headBanner.json');
  let singList = promiseFS.readFile('./mock/singList.json');
  let shipin=promiseFS.readFile('./mock/shipin.json');
  Promise.all([userLogin, headBanner,singList,shipin]).then(result => {
    let [$userLogin, $headBanner,$singList,$shipin] = result;
    req.$userLogin = JSON.parse($userLogin);
    req.$headBanner = JSON.parse($headBanner);
    req.$singList=JSON.parse($singList);
    req.$shipin=JSON.parse($shipin);
    next();
  }).catch(err => {
    res.status(500);
    res.send(err);
  })

});

//构建express路由
//请求的api符合/user的地址规则都进入指定的路由中
app.use('/user', require('./routes/user'));
app.use('/banner', require('./routes/banner'));
app.use('/sing',require('./routes/sing'));
app.use('/shipin',require('./routes/shipin'));

//静态资源文件请求处理
app.use(express.static('./images'));
app.use((req, res, next) => {
  res.status(404);
});