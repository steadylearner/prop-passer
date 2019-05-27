import { commonKeys, hasOwnProperty, pick, classWriter } from "./function";

// ramda hasOwnProperty function equals to hasOwnPropertyOwnProperty with name _hasOwnProperty
// but it is difficult to import

// Children element can overwrite props passed from parent element by specify it in JSX.
// Process order here matters.
// Problem with when concat classNameWriter and it affects classWriter

// propWrite and
const propWriter = (specificProp = {}) => (sharedProp = {}) => {

  // [What this code does?]
  // If every commonKeys are not reserved, then return pick(commonProp)(specificProp);
  // otherwise, return {}

  const reserved = ["class", "className", "rewrite"];

  const isReserved = (value) => {
    return reserved.includes(value);
  }

  const notReserved = (value) => {
    return !(isReserved(value));
  }

  const commonProp = commonKeys(specificProp)(sharedProp).filter(notReserved);

  // equals to

  // const commonProp = commonKeys(specificProp)(sharedProp).filter(
  //   value => value !== "class" && value !== "className" && value !== "rewrite"
  // );

  // We can use array syntax instead of (&& and !==) every time

  if (commonProp.length !== 0) {
    return pick(commonProp)(specificProp);
  }

  return {};
};

const classReWriter = (dataType = {}) => {
  if (dataType === undefined || dataType === {}) {
    return {};
  }

  // You can use some or every here with isReserved above if necessary
  // you may use rewrite, important etc also with rewrite for the same purpose
  // (Can be functional code instead impreative code here)

  if (
    hasOwnProperty(
      dataType,
      "rewrite"
    )
  ) {
    let { rewrite } = dataType;

    // When you pass just rewrite inside JSX
    if (rewrite === true) {
      return {
        className: true, // No class for children elements
        rewrite: true // Not to show rewrite in HTML
      };
    }

    if (rewrite !== undefined) {
      return {
        className: `${rewrite}`,
        rewrite: true
      };
    }
  }

  return {};
};

export {
  propWriter,
  classWriter,
  classReWriter
};

