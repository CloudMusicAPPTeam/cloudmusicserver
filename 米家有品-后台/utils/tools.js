//密码md5加密
function handleMD5(val) {
	val = val.substring(4);
	val = val.split('').reverse().join('');
	val = val.substring(4);
	return val;
}
//数据处理：将json格式数据转换为对象，并且过滤掉state===1的
function filterInvalid(str) {
	let arr=JSON.parse(str);
	arr=arr.filter(item=>{
		return parseInt(item.state)===0;
	});
	return arr;
}
//统一处理服务器返回的结果
function success(res,options) {
	
	res.status(200);
	res.type('application/json');
	res.send(Object.assign({
		code:0,
		codeText:'ok',
		data:null
	},options));
}



module.exports = {
	handleMD5,
	filterInvalid,
	success,
	
}