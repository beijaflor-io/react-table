'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  get: get,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  clone: clone,
  remove: remove,
  getFirstDefined: getFirstDefined
};


function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function get(a, b) {
  if (isArray(b)) {
    b = b.join('.');
  }
  return b.replace('[', '.').replace(']', '').split('.').reduce(function (obj, property) {
    return obj[property];
  }, a);
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i++) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs) {
  return arr.sort(function (a, b) {
    for (var i = 0; i < funcs.length; i++) {
      var comp = funcs[i];
      var ca = comp(a);
      var cb = comp(b);
      var desc = dirs[i] === false || dirs[i] === 'desc';
      if (ca > cb) {
        return desc ? -1 : 1;
      }
      if (ca < cb) {
        return desc ? 1 : -1;
      }
    }
    return 0;
  });
}

function clone(a) {
  return JSON.parse(JSON.stringify(a, function (key, value) {
    if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  }));
}

// ########################################################################
// Helpers
// ########################################################################

function isArray(a) {
  return Array.isArray(a);
}

function getFirstDefined() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'undefined') {
      return args[i];
    }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJnZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwiY2xvbmUiLCJyZW1vdmUiLCJnZXRGaXJzdERlZmluZWQiLCJhIiwiYiIsImZpbHRlciIsIm8iLCJpIiwiciIsInNwbGljZSIsImlzQXJyYXkiLCJqb2luIiwicmVwbGFjZSIsInNwbGl0IiwicmVkdWNlIiwib2JqIiwicHJvcGVydHkiLCJhcnIiLCJuIiwic3RhcnQiLCJsZW5ndGgiLCJzbGljZSIsInB1c2giLCJmdW5jcyIsImRpcnMiLCJzb3J0IiwiY29tcCIsImNhIiwiY2IiLCJkZXNjIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5Iiwia2V5IiwidmFsdWUiLCJ0b1N0cmluZyIsIkFycmF5IiwiYXJncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQWU7QUFDYkEsVUFEYTtBQUViQyxzQkFGYTtBQUdiQyxZQUhhO0FBSWJDLGtCQUphO0FBS2JDLGNBTGE7QUFNYkMsY0FOYTtBQU9iQyxnQkFQYTtBQVFiQztBQVJhLEM7OztBQVdmLFNBQVNELE1BQVQsQ0FBaUJFLENBQWpCLEVBQW9CQyxDQUFwQixFQUF1QjtBQUNyQixTQUFPRCxFQUFFRSxNQUFGLENBQVMsVUFBVUMsQ0FBVixFQUFhQyxDQUFiLEVBQWdCO0FBQzlCLFFBQUlDLElBQUlKLEVBQUVFLENBQUYsQ0FBUjtBQUNBLFFBQUlFLENBQUosRUFBTztBQUNMTCxRQUFFTSxNQUFGLENBQVNGLENBQVQsRUFBWSxDQUFaO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRCxXQUFPLEtBQVA7QUFDRCxHQVBNLENBQVA7QUFRRDs7QUFFRCxTQUFTWixHQUFULENBQWNRLENBQWQsRUFBaUJDLENBQWpCLEVBQW9CO0FBQ2xCLE1BQUlNLFFBQVFOLENBQVIsQ0FBSixFQUFnQjtBQUNkQSxRQUFJQSxFQUFFTyxJQUFGLENBQU8sR0FBUCxDQUFKO0FBQ0Q7QUFDRCxTQUFPUCxFQUNKUSxPQURJ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a2VSaWdodCxcbiAgbGFzdCxcbiAgb3JkZXJCeSxcbiAgcmFuZ2UsXG4gIGNsb25lLFxuICByZW1vdmUsXG4gIGdldEZpcnN0RGVmaW5lZFxufVxuXG5mdW5jdGlvbiByZW1vdmUgKGEsIGIpIHtcbiAgcmV0dXJuIGEuZmlsdGVyKGZ1bmN0aW9uIChvLCBpKSB7XG4gICAgdmFyIHIgPSBiKG8pXG4gICAgaWYgKHIpIHtcbiAgICAgIGEuc3BsaWNlKGksIDEpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuZnVuY3Rpb24gZ2V0IChhLCBiKSB7XG4gIGlmIChpc0FycmF5KGIpKSB7XG4gICAgYiA9IGIuam9pbignLicpXG4gIH1cbiAgcmV0dXJuIGJcbiAgICAucmVwbGFjZSgnWycsICcuJykucmVwbGFjZSgnXScsICcnKVxuICAgIC5zcGxpdCgnLicpXG4gICAgLnJlZHVjZShcbiAgICAgIGZ1bmN0aW9uIChvYmosIHByb3BlcnR5KSB7XG4gICAgICAgIHJldHVybiBvYmpbcHJvcGVydHldXG4gICAgICB9LCBhXG4gICAgKVxufVxuXG5mdW5jdGlvbiB0YWtlUmlnaHQgKGFyciwgbikge1xuICBjb25zdCBzdGFydCA9IG4gPiBhcnIubGVuZ3RoID8gMCA6IGFyci5sZW5ndGggLSBuXG4gIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQpXG59XG5cbmZ1bmN0aW9uIGxhc3QgKGFycikge1xuICByZXR1cm4gYXJyW2Fyci5sZW5ndGggLSAxXVxufVxuXG5mdW5jdGlvbiByYW5nZSAobikge1xuICBjb25zdCBhcnIgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IG47IGkrKykge1xuICAgIGFyci5wdXNoKG4pXG4gIH1cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBvcmRlckJ5IChhcnIsIGZ1bmNzLCBkaXJzKSB7XG4gIHJldHVybiBhcnIuc29ydCgoYSwgYikgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvbXAgPSBmdW5jc1tpXVxuICAgICAgY29uc3QgY2EgPSBjb21wKGEpXG4gICAgICBjb25zdCBjYiA9IGNvbXAoYilcbiAgICAgIGNvbnN0IGRlc2MgPSBkaXJzW2ldID09PSBmYWxzZSB8fCBkaXJzW2ldID09PSAnZGVzYydcbiAgICAgIGlmIChjYSA+IGNiKSB7XG4gICAgICAgIHJldHVybiBkZXNjID8gLTEgOiAxXG4gICAgICB9XG4gICAgICBpZiAoY2EgPCBjYikge1xuICAgICAgICByZXR1cm4gZGVzYyA/IDEgOiAtMVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMFxuICB9KVxufVxuXG5mdW5jdGlvbiBjbG9uZSAoYSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShhLCBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9KSlcbn1cblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyBIZWxwZXJzXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gaXNBcnJheSAoYSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKVxufVxuXG5mdW5jdGlvbiBnZXRGaXJzdERlZmluZWQgKC4uLmFyZ3MpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHR5cGVvZiBhcmdzW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGFyZ3NbaV1cbiAgICB9XG4gIH1cbn1cbiJdfQ==