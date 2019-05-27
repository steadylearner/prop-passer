import crypto from "./crypto";
import byteConverter from "./byteConverter";

// It may be rewritten without dependency and less numbers
// This is just to make protoype.

function secret(options, buf, offset) {
  let i = (buf && offset) || 0;

  if (typeof options === "string") {
    buf = options === "binary" ? new Array(8) : null;
    options = null;
  }
  options = options || {};

  let rnds = options.random || (options.crypto || crypto)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (let ii = 0; ii < 8; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || byteConverter(rnds);
}

module.exports = secret;
