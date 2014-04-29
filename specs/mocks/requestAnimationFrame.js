window.requestAnimationFrame = (function() {
  var queue = [];

  var rAF = function(fn) {
    queue.push(fn);
  };

  rAF.flush = function() {
    for (var i = 0, len = queue.length; i < len; i++) {
      queue.shift()();
    }
  };

  return rAF;
}());

