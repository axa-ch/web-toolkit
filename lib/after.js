module.exports = exports = function (count, afterFn, beforeFn) {
  var timesCalled = 0;

  return function () {
    var fn = (++timesCalled >= 2 ? afterFn : beforeFn);

    if (fn) fn.apply(this, arguments);
  }
};

/* Copyright AXA Versicherungen AG 2015 */
