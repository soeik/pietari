"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.thenCatch = exports.catchError = exports.then = exports.propEq = exports.prop = exports.equals = exports.not = exports.props = exports.mapIn = exports.forIn = exports.isEmpty = exports.flatten = exports.reverse = exports.omit = exports.pick = exports.every = exports.some = exports.find = exports.filter = exports.reduce = exports.forEach = exports.map = exports.doif = exports.compose = exports.pipe = exports.pf = exports.tap = exports.curry = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * Currying refers to the process of transforming a function 
 * with multiple arity into the same function with less arity. 
 * @param {*} f 
 * @param  {...any} xs 
 */
var curry = function curry(f) {
  for (var _len = arguments.length, xs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    xs[_key - 1] = arguments[_key];
  }

  return xs.length >= f.length ? f.apply(void 0, xs) : function () {
    for (var _len2 = arguments.length, moreXs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      moreXs[_key2] = arguments[_key2];
    }

    return curry.apply(void 0, [f].concat(xs, moreXs));
  };
};
/**
 * Runs the given function with the supplied object, 
 * then returns the object.
 */


exports.curry = curry;
var tap = curry(function (fn, x) {
  fn(x);
  return x;
});
/**
 * Curried pointfree wrapper for functor methods.
*/

exports.tap = tap;

var pf = function pf(arity, method) {
  return function pointfree() {
    var _xs$arity;

    for (var _len3 = arguments.length, xs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      xs[_key3] = arguments[_key3];
    }

    return [].concat(xs).length >= arity + 1 ? (_xs$arity = xs[arity])[method].apply(_xs$arity, _toConsumableArray(xs.slice(0, arity))) : function () {
      for (var _len4 = arguments.length, moreXs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        moreXs[_key4] = arguments[_key4];
      }

      return pointfree.apply(void 0, xs.concat(moreXs));
    };
  };
};
/**
 * Performs left-to-right function composition. 
 * The leftmost function may have any arity; 
 * the remaining functions must be unary.
 * @param  {...any} fs
 */


exports.pf = pf;

var pipe = function pipe() {
  for (var _len5 = arguments.length, fs = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    fs[_key5] = arguments[_key5];
  }

  return fs.reduceRight(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
};
/**
 * Performs right-to-left function composition. 
 * The rightmost function may have any arity; 
 * the remaining functions must be unary.
 * @param  {...any} fs
 */


exports.pipe = pipe;

var compose = function compose() {
  for (var _len6 = arguments.length, fs = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    fs[_key6] = arguments[_key6];
  }

  return fs.reduce(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
};
/**
 * Takes predicate, fn and argument
 * Returns result of fn(arg) if pred(arg) evaluates to true
 * Returns arg otherwise
 */


exports.compose = compose;
var doif = curry(function (pred, fn, arg) {
  return pred(arg) && fn(arg) || arg;
});
/**
 * Pointfree wrapper for map method
 */

exports.doif = doif;
var map = pf(1, "map");
/**
 * Pointfree wrapper for forEach method
 */

exports.map = map;
var forEach = pf(1, "forEach");
/**
 * Pointfree wrapper for reduce method
 */

exports.forEach = forEach;
var reduce = pf(2, "reduce");
/**
 * Pointfree wrapper for filter method
 */

exports.reduce = reduce;
var filter = pf(1, "filter");
/**
 * Pointfree wrapper for find method
 */

exports.filter = filter;
var find = pf(1, "find");
/**
 * Pointfree wrapper for some method
 */

exports.find = find;
var some = pf(1, "some");
/**
 * Pointfree wrapper for every method
 */

exports.some = some;
var every = pf(1, "every");
/**
 * Returns a partial copy of an object containing only the keys specified.
 * If the key does not exist, the property is ignored.
 */

exports.every = every;
var pick = curry(function (whitelist, obj) {
  return Object.entries(obj).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        key = _ref2[0];

    return whitelist.includes(key);
  }).reduce(function (obj, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        val = _ref4[1];

    return Object.assign(obj, _defineProperty({}, key, val));
  }, {});
});
/**
 * Returns a partial copy of an object omitting the keys specified.
 */

