<!-- don't pass this line => lllllllllllllllllllllllllllllllllllllllllllllll -->

<!-- [![Travis branch](https://img.shields.io/travis/Steadylearner/react-marked-markdown/master.svg?maxAge=2592000)]() -->

[![npm version](https://badge.fury.io/js/prop-passer.svg)](https://badge.fury.io/js/react-easy-md) [![npm](https://img.shields.io/npm/dt/prop-passer.svg?maxAge=2592000)]()

# Prop-Passer - Extract Common Props from React

Extract duplicate class, props and wrapper components such as **li**, **div**, **section** etc to write less React code and make them reusable.

 ___

![prop-passer](static/images/prop-passer.png)

```JavaScript
import React, { Component } from "react";
import {
  Prop,
  PropPasser,
  Passers,
  //
  P,
  share
  //
  key,
  //
  copy,
  repeat,
  // pass,
  // withKeys,
  // withProps,
} from "prop-passer";
```

___

## Install

- Npm: `npm install --save prop-passer`

- YARN: `yarn add prop-passer`

## Demos

 1. [prop-passer example with Codesandbox](https://codesandbox.io/s/8n3m4wy480)
 2. [CRA example](https://github.com/steadylearner/prop-passer/tree/master/examples/prop-passer-example)

They will be similar to this image.

![prop-passer-demo](static/images/prop-passer-example.png)
___

## Version Specific

 1. It is minified to save your time to do the same.
 2. `P` and `share` to help you copy and paste props from existing components.(You can use them instead of manually writing prop objects instead.)
 3. This will be the last major update for prop-passer API.

___

## API

Exports:

  1. **`Prop`** ➡ passes the same prop to every children elements.
  2. **`PropPasser`** ➡ When you want to pass prop and include a parent element also.(Prop and Sinlge parent wrapper element)
  3. **`Passers`** ➡ Plural version of PropPasser, It will pass wrapper elements with prop for every child elements.
  (Each child element has parent element with prop)
  4. **`P`** and **`share`** ➡ You can use it like `share(<P title="prop-passer"/>)` instead of manually converting `{title: "prop-passer"}` to pass props for **Prop, ProPasser and Passers**.
  5. **`key`** ➡ alphanumeric string with user given length **n** without large depenedency.
  6. `copy` ➡ copies elements user given **n** times. Use it for layout instead of using database seed for simple layout.
  7. `repeat` ➡ repeats function **n** times.

**`class, className, rewrite`** are reserved words to write CSS easily.

  every prop you define will be substitued at more specific level. But `class` and `className` will be placed together with existing ones.

    ex) class="this is class" className="this is className"
    ➡ className="this is class this is className"

  ➡ class names used with `rewrite` will substitue existing `class` or `className` or other `rewrite` at more specific level.

    ex) class="this is class", rewrite="this is to rewrite className"
        ➡ className="this is to rewrite className"
___

## Main API(Prop, PropPasser, Passers)

### Prop(sharedProp)

```js
// Import statements above for every example

const ImageProp = Prop(share(<P
  src="www.steadylearner.com/static/images/code/prop-passer.png"
  class="you can use class or className"
  alt="this will be shown"
/>));

// or with manually typing object

// const ImageProp = Prop({
//   src: "www.steadylearner.com/static/images/code/prop-passer.png"
//   class: "you can use class or className",
//   alt: "this will be shown",
// });

  return (
    <ImageProp>
      <img className="concat"/>
      <img class="concat also" />
      <img rewirte="I will rewrite and replace" />
      <img rewrite />
    </ImageProp>
  )

  // equals to

  <img
    src="www.steadylearner.com/static/images/code/prop-passer.png"
    class="you can use class or className concat"
    alt="this will be shown"
  />
  <img
    src="www.steadylearner.com/static/images/code/prop-passer.png"
    class="you can use class or className concat also"
    alt="this will be shown"
  />
  <img
    src="www.steadylearner.com/static/images/code/prop-passer.png"
    class="I will rewrite and replace"
    alt="this will be shown"
  />
  <img
    src="www.steadylearner.com/static/images/code/prop-passer.png"
    alt="this will be shown"
  />
```

When you use `share(<P />)`, You use external 70 bytes.

Normally you won't need to care for it. Because prop-passer reduce byte size in the end result
by removing duplicate props

___

### PropPasser(sharedProp)(parentProp)(parentElement)

```js
const ImagePropPasser = PropPasser(share(<P
  src="www.steadylearner.com/static/images/code/prop-passer.png"
  class="you can use class or className"
  alt="this will be shown"
/>))(class: "for section")("section");

  return (
    <ImagePropPasser>
      <img className="show also"/>
      <img rewirte="I will rewrite and replace" />
      <img rewrite />
    <ImagePropPasser>
  )

  // equals to code snippet below

  <section class="for section">
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      class="you can use class or className show also"
      alt="this will be shown"
    />
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      class="I will rewrite and replace"
      alt="this will be shown"
    />
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      alt="this will be shown"
    />
  </section>
```

It is just Prop and parent element for children elements.
___

### Passers(sharedProp)(parentProp)(parentElement)

```js
const ImagePassers = Passers(share(<P
  src="www.steadylearner.com/static/images/code/prop-passer.png"
  class="you can use class or className"
  alt="this will be shown"
  onClick={function(){
    console.log("You can pass the same functions to each child elements also.")
  }}
/>))(class: "for list")("li");

  return (
    <ImagePassers>
      <img className="concat"/>
      <img class="concat also" />
      <img rewirte="I will rewrite and replace" />
      <img rewrite />
    <ImagePassers>
  )

  // equals to pass wrapper <li></li> manually and no need to define key prop manually. "prop-passer" helps you.

  <li
    class="for list"
    key="p-xxxxx"
    style={{listStyle: "none"}}
  >
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      class="you can use class or className show"
      alt="this will be shown"
    />
  </li>
  <li
    class="for list"
    key="p-xxxxx"
    style={{listStyle: "none"}}
  >
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      class="you can use class or className show also"
      alt="this will be shown"
    />
  </li>
  <li
    class="for list"
    key="p-xxxxx"
    style={{listStyle: "none"}}
  >
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      class="I will rewrite and replace"
      alt="this will be shown"
    />
  </li>
  <li
    class="for list"
    key="p-xxxxx"
    style={{listStyle: "none"}}
  >
    <img
      src="www.steadylearner.com/static/images/code/prop-passer.png"
      alt="this will be shown"
    />
  </li>
```

It is just plular version of PropPasser and you don't have to manually copy and paste wrapper elements for every children.
___

### Key(times)

`key(10)` ➡ xxxxxxxxxx

You can make your own alphanumeirc numbers with `key(n)` for React Components.(We don't need large dependency for that.)

__

## Development API(Copy, Repeat)

### Copy(element)(times)

```JavaScript
  const image = <img src="www.steadylearner.com/static/images/code/prop-passer.png" >;

  const manyImages = copy(image)(1000);

  return (
    <section>
      {manyImages}
    </section>
  )

  // equals to

  <section>
    <img src="www.steadylearner.com/static/images/code/prop-passer.png" />
    //
    * 1000
    //
  </section>
```

Test it with string and images in your local machine.
___

### Repeat(function)(times)

```JavaScript
  repeat(function(){ console.log("repeat api from prop-passer, show it n times")})(n)
```

It show the message n times. Test in your local machine.
___

## Experimental API(pass, withKeys, withProps)

### pass

```JavaScript
import React, { Component } from "react";
import {
  pass,
} from "prop-passer";

let withPass = pass("li")({
  // 1. Write object with props for <li> element or use share(<P />) syntax for multiple props.
  // 2. You can pass anything you want
  // 3. key() shouldn't be included here for it will be the same for every children components
})([
  <p>prop-passer</p>,
  <h1>prop-passer</h1>,
  <h6>prop-passer</h6>,
  <p>prop-passer</p>,
]);

return(
  <section>
    <ul>{withPass}</ul>
  </section>
)

// will generate code below

<section>
  <ul>
    <li style={ { listStyle: "none" } } key="p-xxxxx" >
      <p>prop-passer</p>
    </li>
    <li style={ { listStyle: "none" } } key="p-xxxxx" >
      <h1>prop-passer</h1>
    </li>
    <li style={ { listStyle: "none" } } key="p-xxxxx" >
      <h6>prop-passer</h6>
    </li>
    <li style={ { listStyle: "none" } } key="p-xxxxx" >
      <p>prop-passer</p>
    </li>
  </ul>
</section>
```

This is just the reverse API of **Passers**.
___

### withKeys or withProps ([Object])(Key or prop {})

It will pass key or props object to React elements. For React protects key and props property name you wouldn't need it. But you can test it with array of objects to understand what prop-passer does.

___

## Read

1. [steadylearner Blog Page](www.steadylearner.com/blog/search/prop-passer)

2. [steadylearner Medium Post](https://medium.com/@steadylearner/)

3. [React Children API blog post](https://mxstbr.blog/2017/02/react-children-deepdive/)

## What is the next?

1. Tests
2. Posts

## `share(<P title="prop-paser" />)` syntax or not?

You can use object when there are few props. But you can use `share(<P title="prop-passser">)` syntax so that you can just copy and paste prop parts inside the valid scope.

You can test them at **CodeSandbox**.

1. [First manual test with sizeof](https://codesandbox.io/s/jn47p3v4ny)

2. [Test with Rust Chat App layout](https://codesandbox.io/s/u59hx)

## Summary

The main point of this package is to help you work less.

1. Extract common parts from your React app after you complete it.(Less code size.)

2. Define common props and wrapper components first and write React Code.(Prototype Properties and wrappers)