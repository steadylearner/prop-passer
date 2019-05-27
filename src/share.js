// extractPropertyObjectFromJSX
const share = ({ props = {} }) => {
  return props;
};

const P = () => {}; // return undefined

// https://codesandbox.io/s/jn47p3v4ny
// 70 bytes is the minimum cost of using share(<P />) syntax
// instead of converting object yourself.

// import React from "react";
// console.log(<P />);

// {
//  type: function P() {}
//  key: null
//  ref: null
//  props: Object
//  _owner: null
//  _store: Object
// }

// They don't work for React Objects because those properties are protected by React.
// but you can use it to learn what prop-passer and key do
const withProps = (components = [{}]) => (props = {}) => {
  return components.map(x => {
    x.props = props;
    return x;
  });
}

const withKeys = (components = [{}]) => (key = "p-xxxxx") => {
  return components.map(x => {
    x.key = key;
    return x;
  });
}

export {
  share, P,
  //
  withProps, withKeys
}
