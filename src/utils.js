function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function setCookie(name, value, time) {
    var exp = new Date();
    exp.setTime(exp.getTime() + time);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export {getCookie , setCookie , delCookie}