// From Ramda.js, To copy common objects from more specific(otherwise children) element
const pick = (name = []) => (obj = {}) => {
  let result = {};
  let idx = 0;
  while (idx < name.length) {
    if (name[idx] in obj) {
      result[name[idx]] = obj[name[idx]];
    }
    idx += 1;
  }
  return result;
};

export default pick;
