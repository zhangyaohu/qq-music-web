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
