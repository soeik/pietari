
/**
 * Currying refers to the process of transforming a function 
 * with multiple arity into the same function with less arity. 
 * @param {*} f 
 * @param  {...any} xs 
 */
export const curry = (f, ...xs) =>
  xs.length >= f.length ? f(...xs) : (...moreXs) => curry(f, ...xs, ...moreXs)

/**
 * Runs the given function with the supplied object, 
 * then returns the object.
 */
export const tap = curry((fn, x) => {
  fn(x)
  return x
})

/**
 * Curried pointfree wrapper for functor methods.
*/
export const pf = (arity, method) =>
  function pointfree(...xs) {
    return [...xs].length >= arity + 1
      ? xs[arity][method](...xs.slice(0, arity))
      : (...moreXs) => pointfree(...xs, ...moreXs)
  }

/**
 * Performs left-to-right function composition. 
 * The leftmost function may have any arity; 
 * the remaining functions must be unary.
 * @param  {...any} fs
 */
export const pipe = (...fs) => fs.reduceRight((f, g) => (...xs) => f(g(...xs)))

/**
 * Performs right-to-left function composition. 
 * The rightmost function may have any arity; 
 * the remaining functions must be unary.
 * @param  {...any} fs
 */
export const compose = (...fs) => fs.reduce((f, g) => (...xs) => f(g(...xs)))

/**
 * Takes predicate, fn and argument
 * Returns result of fn(arg) if pred(arg) evaluates to true
 * Returns arg otherwise
 */
export const doif = curry((pred, fn, arg) => pred(arg) && fn(arg) || arg)

/**
 * Pointfree wrapper for map method
 */
export const map = pf(1, "map")

/**
 * Pointfree wrapper for forEach method
 */
export const forEach = pf(1, "forEach")

/**
 * Pointfree wrapper for reduce method
 */
export const reduce = pf(2, "reduce")

/**
 * Pointfree wrapper for filter method
 */
export const filter = pf(1, "filter")

/**
 * Pointfree wrapper for find method
 */
export const find = pf(1, "find")

/**
 * Pointfree wrapper for some method
 */
export const some = pf(1, "some")

/**
 * Pointfree wrapper for every method
 */
export const every = pf(1, "every")

/**
 * Returns a partial copy of an object containing only the keys specified.
 * If the key does not exist, the property is ignored.
 */
export const pick = curry((whitelist, obj) =>
  Object.entries(obj)
    .filter(([key]) => whitelist.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
)

/**
 * Returns a partial copy of an object omitting the keys specified.
 */
export const omit = curry((blacklisted, obj) =>
  Object.entries(obj)
    .filter(([key]) => !blacklisted.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})
)

/**
 * Reverse a string or an array
 * @param {*} list - string or an array
 */
export const reverse = list => {

  if (!(typeof list === "string" || Array.isArray(list))) {
    throw new Error("Invalid argument.")
  }

  return typeof list === "string"
    ? list
      .split("")
      .reverse()
      .join("")
    : Array.prototype.slice.call(list, 0).reverse()
}

/**
 * Returns a new list by pulling every item out of it 
 * and putting them in a new array.
 * Won't wirk for nesting deeper than two levels
 * @param {array} arr 
 */
export const flatten = arr => [].concat.apply([], arr)

/**
 * Check if an array is empty
 * @param {array} array 
 */
export const isEmpty = array => Array.isArray(array) && array.length === 0

/**
 * Iterate over an input object, calling a provided function fn for each property
 */
export const forIn = curry((fn, obj) =>
  Object.keys(obj).forEach(key => fn(obj[key], key))
)

/**
 * Takes a function and a object, applies the function to each of the object's values, 
 * and returns an object of the same shape
 */
export const mapIn = curry((fn, obj) =>
  Object.keys(obj).reduce((newObj, key) => {
    newObj[key] = fn(obj[key])
    return newObj
  }, {})
)

/**
 * Takes an object and list of properties and returns an array of their values
 */
export const props = curry((propsList, obj) =>
  Object.entries(obj)
    .filter(([key]) => propsList.includes(key))
    .reduce((arr, [key, val]) => arr.concat(val), [])
)

/**
 * Returns opposite value of boolean
 * @param {boolean} a 
 */
export const not = a => !a

/**
 * Checks if two values are equal
 */
export const equals = curry((a, b) => {
  // Equals implementation from ramda
  // SameValue algorithm
  return a === b
    ? // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    a !== 0 || 1 / a === 1 / b
    : // Step 6.a: NaN == NaN
    a !== a && b !== b
})

/**
 * Returns propertyvalue of an object
 */
export const prop = curry((prop, obj) => obj[prop])

/**
 * Compares property value with provided value
 */
export const propEq = curry((name, val, obj) => equals(val, obj[name]))

/**
 * Pointfree wrapper for Promise.then
 */
export const then = curry((onThen, promise) => promise.then(onThen))

/**
 * Pointfree wrapper for Promise.catch
 */
export const catchError = curry((onCatch, promise) => promise.catch(onCatch))

/**
 * Pointfree wrapper for Promise.then with error handling
 */
export const thenCatch = curry((onThen, onError, promise) =>
  promise.then(onThen, onError)
)

export default {
  catchError,
  curry,
  compose,
  doif,
  every,
  equals,
  filter,
  forEach,
  forIn,
  find,
  flatten,
  isEmpty,
  map,
  mapIn,
  not,
  omit,
  pf,
  pick,
  pipe,
  prop,
  props,
  propEq,
  reduce,
  reverse,
  some,
  then,
  thenCatch,
  tap
}

