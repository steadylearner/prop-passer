// crypto package to genreate randomByte to make reactKey
// when they don't exist

import { randomBytes } from "crypto";

export default function randomCrypto() {
  return randomBytes(8);
}

// import { randomBytes } from "crypto";

// export default function randomCrypto() {
//   return randomBytes(16);
// };
