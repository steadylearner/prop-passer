import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  copy, // copy, // copy element n times, for placeholders
  repeat, // repeat, // repeat function n times
  key, // alphanumeric with xxxxx form by default, key(n)
  pass, // similar to Passers
  Prop, // means Property
  PropPasser, // make wrapper to each children with prop
  Passers // Plural of PropPasser,
} from "./propPasser";
// or from "prop-passer" NPM Package
// => They are same except showing title for the key

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailShareButton,

  // Comment to sepaate, overwriting codesandbox behavior
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share"; // https://github.com/nygardk/react-share/

function wrap(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}

const Test = wrap(React.createElement("h1", { title: "what" }, "text"));

export default class SocialShare extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: "",
    url: ""
  };

  render() {
    const { title, url } = this.props;

    /**
     * What was repeating here?
     *
     * 1. <div className="network">
     * 2. For share buttons shareLink, title and className
     * 3. For Icons size and round attribute
     * 4. For share count url and className
     */

    /**
     * How to reduce code?
     *
     * 1. copy - not repeat same elements or placeholder
     * 2. Pass - When you want to wrtie dynamcially but don't want to wrapper elements.
     *         - key is auto genereated for <li></li> wrapeer elemnts
     * 3. Prop - pass props to children elements without affecting structure.
     * 4. Propasser - Role of Prop and includes parent element.
     * 5. Passers - similar to Pass in this case you include all your code inside return block
     *            - key is auto generated for <li></li> also
     * 6. key - You can make your key with specific length -> key(n)
     *        - You shouldn't use it inside prop part(object) for prop-passer moduels.
     *        - You have to manually pass it to each JSX if you want
     *
     * Note) 1. You have to pass valid React API data for passers
     *       -> https://reactjs.org/docs/react-api.html#createelement
     *       2. You shouldn't use just a string with prop-passer moduels.
     */

    const ImageProp = Prop({
      src: url,
      style: {
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
        margin: "0 1rem 0 0.1rem"
      },
      alt: "placeholder",
      className: "You can use both class and className",
      title: "This can be overwritten.",
      onMouseOver: repeat(function() {
        console.log("You can pass function also, repeat 15 times");
      })(15)
    });

    const ShareList = Passers({
      url,
      title: "You can pass anything you want for React Prop",
      className: "network__share-button",
      // rewrite: "remove and replace existing class",
      // rewrite: true // remove class prop,
      style: {
        //  opacity: 0.5 // You can use inline style instead
      }
    })({ className: "network" })("li");

    let original = <h1>will be copied a thousand times</h1>;
    let copyExample = copy(original)(1000);
    // => equals writing <h1>will be copied</h1> x 500 manually
    // => for placeholder of images, list, dropdown etc
    // => use {copyExample} inside return()

    let withPass = pass("li")({
      // key() shouldn't be included here
      // p-xxxxx is given by default for pass and Passers
    })([
      <span>placeholder</span>,
      <h1>placeholder</h1>,
      <h6>placeholder</h6>,
      <p>placeholder</p>,
      <p>placeholder</p>
      // <p>use key prop here if you want custom value</p>
    ]);

    // => {withpass} inside return()

    // equals to writing
    // <li key="p-xxxxx"><span>placeholder</span></li>
    // <li key="p-xxxxx"><h1>placeholder</h1></li>
    // <li key="p-xxxxx"><h6>placeholder</h6></li>
    // <li key="p-xxxxx"><p>placeholder</p></li>
    // <li key="p-xxxxx"><p>placeholder</p></li>
    // {style: { list-style: "none" } } is given by default.
    // You can use your own if you dont like default values.

    return (
      <section className="c-network">
        <ShareList>
          <FacebookShareButton quote={title}>
            <FacebookIcon
              size={"2rem"} // You can use rem value instead of numbers
              round
            />
          </FacebookShareButton>

          <TwitterShareButton title={title}>
            <TwitterIcon size={"2rem"} round />
          </TwitterShareButton>

          <WhatsappShareButton title={title} separator=":: ">
            <WhatsappIcon size={"2rem"} round />
          </WhatsappShareButton>

          <LinkedinShareButton
            title={title}
            windowWidth={750}
            windowHeight={600}
          >
            <LinkedinIcon size={"2rem"} round />
          </LinkedinShareButton>

          <PinterestShareButton
            url={String(window.location)}
            media={`${url}`}
            windowWidth={1000}
            windowHeight={730}
          >
            <PinterestIcon size={"2rem"} round />
          </PinterestShareButton>

          <VKShareButton image={`${url}`} windowWidth={660} windowHeight={460}>
            <VKIcon size={"2rem"} round />
          </VKShareButton>
          <EmailShareButton subject={title} body="body">
            <EmailIcon size={"2rem"} round />
          </EmailShareButton>
          <ImageProp>
            <img
              alt="This will be shown instead alt data specified above"
              class="
              class and className are reserved words, 
              they will have their place with existing ones.
              "
              rewrite="
              will remove existing ones(class or className) anyway
              "
            />
            <img
              rewrite="thumbnail the more specific rewrite wins."
              class="
                More specifc class will show before common class
              "
              title="Props are overwritten at JSX level."
              alt="This will be shown instead of one specified above"
            />
          </ImageProp>
          {Test}
        </ShareList>
      </section>
    );
  }
}
