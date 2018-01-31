var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    }
}; 


