import { expect } from "chai"
import {
  curry,
  tap,
  map,
  pf,
  pick,
  omit,
  reverse,
  flatten,
  isEmpty,
  forIn,
  mapIn,
  props,
  pipe,
  compose,
  doif,
  equals,
  prop,
  propEq
} from "../src/fph"

describe("Functional", function () {

  describe("curry", function () {
    it("returns new function with partially applied arguments", function () {
      const add = curry((a, b) => a + b)
      expect(typeof add).to.be.eq("function")

      const addOne = add(1)
      expect(typeof addOne).to.be.eq("function")

    })

    it("returns result of function when all arguments applied", function () {
      const addOne = curry((a, b) => a + b)(1)
      expect(addOne(1)).to.be.eq(2)
    })
  })

  describe("tap", function () {
    it("returns passed argument back", function () {
      expect(tap(() => null, 0)).to.be.eq(0)
    })

    it("invokes passed function with given argument", function () {
      let mutatable;
      const makeEffect = x => mutatable = x
      tap(makeEffect, 1)
      expect(mutatable).to.be.eq(1)
    })
  })

  describe("pf", function () {
    it("just works", function () {
      const arrMap = pf(1, "map")

      expect(typeof arrMap).to.be.eq("function")
      expect(arrMap(x => x + 1, [1, 2])).to.be.deep.eq([2, 3])

      const uppercase = pf(0, "toUpperCase")
      expect(uppercase("hello")).to.be.eq("HELLO")
    })
  })

  describe("pick", function () {
    it("creates new object containing only whitelisted properties", function () {
      const src = {
        a: 1,
        b: 2,
        c: 3
      }
      const res = pick(["a", "b"], src)
      expect(res).to.be.deep.eq({ a: 1, b: 2 })
    })
  })

  describe("omit", function () {
    it("creates new object not containing blacklisted properties", function () {
      const src = {
        a: 1,
        b: 2,
        c: 3
      }
      const res = omit(["a"], src)
      expect(res).to.be.deep.eq({ b: 2, c: 3 })
    })
  })

  describe("reverse", function () {
    it("can reverse a string", function () {
      expect(reverse("hello")).to.be.eq("olleh")
    })

    it("can reverse an array", function () {
      expect(reverse([1, 2, 3])).to.be.deep.eq([3, 2, 1])
    })

    it("will not reverse an object", function () {
      expect(() => reverse({ a: 1, b: 2 })).to.throw()
    })

  })

  describe("flatten", function () {
    it("flattens an array", function () {
      expect(flatten([[1], [2]])).to.be.deep.eq([1, 2])
    })
  })

  describe("isEmpty", function () {
    it("checks if an array is empty", function () {
      expect(isEmpty([])).to.be.true
      expect(isEmpty([1])).to.be.false
    })
  })

  describe("forIn", function () {
    it("applies fn to every object's property", function () {
      const src = { a: 1 }
      const result = {}
      forIn((x, key) => result[key] = x, src)
      expect(result).to.be.deep.eq({ a: 1 })
    })
  })

  describe("mapIn", function () {
    it("applies fn to every object's property and returns new object", function () {
      const src = { a: 1 }
      const result = mapIn((x, key) => x + 1, src)
      expect(result).to.be.deep.eq({ a: 2 })
    })
  })

  describe("props", function () {
    it("returns an array of values of listed properties", function () {
      const res = props(["a", "b", "e"], { a: 1, b: 2, c: 3 })
      expect(res).to.be.deep.eq([1, 2])
    })
  })

  describe("pipe", function () {
    it("creates new function", function () {
      const add = (a, b) => a + b
      const toString = pf(0, "toString")
      expect(pipe(add, toString)(1, 2)).to.be.eq("3")
    })
  })

  describe("compose", function () {
    it("creates new function", function () {
      const add = (a, b) => a + b
      const toString = pf(0, "toString")
      expect(compose(toString, add)(1, 2)).to.be.eq("3")
    })
  })

  describe("doif", function () {
    it("return fn(arg) if pred(arg) returns true", function () {
      const res = doif(() => true, x => x + 1, 1)
      expect(res).to.be.eq(2)
    })

    it("returns arg if pred(arg) returns false", function () {
      const res = doif(() => false, x => x + 1, 1)
      expect(res).to.be.eq(1)
    })
  })

  describe("equals", function () {
    it("returns true if values are equal", function () {
      const eqOne = equals(1)
      expect(eqOne(1)).to.be.true
      expect(eqOne(2)).to.be.false
      expect(equals(NaN, NaN)).to.be.true
      expect(equals(+0, -0)).to.be.false
    })
  })

  describe("prop", function () {
    it("returns property of an object", function () {
      expect(prop("a", { a: 1 })).to.be.eq(1)
    })
  })

  describe("propEq", function () {
    it("returns true if property of an object equals to given value", function () {
      expect(propEq("a", 1, { a: 1 })).to.be.true
      expect(propEq("a", 2, { a: 1 })).to.be.false
    })
  })

})