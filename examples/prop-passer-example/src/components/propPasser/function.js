import { memoizeWith, identity, pick } from "./ramda";
// import { classWriter, hasOwnProperty } from "./classWriter";

// because of key -> meoizeWith not valid?
// use it to find whether there are common props from prop-passer and components
let commonKeys = (specificProp = {}) => (sharedProp = {}) => {
  let keys = [];
  for (let i in specificProp) {
    if (i in sharedProp) {
      keys.push(i);
    }
  }
  return keys;
};

// only use it for pure function
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

// const objectFromArray = (array = []) => {
//   return Object.assign({}, ...array);
// };

const copy = (element = {}) => (times = 1) => {
  if (times > 1000) {
    console.warn("'copy' may pause your system");
  }
  return Array(times).fill(element);
};

const hasOwnProperty = (obj = {}) => (name = "") =>
  Object.prototype.hasOwnProperty.call(obj, name);

// to remove undefined from the props in components
let removeUnwantedStr = (x = "") => (y = "undefined") => {
  return x
    .split(" ")
    .filter(x => x !== y)
    .join(" ");
};

removeUnwantedStr = memoizeWith(identity, removeUnwantedStr);

// to make own props used instead of props passed from prop-passer components
let propWriter = (propType = {}) => (propName = "") =>
  hasOwnProperty(propType, propName) && propType[propName];

// class and className is treated especailly and
const sharedClass = (sharedProp = {}) =>
  propWriter(sharedProp)("class") + " " + propWriter(sharedProp)("className");
const specificClass = (specificProp = {}) =>
  propWriter(specificProp)("class") +
  " " +
  propWriter(specificProp)("className");

const classWriter = (specificProp = {}) => (sharedProp = {}) => {
  // when each propWriter inside sharedClass and specificClass return undefined
  // remove it from the result
  return removeUnwantedStr(
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
