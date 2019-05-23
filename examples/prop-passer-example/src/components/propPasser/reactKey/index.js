// import secret from "./withCrypto/";

const key = (length = 5) => {
  {
    let charSet = "FGHIJNPQRSTUVWXYfghijpqrstuvwxy125678";
    return [...Array(length)].reduce(
      init => init + charSet[~~(Math.random() * charSet.length)],
      ""
    );
  }
};

export {
  key
  // secret
};
