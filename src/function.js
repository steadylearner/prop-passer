import { memoizeWith, identity, pick } from "./ramda";

// because of key -> meoizeWith not valid?
let commonKeys = (specificProp = {}) => (sharedProp = {}) => {
  let keys = [];
  for (let i in specificProp) {
    if (i in sharedProp) {
      keys.push(i);
    }
  }
  return keys;
};

// memoizeWith only for pure function
let cutLeft = (charlist = " ") => (str = "") => {
  return str.replace(new RegExp("^[" + charlist + "]+"), "");
};

cutLeft = memoizeWith(identity, cutLeft);

let repeat = fn => (times = 1) => {
  if (times > 1000) {
    console.warn("'repeat' may pause your system");
  }
  for (let i = 0; i < times; i++) {
    fn();
  }
};

const objectFromArray = (array = []) => {
  return Object.assign({}, ...array);
};

const copy = (element = {}) => (times = 1) => {
  if (times > 1000) {
    console.warn("'copy' may pause your system");
  }
  return Array(times).fill(element);
};

const hasOwnProperty = (obj = {}) => (name = "") =>
  Object.prototype.hasOwnProperty.call(obj, name);

let strRemover = (x = "") => (y = "undefined") => {
  return x
    .split(" ")
    .filter(x => x !== y)
    .join(" ");
};

strRemover = memoizeWith(identity, strRemover);

let propWriter = (propType = {}) => (propName = "") =>
  hasOwnProperty(
    propType,
    propName
  ) && propType[propName];

const sharedClass = (sharedProp = {}) =>
  propWriter(sharedProp)("class") + " " + propWriter(sharedProp)("className");
const specificClass = (specificProp = {}) =>
  propWriter(specificProp)("class") +
  " " +
  propWriter(specificProp)("className");

const classWriter = (specificProp = {}) => (sharedProp = {}) => {
  return strRemover(
    [specificClass(specificProp), sharedClass(sharedProp)].join(" ")
  )();
};

export {
  repeat,
  copy,
  memoizeWith,
  identity,
  commonKeys,
  cutLeft,
  hasOwnProperty,
  pick,
  classWriter
};