exports.pick = pick;
var omit = curry(function (blacklisted, obj) {
  return Object.entries(obj).filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        key = _ref6[0];

    return !blacklisted.includes(key);
  }).reduce(function (obj, _ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
        key = _ref8[0],
        val = _ref8[1];

    return Object.assign(obj, _defineProperty({}, key, val));
  }, {});
});
/**
 * Reverse a string or an array
 * @param {*} list - string or an array
 */

exports.omit = omit;

var reverse = function reverse(list) {
  if (!(typeof list === "string" || Array.isArray(list))) {
    throw new Error("Invalid argument.");
  }

  return typeof list === "string" ? list.split("").reverse().join("") : Array.prototype.slice.call(list, 0).reverse();
};
/**
 * Returns a new list by pulling every item out of it 
 * and putting them in a new array.
 * Won't wirk for nesting deeper than two levels
 * @param {array} arr 
 */


exports.reverse = reverse;

var flatten = function flatten(arr) {
  return [].concat.apply([], arr);
};
/**
 * Check if an array is empty
 * @param {array} array 
 */


exports.flatten = flatten;

var isEmpty = function isEmpty(array) {
  return Array.isArray(array) && array.length === 0;
};
/**
 * Iterate over an input object, calling a provided function fn for each property
 */


exports.isEmpty = isEmpty;
var forIn = curry(function (fn, obj) {
  return Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
});
/**
 * Takes a function and a object, applies the function to each of the object's values, 
 * and returns an object of the same shape
 */

exports.forIn = forIn;
var mapIn = curry(function (fn, obj) {
  return Object.keys(obj).reduce(function (newObj, key) {
    newObj[key] = fn(obj[key]);
    return newObj;
  }, {});
});
/**
 * Takes an object and list of properties and returns an array of their values
 */

exports.mapIn = mapIn;
var props = curry(function (propsList, obj) {
  return Object.entries(obj).filter(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 1),
        key = _ref10[0];

    return propsList.includes(key);
  }).reduce(function (arr, _ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
        key = _ref12[0],
        val = _ref12[1];

    return arr.concat(val);
  }, []);
});
/**
 * Returns opposite value of boolean
 * @param {boolean} a 
 */

exports.props = props;

var not = function not(a) {
  return !a;
};
/**
 * Checks if two values are equal
 */


exports.not = not;
var equals = curry(function (a, b) {
  // Equals implementation from ramda
  // SameValue algorithm
  return a === b ? // Steps 1-5, 7-10
  // Steps 6.b-6.e: +0 != -0
  a !== 0 || 1 / a === 1 / b : // Step 6.a: NaN == NaN
  a !== a && b !== b;
});
/**
 * Returns propertyvalue of an object
 */

exports.equals = equals;
var prop = curry(function (prop, obj) {
  return obj[prop];
});
/**
 * Compares property value with provided value
 */

exports.prop = prop;
var propEq = curry(function (name, val, obj) {
  return equals(val, obj[name]);
});
/**
 * Pointfree wrapper for Promise.then
 */

exports.propEq = propEq;
var then = curry(function (onThen, promise) {
  return promise.then(onThen);
});
/**
 * Pointfree wrapper for Promise.catch
 */

exports.then = then;
var catchError = curry(function (onCatch, promise) {
  return promise.catch(onCatch);
});
/**
 * Pointfree wrapper for Promise.then with error handling
 */

exports.catchError = catchError;
var thenCatch = curry(function (onThen, onError, promise) {
  return promise.then(onThen, onError);
});
exports.thenCatch = thenCatch;
var _default = {
  catchError: catchError,
  curry: curry,
  compose: compose,
  doif: doif,
  every: every,
  equals: equals,
  filter: filter,
  forEach: forEach,
  forIn: forIn,
  find: find,
  flatten: flatten,
  isEmpty: isEmpty,
  map: map,
  mapIn: mapIn,
  not: not,
  omit: omit,
  pf: pf,
  pick: pick,
  pipe: pipe,
  prop: prop,
  props: props,
  propEq: propEq,
  reduce: reduce,
  reverse: reverse,
  some: some,
  then: then,
  thenCatch: thenCatch,
  tap: tap
};
exports.default = _default;
