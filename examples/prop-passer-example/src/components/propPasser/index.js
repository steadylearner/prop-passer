// https://babeljs.io/repl
import React, { cloneElement, createElement, Children, Fragment } from "react";
import { key } from "./reactKey/";
import { cutLeft, copy, repeat } from "./function";
// You shouldn't use only text prop-passer below, they should have valid JSX syntax

import {
  propWriter, // rewrites props execpt those common in jsx of sharedProp
  classWriter,
  classReWriter
} from "./api";
const { map } = Children;

export { copy, repeat, key };

//reactjs.org/docs/react-api.html#reactchildren
// https: // https://www.fullstackreact.com/30-days-of-react/day-13/

// spread operator will help you overwrite without specific logic, even though it needs more process
// sharedProp is shared to sub components of prop-passer elements
export const reactCloneProp = (child = {}) => (sharedProp = {}) => {
  let x =
    cutLeft()(classWriter(child.props)(sharedProp)) === ""
      ? true
      : cutLeft()(classWriter(child.props)(sharedProp));
  return cloneElement(child, {
    ...sharedProp,
    ...propWriter(child.props)(sharedProp),
    //
    ...{ className: x },
    //
    ...classReWriter(sharedProp),
    ...classReWriter(child.props)
  });
};

// Process order is important and also have to be filtered in propWrite
export const reactCloneMap = (props = {}) => (sharedProp = {}) => {
  return map(props.children, child => reactCloneProp(child)(sharedProp));
};

// when li element is parent - pass keys to li(parent element here)
export const reactCreateMap = (props = {}) => (sharedProp = {}) => (
  parentProp = {}
) => (parentElement = {}) => {
  return map(props.children, child => {
    // to make listStyle none by default but you can still define your own prop for it
    let conditionalParentProp =
      parentElement === "li"
        ? {
            // title: `p-${key(5)}`, this is only for test
            key: `p-${key(5)}`,
            style: {
              listStyle: "none"
            },
            ...parentProp
          }
        : { ...parentProp };

    return createElement(
      parentElement,
      { ...conditionalParentProp },
      reactCloneProp(child)(sharedProp)
    );
  });
};

// Pass prop without making element
export const Prop = (sharedProp = {}) =>
  function Property(props = {}) {
    return (
      <Fragment>
        {reactCloneMap(props)({
          ...sharedProp
        })}
      </Fragment>
    );
  };

// Prop + React API to make single element with prop
export const PropPasser = (sharedProp = {}) => (parentProp = {}) => (
  parentElement = Fragment
) =>
  function Property(props = {}) {
    return createElement(
      parentElement,
      { ...parentProp },
      reactCloneMap(props)({
        ...sharedProp
      })
    );
  };

export const Passers = (sharedProp = {}) => (parentProp = {}) => (
  parentElement = Fragment
) =>
  function Property(props = {}) {
    return reactCreateMap(props)({
      ...sharedProp
    })(parentProp)(parentElement);
  };


export const pass = (parentElement = Fragment) => (parentProp = {}) => (
  arrayOfChildren = []
) => {
  return arrayOfChildren.map(i => {
    let conditionalParentProp =
      parentElement === "li"
        ? {
            // title: `p-${key(5)}`, this is only for test and development
            key: `p-${key(5)}`,
            style: {
              listStyle: "none"
            },
            ...parentProp
          }
        : { ...parentProp };
    return React.createElement(parentElement, conditionalParentProp, i);
  });
}; // spread with Passers with li