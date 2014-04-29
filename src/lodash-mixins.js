/**
 * @ngdoc service
 * @name core._
 * @description
 *
 * Injectable version of the {@link http://lodash.com lodash} utility library.
 * Use this instead of the globally scoped version.
 * This allows us to mock it when running unit tests.
 *
 * This will also contain any mixin functions for lodash. **PLEASE** document any mixin
 * functions and write tests for them!
 *
 * **Only mixin functions are documented below!**
 */

/**
 * @ngdoc method
 * @name core._#keysToUppercase
 * @methodOf core._
 * @description
 *
 * Capitalizes all keys of an object recursively and returns a new Object
 *
 * @param {Object} obj The object to peform the opertaion on.
 * @returns {Object} The newly created object.
 */
/**
 * @ngdoc method
 * @name core._#capitalize
 * @methodOf core._
 * @description
 *
 * Capitalizes the first character of a string
 *
 * @param {String} string The string to capitalize.
 * @returns {String} The newly created string.
 */
/**
 * @ngdoc method
 * @name core._#valuesToString
 * @methodOf core._
 * @description
 *
 * Turns on values on an object to a string.
 *
 * @param {Object|Array} array Object or array of object to convert
 * @returns {Array|Object} The array or object passed in.
 */
/**
 * @ngdoc method
 * @name core._#getTouches
 * @methodOf core._
 * @description
 *
 * Normalizes the object for getting touch/mouse coordinates.
 *
 * @param {Event} event The event to retrieve from.
 * @returns {Array} The array of touch/mouse events.
 */
/**
 * @ngdoc method
 * @name core._#isCommandKey
 * @methodOf core._
 * @description
 *
 * Determines if the key code is a command key
 *
 * @param {Number} code Keycode to check
 */
/**
 * @ngdoc method
 * @name core._#isModifierKey
 * @methodOf core._
 * @description
 *
 * Determines if the key code is a modifier key
 *
 * @param {Number} code Keycode to check
 */
/**
 * @ngdoc method
 * @name core._#isArrowKey
 * @methodOf core._
 * @description
 *
 * Determines if the key code is an arrow key
 *
 * @param {Number} code Keycode to check
 */
/**
 * @ngdoc method
 * @name core._#getCharString
 * @methodOf core._
 * @description
 *
 * Creates a string with specified character(s) of the specified amount.
 *
 * @param {String} char The character to repeat
 * @param {Number} amount The amount of characters
 */
/**
 * @ngdoc method
 * @name core._#mapKeys
 * @methodOf core._
 * @description
 *
 * Maps keys on an object to a different key name.
 *
 * @param {Object} obj The object to map keys on
 * @param {Object} map The map object. Keys are the keys to match and values are the names to map to.
 */
/**
 * @ngdoc method
 * @name core._#shiftArgs
 * @methodOf core._
 * @description
 *
 * Returns a function where the arguments are shift to the left.
 *
 * <pre>
 *   var fn = function() {
 *     console.log(arguments);
 *   };
 *
 *   var shiftedFn = _.shiftArgs(fn);
 *
 *   shiftedFn(1, 2, 3); // logs: [2, 3]
 * </pre>
 *
 * @param {Function} obj The object to map keys on
 * @param {Number} [amount=1] The amount of arguments to shift
 */
/**
 * @ngdoc method
 * @name core._#recursiveOverwrite
 * @methodOf core._
 * @description
 *
 * Recursively overwrites properties in an object and array while still keeping
 * the object references. Mostly used for overwriting model data from a service.
 * This will not work with complex objects, only plain objects.
 */
/**
 * @ngdoc method
 * @name core._#rAF
 * @methodOf core._
 * @description
 *
 * Returns a function that is wrapped in a requestAnimationFrame call.
 */
/**
 * @ngdoc method
 * @name core._#normalizeCfVariables
 * @methodOf core._
 * @description
 *
 * Recursively changes all the keys in an object into camelcase. Used mainly
 * for returned JSON data from ColdFusion.
 */
