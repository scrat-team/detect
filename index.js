'use strict';

var ua = navigator.userAgent,
    os = {},
    browser = {},
    webkit = ua.match(/WebKit\/([\d.]+)/),
    android = ua.match(/(Android)\s+([\d.]+)/),
    ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    kindle = ua.match(/Kindle\/([\d.]+)/),
    silk = ua.match(/Silk\/([\d._]+)/),
    uc = ua.match(/UC/) || window.ucweb || window.ucbrowser,
    wechat = ua.match(/MicroMessenger/);

browser.webkit = !!webkit;
if (browser.webkit) { browser.version = webkit[1]; }
if (android) { os.android = true; os.version = android[2]; }
if (iphone) { os.ios = os.iphone = true; os.version = iphone[2].replace(/_/g, '.'); }
if (ipad) { os.ios = os.ipad = true; os.version = ipad[2].replace(/_/g, '.'); }
if (kindle) { os.kindle = true; os.version = kindle[1]; }
if (silk) { browser.silk = true; browser.version = silk[1]; }
if (!silk && os.android && ua.match(/Kindle Fire/)) { browser.silk = true; }
if (uc) {
  browser.uc = true;
  var ucstr = ua.substring(ua.indexOf('UC'), ua.length);
  var uclen = ucstr.indexOf(' ');
  uclen = uclen > -1 ? uclen : ucstr.length;
  browser.version = ucstr.substring(ucstr.indexOf('/') + 1, uclen);
}
if (wechat) { browser.wechat = true; }
if (!android && !ipad && !iphone && !kindle && !silk && !wechat && !uc) {
    browser.desktop = true;
}

exports.os = os;
exports.browser = browser;
