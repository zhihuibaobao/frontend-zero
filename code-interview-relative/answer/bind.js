/**
 * bind simulation
 */
const obj = {
  name: 'chm',
  age: 12
}

function TestBind (...res) {
  console.log(this.name)
  console.log(res)
  this.age = 24
}

TestBind.bind(obj, 1, 2)()
// Actually the bind has implemented Currying.
TestBind.bind(obj)(1, 2)

// When a function used as a constructor of Object, there is no need of return.
const newObj = new TestBind(1, 2)
console.log('new TestBind', newObj)
const returnTest = TestBind(1, 2)
console.log('return Test', returnTest)

/**
 * 思路：返回一个新的函数，函数内通过 call 传入this。 原型需要被覆盖。
 * 1. Create a function that bind 'this' through call prototype, there will execute to bind this and then execute the original function. In this term, closure is used.
 * 2. Refresh the new function's prototype by the original function's.
 */
// eslint-disable-next-line no-extend-native
Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  // fn = TestBind
  const fn = this
  // return a constructor
  const bindFn = function (...newFnArgs) {
    // When there occurs 'New' operation, this is instance of bindFn.
    return fn.call(this instanceof bindFn ? this : context, ...args, ...newFnArgs)
  }
  // The newly create object will inherit all the prototype object properties.
  bindFn.prototype = Object.create(fn.prototype)
  return bindFn
}

const NewTest = TestBind.bind2(obj, 1, 2)
// 直接调用
NewTest(4, 5, 6)
// 构造函数方式调用
const newTest = new NewTest()
console.log(newTest)

console.log('newTest instanceof TestBind', newTest instanceof TestBind) // true
console.log('Object.getPrototypeOf(newTest) === TestBind.prototype', Object.getPrototypeOf(newTest) === TestBind.prototype) // false
console.log('Object.getPrototypeOf(Object.getPrototypeOf(newTest)) === TestBind.prototype', Object.getPrototypeOf(Object.getPrototypeOf(newTest)) === TestBind.prototype)

const OriginalTest = TestBind.bind(obj, 1, 2)
const originalTest = new OriginalTest()
console.log('originalTest = ', originalTest)
console.log('originalTest instanceof TestBind', originalTest instanceof TestBind) // true