;(function(window, _) {
  "use strict";

  // Chainable mixins
  _.mixin({
    // String functions
    capitalize: function(string) {
      return string[0].toUpperCase() + string.slice(1);
    },
    httpToHttps: function(url) {
      return url.replace(/http:\/\//, "https://");
    },
    keysToUppercase: function(obj) {
      var output = {};
      _.forOwn(obj, function(value, key) {
        output[key.toUpperCase()] = _.isObject(value) ? _.keysToUppercase(value) : value;
      });
      return output;
    },
    getCharString: function(character, times) {
      var text = "";
      while (times--) {
        text += character;
      }
      return text;
    },
    removeNumberPadding: function(num) {
      return _.parseInt(num).toString();
    },
    camelToUnderscore: function(string) {
      return string.replace(/([A-Z])/g, function($1) {
        return "_" + $1.toLowerCase();
      });
    },
    underscoreToCamel: function(string) {
      return string.replace(/_[a-zA-Z]/g, function($1) {
        return $1.toUpperCase().replace("_", "");
      });
    },

    // Object functions
    getTouches: function(event) {
      event = event.originalEvent || event;
      return event.changedTouches && event.changedTouches.length ? event.changedTouches : event.touches && event.touches.length ? event.touches : [event];
    },
    cleanObject: function(object) {
      _.forOwn(object, function(value, key) {
        if (key[0] !== "$") {
          delete object[key];
        }
      });

      return object;
    },
    recursiveOverwrite: function(src, newSrc) {
      var returnArray = _.isArray(src);

      if (returnArray) {
        src = {
          data: src
        };
      }

      if (_.isArray(newSrc)) {
        newSrc = {
          data: newSrc
        };
      }

      _.each(newSrc, function(val, key) {
        if (_.isPlainObject(val) && _.has(src, key) && _.isPlainObject(src[key])) {
          src[key] = _.recursiveOverwrite(src[key], val);
        } else if (_.isArray(val) && _.has(src, key) && _.isArray(src[key])) {
          _.each(val, function(item, index) {
            var newItem = item;
            if ((_.isPlainObject(item) && _.isPlainObject(src[key][index])) || (_.isArray(item) && _.isArray(src[key][index]))) {
              newItem = _.recursiveOverwrite(src[key][index], item);
            }

            src[key][index] = newItem;
          });

          src[key].splice(val.length, src[key].length - val.length); // Trim the rest of the array
        } else {
          src[key] = val;
        }
      });

      return returnArray ? src.data : src;
    },
    setValue: function(array, obj) {
      _.each(array, function(el) {
        _.extend(el, obj);
      });

      return array;
    },
    valuesToString: function(array, keys) {
      var _array = _.isArray(array) ? array : [array];
      var output = _.map(_array, function(obj) {
        return _.mapValues(obj, function(val, key) {
          if (_.isUndefined(val)) {
            return val;
          }

          if (!_.isUndefined(keys)) {
            return _.contains(keys, key) ? val.toString() : val;
          } else {
            return val.toString();
          }
        });
      });

      return _.isArray(array) ? output : output[0];
    },
    mapKeys: function(obj, map) {
      _.forOwn(map, function(val, key) {
        if (obj.hasOwnProperty(key)) {
          obj[val] = obj[key];
          delete obj[key];
        }
      });
      return obj;
    },
    mergeInto: function(obj, dest) {
      return _.merge(dest, obj);
    },
    normalizeKeys: function(object) {
      _.forOwn(object, function(val, key) {
        var newKey = key;

        if (key === key.toUpperCase() || key.search("_") !== -1) {
          newKey = _.underscoreToCamel(key.toLowerCase());
          object[newKey] = object[key];
          delete object[key];
        }

        _.isPlainObject(object[newKey]) && _.normalizeKeys(object[newKey]);
      });

      return object;
    },

    // Function functions
    restrictCalls: function(fn, limit) {
      var calls = 0;
      var results;

      return function() {
        if (calls < limit) {
          results = fn.apply(this, arguments);
          calls++;
        }

        return results;
      };
    },
    pipe: function(value, fn) {
      return fn.apply(this, [value].concat(_.rest(arguments, 2)));
    },
    shiftArgs: function(fn, amount) {
      amount = amount || 1;
      return function() {
        return fn.apply(this, _.rest(arguments, amount));
      };
    },
    rAF: function(fn) {
      var args = _.rest(arguments);

      return function() {
        var args2 = args.concat(_.toArray(arguments));

        // If this isn't supported use a proper polyfill
        window.requestAnimationFrame(function() {
          fn.apply(this, args2);
        });
      };
    }
  });

  // Methods that are NOT chainable belong here
  _.mixin({
    containsAny: function(list) {
      return _(arguments)
        .rest()
        .pipe(function(args) {
          if (_.isArray(args[0])) {
            return args[0];
          }

          return args;
        })
        .map(function(item) {
          return _.contains(list, item);
        })
        .any();
    },
    isCommandKey: function(code) {
      return code === 91;
    },
    isModifierKey: function(code) {
      return 15 < code && code < 19;
    },
    isArrowKey: function(code) {
      return 37 <= code && code <= 40;
    }
  }, {
    chain: false
  });

}(window, _));
