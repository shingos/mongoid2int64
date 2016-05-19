'use strict';

module.exports = function(oid, radix)
{
  if (!!oid && 
    (typeof oid === 'object' && oid['constructor'] &&  oid.constructor['name'] && oid.constructor.name === 'ObjectID')
    || (typeof oid === 'string' && (/^[0-9A-F]{24}$/gi).test(oid))
  ) {
    radix = radix || 10;

    var id = oid.toString();
    var time = id.substr(0, 8);
    //var machine = parseInt(id.substr(8, 6), 16);
    //var pid = parseInt(id.substr(14, 4), 16);
    var mpid = (parseInt(id.substr(10, 8), 16) % 256).toString(16);
    var seq = id.substr(18, 6);

    let int64 = (radix == 10) ? hex2dec(time + mpid + seq) : (time + mpid + seq);
    return int64;
  }
  else {
    return null;
  }
};

function hex2dec(hex) {
  let digs = hex.split(''), digits = [];
  for(let i = digs.length - 1; i >= 0; i--) {
    let n = parseInt(digs[i], 16);
    if(isNaN(n)) return null;
    digits.push(n);
  }
  if(!digits) return null;

  let retarr = [], p = [1];
  for(var i = 0; i < digits.length; i++) {
    if(digits[i]) retarr = decadd(retarr, digitnum(digits[i], p));
    p = digitnum(16, p);
  }

  let ret = '';
  for (let i = retarr.length - 1; i >= 0; i--) {
    ret += retarr[i].toString(10);
  }
  return ret;
}

function decadd(a, b) {
  let z = [], n = Math.max(a.length, b.length), c = 0, i = 0;
  while (i < n || c) {
    let ai = (i < a.length) ? a[i] : 0;
    let bi = (i < b.length) ? b[i] : 0;
    let zi = c + ai + bi;
    z.push(zi % 10);
    c = Math.floor(zi / 10);
    i++;
  }
  return z;
}

function digitnum(num, x) {
  if(num < 0) return null;
  if(num == 0) return [];
  let res = [], p = x;
  while(true) {
    if (num & 1) res = decadd(res, p);
    num = num >> 1;
    if (num === 0) break;
    p = decadd(p, p);
  }
  return res;
}
