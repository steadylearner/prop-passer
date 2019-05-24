// extractPropertyObjectFromJSX
const share = ({ props = {} }) => {
  return props;
};

const P = () => {}; // return undefined

// It doesn't work for React Objects but you can use it to learn
// what prop-passer and key do
const withProps = (components = [{}]) => (props = {}) => {
  return components.map(x => { 
    x.props = props;
    return x; 
  });
}

const withKeys = (componenets = [{}]) => (key = "p-xxxxx") => {
  return components.map(x => {
    x.key = key;
    return x;
  });
}

// https://codesandbox.io/s/jn47p3v4ny

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

export {
  share,
  P,
}
