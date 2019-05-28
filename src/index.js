// https://babeljs.io/repl
import React, { cloneElement, createElement, Children, Fragment } from "react";
import { P, share, withProps, withKeys } from "./share";
import { key } from "./reactKey/";
import { copy, repeat, cutLeft, } from "./function";

// Easily copy and paste with share(<P title="prop-passer", class="steadylearner"></P>) syntax
// instead of manually con {title: "prop-passer", class: "steadylearner"} with (share and P)

// They become reactCloneProp which is the main code of this package.
import {
  propWriter, // rewrites props execpt those common in jsx of childrenProp
  classWriter,
  classReWriter
} from "./api";

const { map } = Children;

// reactjs.org/docs/react-api.html#reactchildren
// https: // https://www.fullstackreact.com/30-days-of-react/day-13/

// We use shallow copy everywhere for this package.
// So don't use heavily nested object with it.

// spread operator will help you overwrite without specific logic,
// even though it needs more process

// API behind to make all prop-passer API work
const reactCloneProp = (child = {}) => (childrenProp = {}) => {
  let x =
    cutLeft()(classWriter(child.props)(childrenProp)) === ""
      ? true
      : cutLeft()(classWriter(child.props)(childrenProp));
  return cloneElement(child, {
    ...childrenProp,
    ...propWriter(child.props)(childrenProp),
    ...{ className: x },
    ...classReWriter(childrenProp),
    ...classReWriter(child.props)
  });
};

// Process order is important and also have to be filtered in propWrite
const reactCloneMap = (props = {}) => (childrenProp = {}) => {
  return map(props.children, child => reactCloneProp(child)(childrenProp));
};

// when li element is parent - pass keys to li(parent element here)
const reactCreateMap = (props = {}) => (childrenProp = {}) => (
  parentProp = {}
) => (parentElement = {}) => {
  return map(props.children, child => {
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
      reactCloneProp(child)(childrenProp)
    );
  });
};

//

// Pass prop without making element
const Prop = (childrenProp = {}) =>
  function Property(props = {}) {
    return (
      <Fragment>
        {reactCloneMap(props)({
          ...childrenProp
        })}
      </Fragment>
    );
  };

// Prop + React API to make parent element with prop for children components
const PropPasser = (childrenProp = {}) => (parentProp = {}) => (
  parentElement = Fragment
) =>
  function Property(props = {}) {
    return createElement(
      parentElement,
      { ...parentProp },
      reactCloneMap(props)({
        ...childrenProp
      })
    );
  };

const Passers = (childrenProp = {}) => (parentProp = {}) => (
  parentElement = Fragment
) =>
  function Property(props = {}) {
    return reactCreateMap(props)({
      ...childrenProp
    })(parentProp)(parentElement);
  };

// Reverse API of Passers

const pass = (parentElement = Fragment) => (parentProp = {}) => (
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

export {
  Prop,
  PropPasser,
  Passers,
  P,
  share,
  //
  key,
  //
  copy,
  repeat,
  //
  pass,
  withProps,
  withKeys,
  //
  reactCloneProp,
  reactCloneMap,
  reactCreateMap,
};