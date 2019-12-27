export let singleToSize = (size,width,unit) => {
  var i = Math.floor(Math.log(size) / Math.log(10));
  console.log(i);
  let sizeArr = ['个','十', '百', '千', '万']
  if (typeof width === 'undefined') width = 1;
  if (typeof unit === 'undefined') unit = '个';
  var num = Math.pow(10, width);
  if (size === 0) return '0 ' + sizeArr[0];
  if (i < 0) i = 0;
  if (sizeArr[i] === '个') num = 1;
  if (i >= 4) i = 4;
  return Math.round(size / Math.pow(10, i) * num) / num + ' ' + sizeArr[i]
}

export let formatDateTime = function(date, fmt) { //author: meizz 
  let time = new Date(date);  
  var o = {   
    "M+" : time.getMonth()+1,                 //月份   
    "d+" : time.getDate(),                    //日   
    "h+" : time.getHours(),                   //小时   
    "m+" : time.getMinutes(),                 //分   
    "s+" : time.getSeconds(),                 //秒   
    "q+" : Math.floor((time.getMonth()+3)/3), //季度   
    "S"  : time.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}  