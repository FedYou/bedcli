function decode(data) {
  var regExp = /\\u([\d\w]{4})/gi;
  return data.replace(regExp, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16));
  });
}
var unicodeEscape = function (a) {
  for (var b = "", c = 0, d; !isNaN((d = a.charCodeAt(c++))); )
    b += "\\u" + ("0000" + d.toString(16)).slice(-4);
  return b;
};
function encode(data) {
  var a = String(data).match(/"[^"]*"|'[^']*'/g);
  if (Array.isArray(a)) {
    for (var b = String(data), c = "", d = 0; d < a.length; )
      (b = b.replace(
        a[d].replace('"', "").replace('"', ""),
        "" + unicodeEscape(a[d].replace('"', "").replace('"', ""))
      )),
        d++;
    c = b;
  }
  return c;
}

export default { encode, decode };
