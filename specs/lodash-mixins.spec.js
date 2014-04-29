describe("keysToUppercase", function() {
  it("should capitalize all keys recursively", function() {
    var obj = {
      test_key: {
        nested_test_key: {
          one_more: true
        }
      },
      test_key_2: false
    };

    var cObj = _.keysToUppercase(obj);

    expect(_.keys(cObj)[0]).toBe("TEST_KEY");
    expect(_.keys(cObj)[1]).toBe("TEST_KEY_2");
    expect(cObj.TEST_KEY).toBeDefined();
    expect(cObj.TEST_KEY.NESTED_TEST_KEY).toBeDefined();
    expect(cObj.TEST_KEY.NESTED_TEST_KEY.ONE_MORE).toBeDefined();
  });
});

describe("capitalize", function() {
  it("should capitalize a string", function() {
    expect(_.capitalize("test")).toBe("Test");
  });
});

describe("getTouches", function() {
  it("should get the correct touch object", function() {
    var event = {changedTouches: [{x: 10}]};
    expect(_.getTouches(event)[0].x).toBe(10);

    event = {touches: [{x: 10}]};
    expect(_.getTouches(event)[0].x).toBe(10);

    event = {x: 10};
    expect(_.getTouches(event)[0].x).toBe(10);
  });
});

describe("cleanObject", function() {
  it("should delete all keys from an object except keys prefixed with '$'", function() {
    var obj = {test: "HI", test2: "BORG", $test: "BORG"};
    var cleaned = _.cleanObject(obj);

    expect(obj.test).toBeUndefined();
    expect(obj.test2).toBeUndefined();
    expect(obj.$test).toBe("BORG");
    expect(cleaned.test).toBeUndefined();
    expect(cleaned.test2).toBeUndefined();
    expect(cleaned.$test).toBe("BORG");

    expect(obj).toBe(cleaned);
  });
});
describe("httpToHttps", function() {
  it("should change the protocol of a url string", function() {
    expect(_.httpToHttps("http://google.com")).toBe("https://google.com");
  });
});

describe("valuesToString", function() {
  it("should convert all keys to a string", function() {
    var converted = _.valuesToString({
      number: 1500,
      string: "Hello",
      object: {}
    });

    expect(converted.number).toBe("1500");
    expect(converted.string).toBe("Hello");
    expect(converted.object).toBe({}.toString());
  });

  it("should convert a select number of keys to a string", function() {
    var converted = _.valuesToString({
      test: 123,
      test2: 1234,
      test3: 12345
    }, ["test2", "test3"]);

    expect(converted.test).toBe(123);
    expect(converted.test2).toBe("1234");
    expect(converted.test3).toBe("12345");
  });
});

describe("isCommandKey", function() {
  it("should return 'true'", function() {
    expect(_.isCommandKey(91)).toBe(true);
  });
  it("should return 'false'", function() {
    expect(_.isCommandKey(92)).toBe(false);
  });
});

describe("isModifierKey", function() {
  it("should return 'true'", function() {
    expect(_.isModifierKey(16)).toBe(true);
  });
  it("should return 'false'", function() {
    expect(_.isModifierKey(1)).toBe(false);
  });
});

describe("isArrowKey", function() {
  it("should return 'true'", function() {
    expect(_.isArrowKey(38)).toBe(true);
  });
  it("should return 'false'", function() {
    expect(_.isArrowKey(1)).toBe(false);
  });
});

describe("getCharString", function() {
  it("should output the character number of characters", function() {
    expect(_.getCharString("*", 5)).toBe("*****");
  });
});

describe("setValue", function() {
  it("should set the value on each object in the array", function() {
    var array = [{}, {}];
    _.setValue(array, {test: true});

    expect(array[0].test).toBe(true);
    expect(array[1].test).toBe(true);
  });
});

describe("mapKeys", function() {
  it("should map the keys on the object", function() {
    var obj = {test: "BLAH", test2: "BLORG"};
    _.mapKeys(obj, {test: "newKey1", test2: "newKey2"});

    expect(obj.newKey1).toBe("BLAH");
    expect(obj.newKey2).toBe("BLORG");
    expect(obj.test).toBeUndefined();
    expect(obj.test2).toBeUndefined();
  });
});

describe("restrictCalls", function() {
  it("should restrict the function calls to the limit", function() {
    var spy = jasmine.createSpy();
    var fn = _.restrictCalls(spy, 1);

    fn();
    fn();
    fn();
    fn();
    fn();

    expect(spy.calls.count()).toBe(1);
  });
});

describe("mergeInto", function() {
  it("should merge an object into the other", function() {
    var src = {
      test: "boo"
    };

    var dest = {
      test2: "hi"
    };

    var result = _.mergeInto(src, dest);

    expect(result.test).toBe("boo");
    expect(result.test2).toBe("hi");
  });
});

describe("removeNumberPadding", function() {
  it("should remove leading padding off of string numbers", function() {
    expect(_.removeNumberPadding("02")).toBe("2");
    expect(_.removeNumberPadding("00005")).toBe("5");
  });
});

describe("pipe", function() {
  it("should pipe the object to a modifier function", function() {
    var obj = {
      test: "hello"
    };

    var modifier = function(obj, arg1) {
      obj.message = arg1;
      return obj;
    };

    var output = _.pipe(obj, modifier, "arg1");

    expect(output.message).toBe("arg1");
    expect(obj.message).toBe("arg1");
  });
});

