import { commonKeys, hasOwnProperty, pick, classWriter } from "./function";

// ramda hasOwnProperty function equals to hasOwnPropertyOwnProperty with name _hasOwnProperty
// but it is difficult to import

// -> Children element can overwrite props passed
// from parent element by specify it in JSX.
// process order here matters.
// Have problem with classNameWriter concat and it affects classWriter

// propWriter is main api
const propWriter = (specificProp = {}) => (sharedProp = {}) => {
  // not to make it work for special keywords
  let commonProp = commonKeys(specificProp)(sharedProp).filter(
    value => value !== "class" && value !== "className" && value !== "rewrite"
  );

  if (commonProp.length !== 0) {
    return pick(commonProp)(specificProp);
  }

  return {};
};

// it is to help classWriter
// you can use it when you don't like class is not replaced but used together
const classReWriter = (dataType = {}) => {
  if (dataType === undefined || dataType === {}) {
    return {};
  }

  if (
    hasOwnProperty(
      dataType,
      "rewrite"
    )
  ) {
    // When you pass just rewrite inside JSX
    let { rewrite } = dataType;

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

export { propWriter, classWriter, classReWriter };
