/**
 * This function accept an object with keys that has period (.) in it,
 * and transform it into a nested object.
 *
 * @param {Object} original
 *
 * @returns {Object}
 *
 * @throws Will throw an error if there is any collision in when trying to transform the object.
 *
 * @example
 * transformConstants({ 'A.B.C': 'ABC', 'A.D': 'AD', 'Q.W.E': 'QWE'});
 * => {
 *  A: {
 *    B: {
 *      C: 'ABC',
 *    },
 *    D: 'AD',
 *  },
 *  Q: {
 *    W: {
 *      E: 'QWE',
 *    },
 *  },
 * }
 */
const transformConstants = (original = {}) => {
  const keys = Object.keys(original);
  const transformed = {};

  keys.forEach(key => {
    const splittedKey = key.split('.');

    if (splittedKey.length === 1) {
      if (typeof transformed[key] !== 'undefined') {
        // the key already exists, this means a collision happened!
        throw new Error('Original object to be transformed contains collision! #1');
      }

      transformed[key] = original[key];
    } else {
      // `temp` will act as our cursor.
      let temp = transformed[splittedKey[0]] || {};
      // outerMostObject is our reference to the object so we can assign it later
      const outerMostObject = temp;

      splittedKey.forEach((keyPath, index) => {
        const isFirst = index === 0;

        if (isFirst) return;

        const isLast = index === splittedKey.length - 1;

        if (!isLast) {
          // if property doesn't exist yet, we create it
          if (!temp[keyPath]) {
            temp[keyPath] = {};
          }

          // and move our cursor into it
          temp = temp[keyPath];
        } else {
          // end of key, let's finally set the value
          if (typeof temp[keyPath] !== 'undefined') {
            // the key already exists, this means a collision happened!
            throw new Error('Original object to be transformed contains collision! #2');
          }

          temp[keyPath] = original[key];
        }
      });

      // assign outerMostObject to the transformed Object
      transformed[splittedKey[0]] = outerMostObject;
    }
  });

  return transformed;
};

export default transformConstants;