describe("shiftArgs", function() {
  it("should shift the arguments of the function", function() {
    var fn = function(arg1) {
      return arg1;
    };

    expect(_.shiftArgs(fn, 2)("test", "test2", "test3")).toBe("test3");
    expect(_.shiftArgs(fn)("test", "test2", "test3")).toBe("test2");
  });
});

describe("recursiveOverwrite", function() {
  var src, newSrc;

  beforeEach(function() {
    src = {
      hash: 123,
      keyString: "test",
      keyObject: {
        nestedKey1: {
          nestedKey2: 10
        }
      },
      keyArray: [{}, 2, {}, {}, {}]
    };

    newSrc = {
      keyString: "test18",
      keyObject: {
        nestedKey1: {
          nestedKey2: 20
        }
      },
      keyArray: [{
        test: "test"
      }, {}, 2]
    };
  });

  it("should recursively overwrite properties in the source object", function() {
    var result = _.recursiveOverwrite(src, newSrc);

    expect(result.keyString).toBe("test18");
    expect(result.keyObject).toBe(src.keyObject);
    expect(result.keyObject.nestedKey1).toBe(src.keyObject.nestedKey1);
    expect(result.keyObject.nestedKey1.nestedKey2).toBe(20);
    expect(result.keyArray).toBe(src.keyArray);
    expect(result.keyArray.length).toBe(3);
    expect(result.hash).toBe(123);

    expect(result.keyArray[0]).toBe(src.keyArray[0]);
    expect(result.keyArray[0].test).toBe("test");
    expect(_.isObject(result.keyArray[1])).toBe(true);
    expect(result.keyArray[2]).toBe(2);
  });

  it("should recusively merge arrays as a top level", function() {
    var copiedSrc = _.cloneDeep(src);
    var tempSrc = [src, copiedSrc];
    var tempNewSrc = [newSrc, _.cloneDeep(newSrc)];

    var resultArray = _.recursiveOverwrite(tempSrc, tempNewSrc);
    var result1 = resultArray[0];

    expect(result1.keyString).toBe("test18");
    expect(result1.keyObject).toBe(src.keyObject);
    expect(result1.keyObject.nestedKey1).toBe(src.keyObject.nestedKey1);
    expect(result1.keyObject.nestedKey1.nestedKey2).toBe(20);
    expect(result1.keyArray).toBe(src.keyArray);
    expect(result1.keyArray.length).toBe(3);
    expect(result1.hash).toBe(123);

    expect(result1.keyArray[0]).toBe(src.keyArray[0]);
    expect(result1.keyArray[0].test).toBe("test");

    var result2 = resultArray[1];

    expect(result2.keyString).toBe("test18");
    expect(result2.keyObject).toBe(copiedSrc.keyObject);
    expect(result2.keyObject.nestedKey1).toBe(copiedSrc.keyObject.nestedKey1);
    expect(result2.keyObject.nestedKey1.nestedKey2).toBe(20);
    expect(result2.keyArray).toBe(copiedSrc.keyArray);
    expect(result2.keyArray.length).toBe(3);
    expect(result2.hash).toBe(123);

    expect(result2.keyArray[0]).toBe(copiedSrc.keyArray[0]);
    expect(result2.keyArray[0].test).toBe("test");
  });
});

describe("underscoreToCamel", function() {
  it("should convert a snake case string to camel case", function() {
    expect(_.underscoreToCamel("my_snake_case_variable")).toBe("mySnakeCaseVariable");
  });
});

describe("normalizeKeys", function() {
  it("should recursivley convert all keys to camel case", function() {
    var obj = {
      MY: "test",
      ANOTHER_dumb_Var: "test",
      SOME_OBJECT: {
        NESTED_VAR: "test"
      }
    };

    _.normalizeKeys(obj);

    expect(obj.my).toBeDefined();
    expect(obj.anotherDumbVar).toBeDefined();
    expect(obj.someObject).toBeDefined();
    expect(obj.someObject.nestedVar).toBeDefined();
    expect(obj.MY).toBeUndefined();
    expect(obj.ANOTHER_dumb_Var).toBeUndefined();
    expect(obj.SOME_OBJECT).toBeUndefined();
  });
});

describe("camelToUnderscore", function() {
  it("should convert a camel case string to snake case", function() {
    expect(_.camelToUnderscore("mySnakeCaseVariable")).toBe("my_snake_case_variable");
  });
});

describe("rAF", function() {

  it("should wrap the function in a request animation frame call", function() {
    var fn = jasmine.createSpy();

    var wrapped = _.rAF(fn, "arg1");
    
    wrapped("test");

    expect(fn).not.toHaveBeenCalled();

    window.requestAnimationFrame.flush();

    expect(fn).toHaveBeenCalledWith("arg1", "test");
  });
});

describe("containsAny", function() {
  it("should return true when the array contains any of the arguments", function() {
    expect(_.containsAny(["test"], "hi", "test")).toBe(true);
  });

  it("should return true when the array contains any of the array argument", function() {
    expect(_.containsAny(["test"], ["hi", "test"])).toBe(true);
  });

  it("should return false when the array does not contain any of the arguments", function() {
    expect(_.containsAny(["blorg"], "hi", "test")).toBe(false);
  });

  it("should return false when the array contains any of the array argument", function() {
    expect(_.containsAny(["blorg"], ["hi", "test"])).toBe(false);
  });
});
