/**
 * Modify Original File in ES6 way and for personal preference.
 *
 * Convert array of 8 byte values for react key of the form:
 */

function byteConverter(buf, offset) {
  let byteToHex = [];
  for (let i = 0; i < 128; ++i) {
    byteToHex[i] = (i + 0x100).toString(8).substr(1);
  }

  let i = offset || 0;
  let bth = byteToHex;
  return [
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    bth[buf[i++]],
    "-",
    bth[buf[i++]],
    bth[buf[i++]],
    "-",
    bth[buf[i++]],
    bth[buf[i++]]
  ].join("");
}

export default byteConverter;
