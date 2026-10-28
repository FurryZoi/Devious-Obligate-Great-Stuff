// DOGS: Devious Obligate Great Stuff
if (typeof window.ImportBondageCollege !== "function") {
  alert("Club not detected! Please only use this while you have Club open!");
  throw "Dependency not met";
}
"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result) __defProp(target, key, result);
    return result;
  };

  // node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata/Reflect.js
  var require_Reflect = __commonJS({
    "node_modules/.pnpm/reflect-metadata@0.2.2/node_modules/reflect-metadata/Reflect.js"() {
      "use strict";
      var Reflect2;
      (function(Reflect3) {
        (function(factory) {
          var root2 = typeof globalThis === "object" ? globalThis : typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : sloppyModeThis();
          var exporter = makeExporter(Reflect3);
          if (typeof root2.Reflect !== "undefined") {
            exporter = makeExporter(root2.Reflect, exporter);
          }
          factory(exporter, root2);
          if (typeof root2.Reflect === "undefined") {
            root2.Reflect = Reflect3;
          }
          function makeExporter(target, previous) {
            return function(key, value) {
              Object.defineProperty(target, key, { configurable: true, writable: true, value });
              if (previous)
                previous(key, value);
            };
          }
          function functionThis() {
            try {
              return Function("return this;")();
            } catch (_) {
            }
          }
          function indirectEvalThis() {
            try {
              return (void 0, eval)("(function() { return this; })()");
            } catch (_) {
            }
          }
          function sloppyModeThis() {
            return functionThis() || indirectEvalThis();
          }
        })(function(exporter, root2) {
          var hasOwn = Object.prototype.hasOwnProperty;
          var supportsSymbol = typeof Symbol === "function";
          var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
          var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
          var supportsCreate = typeof Object.create === "function";
          var supportsProto = { __proto__: [] } instanceof Array;
          var downLevel = !supportsCreate && !supportsProto;
          var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate ? function() {
              return MakeDictionary(/* @__PURE__ */ Object.create(null));
            } : supportsProto ? function() {
              return MakeDictionary({ __proto__: null });
            } : function() {
              return MakeDictionary({});
            },
            has: downLevel ? function(map, key) {
              return hasOwn.call(map, key);
            } : function(map, key) {
              return key in map;
            },
            get: downLevel ? function(map, key) {
              return hasOwn.call(map, key) ? map[key] : void 0;
            } : function(map, key) {
              return map[key];
            }
          };
          var functionPrototype = Object.getPrototypeOf(Function);
          var _Map = typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
          var _Set = typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
          var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
          var registrySymbol = supportsSymbol ? /* @__PURE__ */ Symbol.for("@reflect-metadata:registry") : void 0;
          var metadataRegistry = GetOrCreateMetadataRegistry();
          var metadataProvider = CreateMetadataProvider(metadataRegistry);
          function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
              if (!IsArray2(decorators))
                throw new TypeError();
              if (!IsObject(target))
                throw new TypeError();
              if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                throw new TypeError();
              if (IsNull(attributes))
                attributes = void 0;
              propertyKey = ToPropertyKey(propertyKey);
              return DecorateProperty(decorators, target, propertyKey, attributes);
            } else {
              if (!IsArray2(decorators))
                throw new TypeError();
              if (!IsConstructor(target))
                throw new TypeError();
              return DecorateConstructor(decorators, target);
            }
          }
          exporter("decorate", decorate);
          function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
              if (!IsObject(target))
                throw new TypeError();
              if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                throw new TypeError();
              OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
          }
          exporter("metadata", metadata);
          function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
          }
          exporter("defineMetadata", defineMetadata);
          function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
          }
          exporter("hasMetadata", hasMetadata);
          function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
          }
          exporter("hasOwnMetadata", hasOwnMetadata);
          function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
          }
          exporter("getMetadata", getMetadata);
          function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
          }
          exporter("getOwnMetadata", getOwnMetadata);
          function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
          }
          exporter("getMetadataKeys", getMetadataKeys);
          function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
          }
          exporter("getOwnMetadataKeys", getOwnMetadataKeys);
          function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            if (!IsObject(target))
              throw new TypeError();
            if (!IsUndefined(propertyKey))
              propertyKey = ToPropertyKey(propertyKey);
            var provider = GetMetadataProvider(
              target,
              propertyKey,
              /*Create*/
              false
            );
            if (IsUndefined(provider))
              return false;
            return provider.OrdinaryDeleteMetadata(metadataKey, target, propertyKey);
          }
          exporter("deleteMetadata", deleteMetadata);
          function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
              var decorator = decorators[i];
              var decorated = decorator(target);
              if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsConstructor(decorated))
                  throw new TypeError();
                target = decorated;
              }
            }
            return target;
          }
          function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
              var decorator = decorators[i];
              var decorated = decorator(target, propertyKey, descriptor);
              if (!IsUndefined(decorated) && !IsNull(decorated)) {
                if (!IsObject(decorated))
                  throw new TypeError();
                descriptor = decorated;
              }
            }
            return descriptor;
          }
          function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn2)
              return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
              return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
          }
          function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var provider = GetMetadataProvider(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(provider))
              return false;
            return ToBoolean(provider.OrdinaryHasOwnMetadata(MetadataKey, O, P));
          }
          function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn2 = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn2)
              return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
              return OrdinaryGetMetadata(MetadataKey, parent, P);
            return void 0;
          }
          function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var provider = GetMetadataProvider(
              O,
              P,
              /*Create*/
              false
            );
            if (IsUndefined(provider))
              return;
            return provider.OrdinaryGetOwnMetadata(MetadataKey, O, P);
          }
          function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var provider = GetMetadataProvider(
              O,
              P,
              /*Create*/
              true
            );
            provider.OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P);
          }
          function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
              return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
              return ownKeys;
            if (ownKeys.length <= 0)
              return parentKeys;
            var set = new _Set();
            var keys2 = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
              var key = ownKeys_1[_i];
              var hasKey = set.has(key);
              if (!hasKey) {
                set.add(key);
                keys2.push(key);
              }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
              var key = parentKeys_1[_a];
              var hasKey = set.has(key);
              if (!hasKey) {
                set.add(key);
                keys2.push(key);
              }
            }
            return keys2;
          }
          function OrdinaryOwnMetadataKeys(O, P) {
            var provider = GetMetadataProvider(
              O,
              P,
              /*create*/
              false
            );
            if (!provider) {
              return [];
            }
            return provider.OrdinaryOwnMetadataKeys(O, P);
          }
          function Type2(x) {
            if (x === null)
              return 1;
            switch (typeof x) {
              case "undefined":
                return 0;
              case "boolean":
                return 2;
              case "string":
                return 3;
              case "symbol":
                return 4;
              case "number":
                return 5;
              case "object":
                return x === null ? 1 : 6;
              default:
                return 6;
            }
          }
          function IsUndefined(x) {
            return x === void 0;
          }
          function IsNull(x) {
            return x === null;
          }
          function IsSymbol(x) {
            return typeof x === "symbol";
          }
          function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
          }
          function ToPrimitive(input, PreferredType) {
            switch (Type2(input)) {
              case 0:
                return input;
              case 1:
                return input;
              case 2:
                return input;
              case 3:
                return input;
              case 4:
                return input;
              case 5:
                return input;
            }
            var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== void 0) {
              var result = exoticToPrim.call(input, hint);
              if (IsObject(result))
                throw new TypeError();
              return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
          }
          function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
              var toString_1 = O.toString;
              if (IsCallable(toString_1)) {
                var result = toString_1.call(O);
                if (!IsObject(result))
                  return result;
              }
              var valueOf = O.valueOf;
              if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                  return result;
              }
            } else {
              var valueOf = O.valueOf;
              if (IsCallable(valueOf)) {
                var result = valueOf.call(O);
                if (!IsObject(result))
                  return result;
              }
              var toString_2 = O.toString;
              if (IsCallable(toString_2)) {
                var result = toString_2.call(O);
                if (!IsObject(result))
                  return result;
              }
            }
            throw new TypeError();
          }
          function ToBoolean(argument) {
            return !!argument;
          }
          function ToString(argument) {
            return "" + argument;
          }
          function ToPropertyKey(argument) {
            var key = ToPrimitive(
              argument,
              3
              /* String */
            );
            if (IsSymbol(key))
              return key;
            return ToString(key);
          }
          function IsArray2(argument) {
            return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
          }
          function IsCallable(argument) {
            return typeof argument === "function";
          }
          function IsConstructor(argument) {
            return typeof argument === "function";
          }
          function IsPropertyKey(argument) {
            switch (Type2(argument)) {
              case 3:
                return true;
              case 4:
                return true;
              default:
                return false;
            }
          }
          function SameValueZero(x, y) {
            return x === y || x !== x && y !== y;
          }
          function GetMethod(V, P) {
            var func = V[P];
            if (func === void 0 || func === null)
              return void 0;
            if (!IsCallable(func))
              throw new TypeError();
            return func;
          }
          function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
              throw new TypeError();
            var iterator = method.call(obj);
            if (!IsObject(iterator))
              throw new TypeError();
            return iterator;
          }
          function IteratorValue(iterResult) {
            return iterResult.value;
          }
          function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
          }
          function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
              f.call(iterator);
          }
          function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
              return proto;
            if (proto !== functionPrototype)
              return proto;
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
              return proto;
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
              return proto;
            if (constructor === O)
              return proto;
            return constructor;
          }
          function CreateMetadataRegistry() {
            var fallback;
            if (!IsUndefined(registrySymbol) && typeof root2.Reflect !== "undefined" && !(registrySymbol in root2.Reflect) && typeof root2.Reflect.defineMetadata === "function") {
              fallback = CreateFallbackProvider(root2.Reflect);
            }
            var first;
            var second;
            var rest;
            var targetProviderMap = new _WeakMap();
            var registry = {
              registerProvider,
              getProvider,
              setProvider
            };
            return registry;
            function registerProvider(provider) {
              if (!Object.isExtensible(registry)) {
                throw new Error("Cannot add provider to a frozen registry.");
              }
              switch (true) {
                case fallback === provider:
                  break;
                case IsUndefined(first):
                  first = provider;
                  break;
                case first === provider:
                  break;
                case IsUndefined(second):
                  second = provider;
                  break;
                case second === provider:
                  break;
                default:
                  if (rest === void 0)
                    rest = new _Set();
                  rest.add(provider);
                  break;
              }
            }
            function getProviderNoCache(O, P) {
              if (!IsUndefined(first)) {
                if (first.isProviderFor(O, P))
                  return first;
                if (!IsUndefined(second)) {
                  if (second.isProviderFor(O, P))
                    return first;
                  if (!IsUndefined(rest)) {
                    var iterator = GetIterator(rest);
                    while (true) {
                      var next = IteratorStep(iterator);
                      if (!next) {
                        return void 0;
                      }
                      var provider = IteratorValue(next);
                      if (provider.isProviderFor(O, P)) {
                        IteratorClose(iterator);
                        return provider;
                      }
                    }
                  }
                }
              }
              if (!IsUndefined(fallback) && fallback.isProviderFor(O, P)) {
                return fallback;
              }
              return void 0;
            }
            function getProvider(O, P) {
              var providerMap = targetProviderMap.get(O);
              var provider;
              if (!IsUndefined(providerMap)) {
                provider = providerMap.get(P);
              }
              if (!IsUndefined(provider)) {
                return provider;
              }
              provider = getProviderNoCache(O, P);
              if (!IsUndefined(provider)) {
                if (IsUndefined(providerMap)) {
                  providerMap = new _Map();
                  targetProviderMap.set(O, providerMap);
                }
                providerMap.set(P, provider);
              }
              return provider;
            }
            function hasProvider(provider) {
              if (IsUndefined(provider))
                throw new TypeError();
              return first === provider || second === provider || !IsUndefined(rest) && rest.has(provider);
            }
            function setProvider(O, P, provider) {
              if (!hasProvider(provider)) {
                throw new Error("Metadata provider not registered.");
              }
              var existingProvider = getProvider(O, P);
              if (existingProvider !== provider) {
                if (!IsUndefined(existingProvider)) {
                  return false;
                }
                var providerMap = targetProviderMap.get(O);
                if (IsUndefined(providerMap)) {
                  providerMap = new _Map();
                  targetProviderMap.set(O, providerMap);
                }
                providerMap.set(P, provider);
              }
              return true;
            }
          }
          function GetOrCreateMetadataRegistry() {
            var metadataRegistry2;
            if (!IsUndefined(registrySymbol) && IsObject(root2.Reflect) && Object.isExtensible(root2.Reflect)) {
              metadataRegistry2 = root2.Reflect[registrySymbol];
            }
            if (IsUndefined(metadataRegistry2)) {
              metadataRegistry2 = CreateMetadataRegistry();
            }
            if (!IsUndefined(registrySymbol) && IsObject(root2.Reflect) && Object.isExtensible(root2.Reflect)) {
              Object.defineProperty(root2.Reflect, registrySymbol, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: metadataRegistry2
              });
            }
            return metadataRegistry2;
          }
          function CreateMetadataProvider(registry) {
            var metadata2 = new _WeakMap();
            var provider = {
              isProviderFor: function(O, P) {
                var targetMetadata = metadata2.get(O);
                if (IsUndefined(targetMetadata))
                  return false;
                return targetMetadata.has(P);
              },
              OrdinaryDefineOwnMetadata: OrdinaryDefineOwnMetadata2,
              OrdinaryHasOwnMetadata: OrdinaryHasOwnMetadata2,
              OrdinaryGetOwnMetadata: OrdinaryGetOwnMetadata2,
              OrdinaryOwnMetadataKeys: OrdinaryOwnMetadataKeys2,
              OrdinaryDeleteMetadata
            };
            metadataRegistry.registerProvider(provider);
            return provider;
            function GetOrCreateMetadataMap(O, P, Create) {
              var targetMetadata = metadata2.get(O);
              var createdTargetMetadata = false;
              if (IsUndefined(targetMetadata)) {
                if (!Create)
                  return void 0;
                targetMetadata = new _Map();
                metadata2.set(O, targetMetadata);
                createdTargetMetadata = true;
              }
              var metadataMap = targetMetadata.get(P);
              if (IsUndefined(metadataMap)) {
                if (!Create)
                  return void 0;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
                if (!registry.setProvider(O, P, provider)) {
                  targetMetadata.delete(P);
                  if (createdTargetMetadata) {
                    metadata2.delete(O);
                  }
                  throw new Error("Wrong provider for target.");
                }
              }
              return metadataMap;
            }
            function OrdinaryHasOwnMetadata2(MetadataKey, O, P) {
              var metadataMap = GetOrCreateMetadataMap(
                O,
                P,
                /*Create*/
                false
              );
              if (IsUndefined(metadataMap))
                return false;
              return ToBoolean(metadataMap.has(MetadataKey));
            }
            function OrdinaryGetOwnMetadata2(MetadataKey, O, P) {
              var metadataMap = GetOrCreateMetadataMap(
                O,
                P,
                /*Create*/
                false
              );
              if (IsUndefined(metadataMap))
                return void 0;
              return metadataMap.get(MetadataKey);
            }
            function OrdinaryDefineOwnMetadata2(MetadataKey, MetadataValue, O, P) {
              var metadataMap = GetOrCreateMetadataMap(
                O,
                P,
                /*Create*/
                true
              );
              metadataMap.set(MetadataKey, MetadataValue);
            }
            function OrdinaryOwnMetadataKeys2(O, P) {
              var keys2 = [];
              var metadataMap = GetOrCreateMetadataMap(
                O,
                P,
                /*Create*/
                false
              );
              if (IsUndefined(metadataMap))
                return keys2;
              var keysObj = metadataMap.keys();
              var iterator = GetIterator(keysObj);
              var k = 0;
              while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                  keys2.length = k;
                  return keys2;
                }
                var nextValue = IteratorValue(next);
                try {
                  keys2[k] = nextValue;
                } catch (e) {
                  try {
                    IteratorClose(iterator);
                  } finally {
                    throw e;
                  }
                }
                k++;
              }
            }
            function OrdinaryDeleteMetadata(MetadataKey, O, P) {
              var metadataMap = GetOrCreateMetadataMap(
                O,
                P,
                /*Create*/
                false
              );
              if (IsUndefined(metadataMap))
                return false;
              if (!metadataMap.delete(MetadataKey))
                return false;
              if (metadataMap.size === 0) {
                var targetMetadata = metadata2.get(O);
                if (!IsUndefined(targetMetadata)) {
                  targetMetadata.delete(P);
                  if (targetMetadata.size === 0) {
                    metadata2.delete(targetMetadata);
                  }
                }
              }
              return true;
            }
          }
          function CreateFallbackProvider(reflect) {
            var defineMetadata2 = reflect.defineMetadata, hasOwnMetadata2 = reflect.hasOwnMetadata, getOwnMetadata2 = reflect.getOwnMetadata, getOwnMetadataKeys2 = reflect.getOwnMetadataKeys, deleteMetadata2 = reflect.deleteMetadata;
            var metadataOwner = new _WeakMap();
            var provider = {
              isProviderFor: function(O, P) {
                var metadataPropertySet = metadataOwner.get(O);
                if (!IsUndefined(metadataPropertySet) && metadataPropertySet.has(P)) {
                  return true;
                }
                if (getOwnMetadataKeys2(O, P).length) {
                  if (IsUndefined(metadataPropertySet)) {
                    metadataPropertySet = new _Set();
                    metadataOwner.set(O, metadataPropertySet);
                  }
                  metadataPropertySet.add(P);
                  return true;
                }
                return false;
              },
              OrdinaryDefineOwnMetadata: defineMetadata2,
              OrdinaryHasOwnMetadata: hasOwnMetadata2,
              OrdinaryGetOwnMetadata: getOwnMetadata2,
              OrdinaryOwnMetadataKeys: getOwnMetadataKeys2,
              OrdinaryDeleteMetadata: deleteMetadata2
            };
            return provider;
          }
          function GetMetadataProvider(O, P, Create) {
            var registeredProvider = metadataRegistry.getProvider(O, P);
            if (!IsUndefined(registeredProvider)) {
              return registeredProvider;
            }
            if (Create) {
              if (metadataRegistry.setProvider(O, P, metadataProvider)) {
                return metadataProvider;
              }
              throw new Error("Illegal state.");
            }
            return void 0;
          }
          function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = (
              /** @class */
              (function() {
                function MapIterator2(keys2, values, selector) {
                  this._index = 0;
                  this._keys = keys2;
                  this._values = values;
                  this._selector = selector;
                }
                MapIterator2.prototype["@@iterator"] = function() {
                  return this;
                };
                MapIterator2.prototype[iteratorSymbol] = function() {
                  return this;
                };
                MapIterator2.prototype.next = function() {
                  var index = this._index;
                  if (index >= 0 && index < this._keys.length) {
                    var result = this._selector(this._keys[index], this._values[index]);
                    if (index + 1 >= this._keys.length) {
                      this._index = -1;
                      this._keys = arraySentinel;
                      this._values = arraySentinel;
                    } else {
                      this._index++;
                    }
                    return { value: result, done: false };
                  }
                  return { value: void 0, done: true };
                };
                MapIterator2.prototype.throw = function(error) {
                  if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  }
                  throw error;
                };
                MapIterator2.prototype.return = function(value) {
                  if (this._index >= 0) {
                    this._index = -1;
                    this._keys = arraySentinel;
                    this._values = arraySentinel;
                  }
                  return { value, done: true };
                };
                return MapIterator2;
              })()
            );
            var Map3 = (
              /** @class */
              (function() {
                function Map4() {
                  this._keys = [];
                  this._values = [];
                  this._cacheKey = cacheSentinel;
                  this._cacheIndex = -2;
                }
                Object.defineProperty(Map4.prototype, "size", {
                  get: function() {
                    return this._keys.length;
                  },
                  enumerable: true,
                  configurable: true
                });
                Map4.prototype.has = function(key) {
                  return this._find(
                    key,
                    /*insert*/
                    false
                  ) >= 0;
                };
                Map4.prototype.get = function(key) {
                  var index = this._find(
                    key,
                    /*insert*/
                    false
                  );
                  return index >= 0 ? this._values[index] : void 0;
                };
                Map4.prototype.set = function(key, value) {
                  var index = this._find(
                    key,
                    /*insert*/
                    true
                  );
                  this._values[index] = value;
                  return this;
                };
                Map4.prototype.delete = function(key) {
                  var index = this._find(
                    key,
                    /*insert*/
                    false
                  );
                  if (index >= 0) {
                    var size = this._keys.length;
                    for (var i = index + 1; i < size; i++) {
                      this._keys[i - 1] = this._keys[i];
                      this._values[i - 1] = this._values[i];
                    }
                    this._keys.length--;
                    this._values.length--;
                    if (SameValueZero(key, this._cacheKey)) {
                      this._cacheKey = cacheSentinel;
                      this._cacheIndex = -2;
                    }
                    return true;
                  }
                  return false;
                };
                Map4.prototype.clear = function() {
                  this._keys.length = 0;
                  this._values.length = 0;
                  this._cacheKey = cacheSentinel;
                  this._cacheIndex = -2;
                };
                Map4.prototype.keys = function() {
                  return new MapIterator(this._keys, this._values, getKey);
                };
                Map4.prototype.values = function() {
                  return new MapIterator(this._keys, this._values, getValue2);
                };
                Map4.prototype.entries = function() {
                  return new MapIterator(this._keys, this._values, getEntry);
                };
                Map4.prototype["@@iterator"] = function() {
                  return this.entries();
                };
                Map4.prototype[iteratorSymbol] = function() {
                  return this.entries();
                };
                Map4.prototype._find = function(key, insert) {
                  if (!SameValueZero(this._cacheKey, key)) {
                    this._cacheIndex = -1;
                    for (var i = 0; i < this._keys.length; i++) {
                      if (SameValueZero(this._keys[i], key)) {
                        this._cacheIndex = i;
                        break;
                      }
                    }
                  }
                  if (this._cacheIndex < 0 && insert) {
                    this._cacheIndex = this._keys.length;
                    this._keys.push(key);
                    this._values.push(void 0);
                  }
                  return this._cacheIndex;
                };
                return Map4;
              })()
            );
            return Map3;
            function getKey(key, _) {
              return key;
            }
            function getValue2(_, value) {
              return value;
            }
            function getEntry(key, value) {
              return [key, value];
            }
          }
          function CreateSetPolyfill() {
            var Set3 = (
              /** @class */
              (function() {
                function Set4() {
                  this._map = new _Map();
                }
                Object.defineProperty(Set4.prototype, "size", {
                  get: function() {
                    return this._map.size;
                  },
                  enumerable: true,
                  configurable: true
                });
                Set4.prototype.has = function(value) {
                  return this._map.has(value);
                };
                Set4.prototype.add = function(value) {
                  return this._map.set(value, value), this;
                };
                Set4.prototype.delete = function(value) {
                  return this._map.delete(value);
                };
                Set4.prototype.clear = function() {
                  this._map.clear();
                };
                Set4.prototype.keys = function() {
                  return this._map.keys();
                };
                Set4.prototype.values = function() {
                  return this._map.keys();
                };
                Set4.prototype.entries = function() {
                  return this._map.entries();
                };
                Set4.prototype["@@iterator"] = function() {
                  return this.keys();
                };
                Set4.prototype[iteratorSymbol] = function() {
                  return this.keys();
                };
                return Set4;
              })()
            );
            return Set3;
          }
          function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys2 = HashMap.create();
            var rootKey = CreateUniqueKey();
            return (
              /** @class */
              (function() {
                function WeakMap3() {
                  this._key = CreateUniqueKey();
                }
                WeakMap3.prototype.has = function(target) {
                  var table = GetOrCreateWeakMapTable(
                    target,
                    /*create*/
                    false
                  );
                  return table !== void 0 ? HashMap.has(table, this._key) : false;
                };
                WeakMap3.prototype.get = function(target) {
                  var table = GetOrCreateWeakMapTable(
                    target,
                    /*create*/
                    false
                  );
                  return table !== void 0 ? HashMap.get(table, this._key) : void 0;
                };
                WeakMap3.prototype.set = function(target, value) {
                  var table = GetOrCreateWeakMapTable(
                    target,
                    /*create*/
                    true
                  );
                  table[this._key] = value;
                  return this;
                };
                WeakMap3.prototype.delete = function(target) {
                  var table = GetOrCreateWeakMapTable(
                    target,
                    /*create*/
                    false
                  );
                  return table !== void 0 ? delete table[this._key] : false;
                };
                WeakMap3.prototype.clear = function() {
                  this._key = CreateUniqueKey();
                };
                return WeakMap3;
              })()
            );
            function CreateUniqueKey() {
              var key;
              do
                key = "@@WeakMap@@" + CreateUUID();
              while (HashMap.has(keys2, key));
              keys2[key] = true;
              return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
              if (!hasOwn.call(target, rootKey)) {
                if (!create)
                  return void 0;
                Object.defineProperty(target, rootKey, { value: HashMap.create() });
              }
              return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
              for (var i = 0; i < size; ++i)
                buffer[i] = Math.random() * 255 | 0;
              return buffer;
            }
            function GenRandomBytes(size) {
              if (typeof Uint8Array === "function") {
                var array = new Uint8Array(size);
                if (typeof crypto !== "undefined") {
                  crypto.getRandomValues(array);
                } else if (typeof msCrypto !== "undefined") {
                  msCrypto.getRandomValues(array);
                } else {
                  FillRandomBytes(array, size);
                }
                return array;
              }
              return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
              var data = GenRandomBytes(UUID_SIZE);
              data[6] = data[6] & 79 | 64;
              data[8] = data[8] & 191 | 128;
              var result = "";
              for (var offset = 0; offset < UUID_SIZE; ++offset) {
                var byte = data[offset];
                if (offset === 4 || offset === 6 || offset === 8)
                  result += "-";
                if (byte < 16)
                  result += "0";
                result += byte.toString(16).toLowerCase();
              }
              return result;
            }
          }
          function MakeDictionary(obj) {
            obj.__ = void 0;
            delete obj.__;
            return obj;
          }
        });
      })(Reflect2 || (Reflect2 = {}));
    }
  });

  // node_modules/.pnpm/bondage-club-mod-sdk@1.2.0/node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js
  var require_bcmodsdk = __commonJS({
    "node_modules/.pnpm/bondage-club-mod-sdk@1.2.0/node_modules/bondage-club-mod-sdk/dist/bcmodsdk.js"(exports2) {
      "use strict";
      var bcModSdk2 = (function() {
        "use strict";
        const o = "1.2.0";
        function e(o2) {
          alert("Mod ERROR:\n" + o2);
          const e2 = new Error(o2);
          throw console.error(e2), e2;
        }
        const t = new TextEncoder();
        function n(o2) {
          return !!o2 && "object" == typeof o2 && !Array.isArray(o2);
        }
        function r(o2) {
          const e2 = /* @__PURE__ */ new Set();
          return o2.filter(((o3) => !e2.has(o3) && e2.add(o3)));
        }
        const i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Set();
        function c(o2) {
          a.has(o2) || (a.add(o2), console.warn(o2));
        }
        function s(o2) {
          const e2 = [], t2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set();
          for (const r3 of f.values()) {
            const i3 = r3.patching.get(o2.name);
            if (i3) {
              e2.push(...i3.hooks);
              for (const [e3, a2] of i3.patches.entries()) t2.has(e3) && t2.get(e3) !== a2 && c(`ModSDK: Mod '${r3.name}' is patching function ${o2.name} with same pattern that is already applied by different mod, but with different pattern:
Pattern:
${e3}
Patch1:
${t2.get(e3) || ""}
Patch2:
${a2}`), t2.set(e3, a2), n2.add(r3.name);
            }
          }
          e2.sort(((o3, e3) => e3.priority - o3.priority));
          const r2 = (function(o3, e3) {
            if (0 === e3.size) return o3;
            let t3 = o3.toString().replaceAll("\r\n", "\n");
            for (const [n3, r3] of e3.entries()) t3.includes(n3) || c(`ModSDK: Patching ${o3.name}: Patch ${n3} not applied`), t3 = t3.replaceAll(n3, r3);
            return (0, eval)(`(${t3})`);
          })(o2.original, t2);
          let i2 = function(e3) {
            var t3, i3;
            const a2 = null === (i3 = (t3 = m.errorReporterHooks).hookChainExit) || void 0 === i3 ? void 0 : i3.call(t3, o2.name, n2), c2 = r2.apply(this, e3);
            return null == a2 || a2(), c2;
          };
          for (let t3 = e2.length - 1; t3 >= 0; t3--) {
            const n3 = e2[t3], r3 = i2;
            i2 = function(e3) {
              var t4, i3;
              const a2 = null === (i3 = (t4 = m.errorReporterHooks).hookEnter) || void 0 === i3 ? void 0 : i3.call(t4, o2.name, n3.mod), c2 = n3.hook.apply(this, [e3, (o3) => {
                if (1 !== arguments.length || !Array.isArray(e3)) throw new Error(`Mod ${n3.mod} failed to call next hook: Expected args to be array, got ${typeof o3}`);
                return r3.call(this, o3);
              }]);
              return null == a2 || a2(), c2;
            };
          }
          return { hooks: e2, patches: t2, patchesSources: n2, enter: i2, final: r2 };
        }
        function l(o2, e2 = false) {
          let r2 = i.get(o2);
          if (r2) e2 && (r2.precomputed = s(r2));
          else {
            let e3 = window;
            const a2 = o2.split(".");
            for (let t2 = 0; t2 < a2.length - 1; t2++) if (e3 = e3[a2[t2]], !n(e3)) throw new Error(`ModSDK: Function ${o2} to be patched not found; ${a2.slice(0, t2 + 1).join(".")} is not object`);
            const c2 = e3[a2[a2.length - 1]];
            if ("function" != typeof c2) throw new Error(`ModSDK: Function ${o2} to be patched not found`);
            const l2 = (function(o3) {
              let e4 = -1;
              for (const n2 of t.encode(o3)) {
                let o4 = 255 & (e4 ^ n2);
                for (let e5 = 0; e5 < 8; e5++) o4 = 1 & o4 ? -306674912 ^ o4 >>> 1 : o4 >>> 1;
                e4 = e4 >>> 8 ^ o4;
              }
              return ((-1 ^ e4) >>> 0).toString(16).padStart(8, "0").toUpperCase();
            })(c2.toString().replaceAll("\r\n", "\n")), d2 = { name: o2, original: c2, originalHash: l2 };
            r2 = Object.assign(Object.assign({}, d2), { precomputed: s(d2), router: () => {
            }, context: e3, contextProperty: a2[a2.length - 1] }), r2.router = /* @__PURE__ */ (function(o3) {
              return function(...e4) {
                return o3.precomputed.enter.apply(this, [e4]);
              };
            })(r2), i.set(o2, r2), e3[r2.contextProperty] = r2.router;
          }
          return r2;
        }
        function d() {
          for (const o2 of i.values()) o2.precomputed = s(o2);
        }
        function p() {
          const o2 = /* @__PURE__ */ new Map();
          for (const [e2, t2] of i) o2.set(e2, { name: e2, original: t2.original, originalHash: t2.originalHash, sdkEntrypoint: t2.router, currentEntrypoint: t2.context[t2.contextProperty], hookedByMods: r(t2.precomputed.hooks.map(((o3) => o3.mod))), patchedByMods: Array.from(t2.precomputed.patchesSources) });
          return o2;
        }
        const f = /* @__PURE__ */ new Map();
        function u(o2) {
          f.get(o2.name) !== o2 && e(`Failed to unload mod '${o2.name}': Not registered`), f.delete(o2.name), o2.loaded = false, d();
        }
        function g(o2, t2) {
          o2 && "object" == typeof o2 || e("Failed to register mod: Expected info object, got " + typeof o2), "string" == typeof o2.name && o2.name || e("Failed to register mod: Expected name to be non-empty string, got " + typeof o2.name);
          let r2 = `'${o2.name}'`;
          "string" == typeof o2.fullName && o2.fullName || e(`Failed to register mod ${r2}: Expected fullName to be non-empty string, got ${typeof o2.fullName}`), r2 = `'${o2.fullName} (${o2.name})'`, "string" != typeof o2.version && e(`Failed to register mod ${r2}: Expected version to be string, got ${typeof o2.version}`), o2.repository || (o2.repository = void 0), void 0 !== o2.repository && "string" != typeof o2.repository && e(`Failed to register mod ${r2}: Expected repository to be undefined or string, got ${typeof o2.version}`), null == t2 && (t2 = {}), t2 && "object" == typeof t2 || e(`Failed to register mod ${r2}: Expected options to be undefined or object, got ${typeof t2}`);
          const i2 = true === t2.allowReplace, a2 = f.get(o2.name);
          a2 && (a2.allowReplace && i2 || e(`Refusing to load mod ${r2}: it is already loaded and doesn't allow being replaced.
Was the mod loaded multiple times?`), u(a2));
          const c2 = (o3) => {
            let e2 = g2.patching.get(o3.name);
            return e2 || (e2 = { hooks: [], patches: /* @__PURE__ */ new Map() }, g2.patching.set(o3.name, e2)), e2;
          }, s2 = (o3, t3) => (...n2) => {
            var i3, a3;
            const c3 = null === (a3 = (i3 = m.errorReporterHooks).apiEndpointEnter) || void 0 === a3 ? void 0 : a3.call(i3, o3, g2.name);
            g2.loaded || e(`Mod ${r2} attempted to call SDK function after being unloaded`);
            const s3 = t3(...n2);
            return null == c3 || c3(), s3;
          }, p2 = { unload: s2("unload", (() => u(g2))), hookFunction: s2("hookFunction", ((o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            "number" != typeof t3 && e(`Mod ${r2} failed to hook function '${o3}': Expected priority number, got ${typeof t3}`), "function" != typeof n2 && e(`Mod ${r2} failed to hook function '${o3}': Expected hook function, got ${typeof n2}`);
            const s3 = { mod: g2.name, priority: t3, hook: n2 };
            return a3.hooks.push(s3), d(), () => {
              const o4 = a3.hooks.indexOf(s3);
              o4 >= 0 && (a3.hooks.splice(o4, 1), d());
            };
          })), patchFunction: s2("patchFunction", ((o3, t3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3), a3 = c2(i3);
            n(t3) || e(`Mod ${r2} failed to patch function '${o3}': Expected patches object, got ${typeof t3}`);
            for (const [n2, i4] of Object.entries(t3)) "string" == typeof i4 ? a3.patches.set(n2, i4) : null === i4 ? a3.patches.delete(n2) : e(`Mod ${r2} failed to patch function '${o3}': Invalid format of patch '${n2}'`);
            d();
          })), removePatches: s2("removePatches", ((o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to patch a function: Expected function name string, got ${typeof o3}`);
            const t3 = l(o3);
            c2(t3).patches.clear(), d();
          })), callOriginal: s2("callOriginal", ((o3, t3, n2) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to call a function: Expected function name string, got ${typeof o3}`);
            const i3 = l(o3);
            return Array.isArray(t3) || e(`Mod ${r2} failed to call a function: Expected args array, got ${typeof t3}`), i3.original.apply(null != n2 ? n2 : globalThis, t3);
          })), getOriginalHash: s2("getOriginalHash", ((o3) => {
            "string" == typeof o3 && o3 || e(`Mod ${r2} failed to get hash: Expected function name string, got ${typeof o3}`);
            return l(o3).originalHash;
          })) }, g2 = { name: o2.name, fullName: o2.fullName, version: o2.version, repository: o2.repository, allowReplace: i2, api: p2, loaded: true, patching: /* @__PURE__ */ new Map() };
          return f.set(o2.name, g2), Object.freeze(p2);
        }
        function h() {
          const o2 = [];
          for (const e2 of f.values()) o2.push({ name: e2.name, fullName: e2.fullName, version: e2.version, repository: e2.repository });
          return o2;
        }
        let m;
        const y = void 0 === window.bcModSdk ? window.bcModSdk = (function() {
          const e2 = { version: o, apiVersion: 1, registerMod: g, getModsInfo: h, getPatchingInfo: p, errorReporterHooks: Object.seal({ apiEndpointEnter: null, hookEnter: null, hookChainExit: null }) };
          return m = e2, Object.freeze(e2);
        })() : (n(window.bcModSdk) || e("Failed to init Mod SDK: Name already in use"), 1 !== window.bcModSdk.apiVersion && e(`Failed to init Mod SDK: Different version already loaded ('1.2.0' vs '${window.bcModSdk.version}')`), window.bcModSdk.version !== o && alert(`Mod SDK warning: Loading different but compatible versions ('1.2.0' vs '${window.bcModSdk.version}')
One of mods you are using is using an old version of SDK. It will work for now but please inform author to update`), window.bcModSdk);
        return "undefined" != typeof exports2 && (Object.defineProperty(exports2, "__esModule", { value: true }), exports2.default = y), y;
      })();
    }
  });

  // node_modules/.pnpm/validator@13.15.35/node_modules/validator/lib/util/assertString.js
  var require_assertString = __commonJS({
    "node_modules/.pnpm/validator@13.15.35/node_modules/validator/lib/util/assertString.js"(exports2, module2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.default = assertString;
      function assertString(input) {
        if (input === void 0 || input === null) throw new TypeError("Expected a string but received a ".concat(input));
        if (input.constructor.name !== "String") throw new TypeError("Expected a string but received a ".concat(input.constructor.name));
      }
      module2.exports = exports2.default;
      module2.exports.default = exports2.default;
    }
  });

  // node_modules/.pnpm/validator@13.15.35/node_modules/validator/lib/matches.js
  var require_matches = __commonJS({
    "node_modules/.pnpm/validator@13.15.35/node_modules/validator/lib/matches.js"(exports2, module2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
      exports2.default = matches2;
      var _assertString = _interopRequireDefault(require_assertString());
      function _interopRequireDefault(e) {
        return e && e.__esModule ? e : { default: e };
      }
      function matches2(str, pattern, modifiers) {
        (0, _assertString.default)(str);
        if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
          pattern = new RegExp(pattern, modifiers);
        }
        return !!str.match(pattern);
      }
      module2.exports = exports2.default;
      module2.exports.default = exports2.default;
    }
  });

  // src/index.ts
  var import_reflect_metadata = __toESM(require_Reflect());

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/styles.css
  var styles_default = ".zcInput {\n  background: var(--tmd-element, white);\n  color: var(--tmd-text, black);\n  padding: 2vw;\n  border: 2px solid var(--tmd-accent, black);\n  border-radius: 4px;\n}\n.zcInput::placeholder {\n  color: var(--tmd-text, black);\n}\n.zcTabs {\n  display: flex;\n}\n.zcTabs button {\n  cursor: pointer;\n  width: 100%;\n  color: var(--tmd-text, black);\n  background: none;\n  border: none;\n  border-bottom: 2px solid var(--tmd-element, rgb(214, 214, 214));\n  padding: 0.25em;\n}\n.zcTabs button[data-opened=true] {\n  font-weight: bold;\n  border-bottom: 2px solid var(--tmd-accent, rgb(81, 81, 231)) !important;\n}\n.zcTabs button:hover {\n  background: var(--tmd-element, rgb(235, 235, 235));\n  border-bottom: 2px solid var(--tmd-element-hover, rgb(149, 149, 149));\n}\n.zcCard {\n  border: 2px solid var(--tmd-accent, rgb(195, 195, 195));\n  border-radius: 0.4em;\n  background: var(--tmd-element, white);\n  color: var(--tmd-text, black);\n  padding: 0.4em 2.5em 0.4em 0.4em;\n  box-sizing: border-box;\n}\n.zcCard:hover {\n  border: 2px solid var(--tmd-accent-hover, rgb(170, 170, 170));\n}\n.zcCard_name {\n  font-size: 0.5em;\n  color: var(--tmd-text, rgb(100, 100, 100));\n  margin: 0;\n}\n.zcCard_value {\n  color: var(--tmd-text, black);\n  margin: 0;\n  margin-top: 0.4em;\n  font-weight: bold;\n}\n.zcToastsContainer {\n  display: flex;\n  flex-direction: column;\n  gap: 0.15vw;\n  cursor: pointer;\n  position: fixed;\n  z-index: 30;\n}\n@keyframes zcToast-progress {\n  0% {\n    width: 0;\n  }\n  100% {\n    width: 100%;\n  }\n}\n@keyframes zcSlideInFromLeft {\n  from {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes zcSlideInFromRight {\n  from {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes zcSlideOutToLeft {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(-100%);\n    opacity: 0;\n  }\n}\n@keyframes zcSlideOutToRight {\n  from {\n    transform: translateX(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateX(100%);\n    opacity: 0;\n  }\n}\n@keyframes pop {\n  0% {\n    transform: scale(0.9);\n  }\n  50% {\n    transform: scale(1.1);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.zcToast {\n  display: flex;\n  column-gap: 0.6em;\n  align-items: center;\n  max-width: 25vw;\n  border-radius: 0.15em;\n  position: relative;\n}\n.zcToast p {\n  color: white;\n  margin: 0;\n}\n.zcToast > svg {\n  flex-shrink: 0;\n}\n.zcDialog {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background: rgb(57, 64, 77);\n  margin: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border: none;\n  border-radius: 4px;\n  min-width: 200px;\n  max-width: 450px;\n  width: 90%;\n  height: fit-content;\n  z-index: 100;\n  pointer-events: all !important;\n  box-shadow: 0px 0px 6px 1px #0000006e;\n}\n.zcDialog > p {\n  padding: 0.85em 0px;\n  margin: 0;\n  user-select: none;\n  width: 90%;\n  color: white;\n}\n.zcDialog > input:focus {\n  outline: 2px solid rgb(0, 238, 255);\n}\n.zcDialog > div > button {\n  cursor: pointer;\n  padding: 6px 14px;\n  border: none;\n  border-radius: 4px;\n  font-weight: bold;\n}\n.zcDialog > div > button:first-child {\n  background: rgba(73, 82, 99, 1);\n  color: white;\n}\n.zcDialog > div > button:first-child:hover {\n  background: rgb(86, 94, 108);\n}\n.zcDialog > div > button:last-child {\n  background: #00eeffff;\n}\n.zcDialog > div > button:last-child:hover {\n  background: rgb(4, 203, 217);\n}\n@keyframes zcSpin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes zcCursorBlink {\n  from {\n    border-right-color: transparent;\n  }\n  to {\n    border-right-color: rgb(42, 42, 42);\n  }\n}\n@keyframes zcStrokeUD {\n  0%, 100% {\n    transform: translateY(0) rotate(-25deg);\n  }\n  50% {\n    transform: translateY(15px) rotate(-45deg);\n  }\n}\n@keyframes zcFloatHeart {\n  0% {\n    transform: translateY(0) scale(0.5);\n    opacity: 0;\n  }\n  15% {\n    opacity: 1;\n  }\n  100% {\n    transform: translateY(-70px) scale(1.1);\n    opacity: 0;\n  }\n}\n.zcCursor {\n  border-right: 2px solid var(--tmd-text, rgb(42, 42, 42));\n  width: fit-content;\n}\n.zcDisabled {\n  pointer-events: none;\n  opacity: 0.6;\n}\n";

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/modSdk.js
  var import_bondage_club_mod_sdk = __toESM(require_bcmodsdk());

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/logging.js
  var logs = [];
  var Logger = class {
    /**
    * Returns the list of all recorded log entries.
    */
    get logs() {
      return logs;
    }
    pushLog(level, message) {
      this.logs.push({
        level,
        message,
        timestamp: Date.now()
      });
      console[level](`%c${MOD_DATA.key}:`, "color: #00ffe7;", ...message);
    }
    /**
    * Logs a debug-level message.
    * @param message - The message arguments to log.
    */
    debug(...message) {
      this.pushLog("debug", message);
    }
    /**
    * Logs a standard-level message.
    * @param message - The message arguments to log.
    */
    log(...message) {
      this.pushLog("log", message);
    }
    /**
    * Logs a warning-level message.
    * @param message - The message arguments to log.
    */
    warn(...message) {
      this.pushLog("warn", message);
    }
    /**
    * Logs an error-level message.
    * @param message - The message arguments to log.
    */
    error(...message) {
      this.pushLog("error", message);
    }
  };
  var logger = new Logger();

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/modSdk.js
  var HookPriority = /* @__PURE__ */ ((HookPriority2) => {
    HookPriority2[HookPriority2["OBSERVE"] = 0] = "OBSERVE";
    HookPriority2[HookPriority2["ADD_BEHAVIOR"] = 1] = "ADD_BEHAVIOR";
    HookPriority2[HookPriority2["MODIFY_BEHAVIOR"] = 5] = "MODIFY_BEHAVIOR";
    HookPriority2[HookPriority2["OVERRIDE_BEHAVIOR"] = 10] = "OVERRIDE_BEHAVIOR";
    HookPriority2[HookPriority2["TOP"] = 100] = "TOP";
    return HookPriority2;
  })(HookPriority || {});
  var modSdk;
  function createModSdk() {
    modSdk = import_bondage_club_mod_sdk.default.registerMod({
      name: MOD_DATA.name,
      fullName: MOD_DATA.fullName,
      version: MOD_DATA.version,
      repository: MOD_DATA.repository
    });
  }
  function hookFunction(functionName, priority, hook) {
    if (!modSdk) throw new Error("zois-core is not registered");
    try {
      return modSdk.hookFunction(functionName, priority, hook);
    } catch (e) {
      logger.error(e);
      return () => {
      };
    }
  }

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shard-modules/shardModule.js
  var ShardModule = class {
    overrideContext(context, target) {
      return context;
    }
    layoutEffect(context, target) {
    }
    effect(context, target) {
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shard-modules/centerModule.js
  var CenterModule = class extends ShardModule {
    overrideContext(context, target) {
      target.style.transform = "translate(-50%, -50%)";
      context.x = 1e3;
      context.y = 500;
      return context;
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shard-modules/typeModule.js
  function type(element, duration) {
    if (!element) {
      throw new Error("Element not found");
    }
    const endValue = element.textContent;
    element.textContent = "\xA0";
    element.classList.add("zcCursor");
    let startTime;
    let animationFrameId;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      let progress = Math.min(elapsed / duration, 1);
      const currentValue = endValue.slice(0, parseInt(endValue.length * progress));
      if (currentValue.trim() !== "") element.textContent = currentValue;
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => element.classList.remove("zcCursor"), duration / endValue.length);
      }
    };
    animationFrameId = requestAnimationFrame(animate);
  }
  var TypeModule = class extends ShardModule {
    constructor(props) {
      super();
      this.props = props;
    }
    props;
    effect(context, target) {
      type(target, this.props.duration);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shard-modules/styleModule.js
  var StyleModule = class extends ShardModule {
    constructor(style) {
      super();
      this.style = style;
    }
    style;
    applyStyle(target, style) {
      for (const styleProperty of Object.keys(style)) {
        if (!isNaN(styleProperty) || typeof style[styleProperty] === "function" || typeof style[styleProperty] === "undefined") continue;
        target.style[styleProperty] = style[styleProperty];
      }
    }
    layoutEffect(context, target) {
      this.applyStyle(target, this.style);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/events.js
  var listeners = /* @__PURE__ */ new Map();
  var onceListeners = /* @__PURE__ */ new Map();
  function parseEventSpec(spec) {
    const idx = spec.indexOf(":");
    if (idx === -1) {
      return { event: spec, senderFilter: null };
    }
    return {
      senderFilter: spec.slice(0, idx),
      event: spec.slice(idx + 1)
    };
  }
  var EventBus = class {
    #id;
    get id() {
      return this.#id;
    }
    constructor(id) {
      this.#id = id;
    }
    emit(event, data) {
      const fullData = { ...data, sender: this.id };
      const commonEventListeners = listeners.get(event);
      if (commonEventListeners) {
        for (const listener of commonEventListeners) {
          try {
            if (listener.senderFilter) {
              if (listener.senderFilter === this.id) listener.callback(fullData);
            } else {
              listener.callback(fullData);
            }
          } catch (e) {
          }
        }
      }
      const onceEventListeners = onceListeners.get(event);
      if (onceEventListeners) {
        for (const listener of onceEventListeners) {
          try {
            if (listener.senderFilter) {
              if (listener.senderFilter === this.id) {
                listener.callback(fullData);
                onceEventListeners.delete(listener);
              }
            } else {
              listener.callback(fullData);
              onceEventListeners.delete(listener);
            }
          } catch (e) {
          }
        }
      }
    }
    on(eventSpec, callback) {
      const { event, senderFilter } = parseEventSpec(eventSpec);
      let eventListeners = listeners.get(event);
      if (!eventListeners) {
        eventListeners = /* @__PURE__ */ new Set();
        listeners.set(event, eventListeners);
      }
      const listener = {
        callback,
        senderFilter
      };
      eventListeners.add(listener);
      return () => {
        eventListeners.delete(listener);
      };
    }
    once(eventSpec, callback) {
      const { event, senderFilter } = parseEventSpec(eventSpec);
      let eventListeners = onceListeners.get(event);
      if (!eventListeners) {
        eventListeners = /* @__PURE__ */ new Set();
        onceListeners.set(event, eventListeners);
      }
      const listener = {
        callback,
        senderFilter
      };
      eventListeners.add(listener);
      return () => {
        eventListeners.delete(listener);
      };
    }
  };
  var createdBuses = /* @__PURE__ */ new Map();
  function getEventBus(id) {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("id must be a non-empty string");
    }
    if (createdBuses.has(id)) {
      throw new Error(
        `EventBus with id "${id}" already exists`
      );
    }
    const bus = new EventBus(id);
    createdBuses.set(id, bus);
    return bus;
  }
  var eventBus = null;
  function createEventBus() {
    try {
      eventBus = window.ZOIS_CORE.getEventBus(MOD_DATA.name);
    } catch (e) {
      logger.error("Failed to create EventBus:", e);
    }
  }

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/shard.js
  var Shard = class {
    constructor(context) {
      this.context = context;
      this.body = this.generateBody();
      this.processModules("overrideContext");
      this.processModules("layoutEffect");
    }
    context;
    body = null;
    get mountReturnValue() {
      return this.body?.base ?? null;
    }
    mount(parentElement = this.context.parent ?? document.body) {
      parentElement.append(this.body.base);
      this.update();
      this.processModules("effect");
      eventBus?.emit("shardMounted", {
        shard: this
      });
      window.addEventListener("resize", () => this.update());
      eventBus?.once("subscreenUnloaded", () => {
        this.body.base.remove();
        eventBus?.emit("shardUnmounted", {
          shard: this
        });
      });
      return this.mountReturnValue;
    }
    processModules(stage) {
      const modules = this.context.modules ?? {};
      if (stage === "overrideContext") {
        for (const key of Object.keys(modules)) {
          for (const module2 of modules[key] ?? []) {
            if (module2 instanceof ShardModule) {
              if (this.body?.[key]) {
                try {
                  this.context = module2.overrideContext(this.context, this.body[key]);
                } catch (e) {
                  logger.error("OverrideContext call failed in", module2, e);
                }
              }
            }
          }
        }
      }
      if (stage === "layoutEffect") {
        for (const key of Object.keys(modules)) {
          for (const module2 of modules[key] ?? []) {
            if (module2 instanceof ShardModule) {
              if (this.body?.[key]) {
                try {
                  module2.layoutEffect(this.context, this.body[key]);
                } catch (e) {
                  logger.error("LayoutEffect call failed in", module2, e);
                }
              }
            }
          }
        }
      }
      if (stage === "effect") {
        for (const key of Object.keys(modules)) {
          for (const module2 of modules[key] ?? []) {
            if (module2 instanceof ShardModule) {
              if (this.body?.[key]) {
                try {
                  module2.effect(this.context, this.body[key]);
                } catch (e) {
                  logger.error("Effect call failed in", module2, e);
                }
              }
            }
          }
        }
      }
    }
    update() {
      const { x, y, anchor, padding, width, height } = this.context;
      if (typeof x === "number" && typeof y === "number") setPosition(this.body.base, x, y, anchor);
      if (padding) setPadding(this.body.base, padding);
      if (width) this.body.base.style.width = getRelativeWidth(width) + "px";
      if (height) this.body.base.style.height = getRelativeHeight(height) + "px";
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/backNextButtonShard.js
  var BackNextButtonShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {
          display: "flex",
          columnGap: "2vw",
          justifyContent: "center",
          alignItems: "center",
          background: "var(--tmd- element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, black)",
          borderRadius: "4px"
        }
      };
    }
    get dynamicClassButton() {
      return {
        base: {
          cursor: "pointer",
          background: "var(--tmd-element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, rgb(34, 34, 34))",
          borderRadius: "6px"
        },
        hover: {
          background: "var(--tmd-element-hover, #ebf7fe)",
          borderColor: "var(--tmd-accent-hover, #7dd3fc)",
          color: "var(--tmd-accent-hover, #015a8c)"
        },
        disabled: {
          background: "var(--tmd-element-disabled, #ffa590)",
          pointerEvents: "none"
        }
      };
    }
    generateBody() {
      const { onChange, isDisabled } = this.context;
      const div = document.createElement("div");
      addDynamicClass(div, this.dynamicClassContainer);
      setFontFamily(div, MOD_DATA.fontFamily);
      let currentIndex = this.context.currentIndex;
      let items = this.context.items;
      const updateClasses = () => {
        if (currentIndex === 0 || typeof isDisabled === "function" && isDisabled(items[currentIndex - 1][1])) backBtn.disabled = true;
        else backBtn.disabled = false;
        if (currentIndex === items.length - 1 || typeof isDisabled === "function" && isDisabled(items[currentIndex + 1][1])) nextBtn.disabled = true;
        else nextBtn.disabled = false;
        ;
      };
      const backBtn = document.createElement("button");
      backBtn.style.cssText = `
                position: absolute; left: 1vw; font-size: 3.5vw; aspect-ratio: 1/1;
                height: 140%; background-image: url("Icons/Prev.png"); background-size: 100%;
                `;
      addDynamicClass(backBtn, this.dynamicClassButton);
      backBtn.addEventListener("click", () => {
        if (currentIndex === 0) return backBtn.classList.add("zcDisabled");
        if (typeof isDisabled === "function" && isDisabled(items[currentIndex - 1][1])) return backBtn.classList.add("zcDisabled");
        currentIndex--;
        text.textContent = items[currentIndex][0];
        if (typeof onChange === "function") onChange(items[currentIndex][1]);
        updateClasses();
      });
      const nextBtn = document.createElement("button");
      nextBtn.style.cssText = `
                position: absolute; right: 1vw; font-size: 3.5vw; aspect-ratio: 1/1;
                height: 140%; background-image: url("Icons/Next.png"); background-size: 100%;
                `;
      addDynamicClass(nextBtn, this.dynamicClassButton);
      nextBtn.addEventListener("click", () => {
        if (currentIndex === items.length - 1) return nextBtn.classList.add("zcDisabled");
        if (typeof isDisabled === "function" && isDisabled(items[currentIndex + 1][1])) return nextBtn.classList.add("zcDisabled");
        currentIndex++;
        text.textContent = items[currentIndex][0];
        if (typeof onChange === "function") onChange(items[currentIndex][1]);
        updateClasses();
      });
      updateClasses();
      const text = document.createElement("b");
      text.textContent = items[currentIndex][0];
      div.append(backBtn, text, nextBtn);
      return {
        base: div,
        backButton: backBtn,
        nextButton: nextBtn,
        text
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/defaultAttributes.mjs
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": 2,
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/createElement.mjs
  var createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.keys(attrs).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children?.length) {
      children.forEach((child) => {
        const childElement = createSVGElement(child);
        element.appendChild(childElement);
      });
    }
    return element;
  };
  var createElement = (iconNode, customAttrs = {}) => {
    const tag = "svg";
    const attrs = {
      ...defaultAttributes,
      ...customAttrs
    };
    return createSVGElement([tag, attrs, iconNode]);
  };

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/book-text.mjs
  var BookText = [
    [
      "path",
      { d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" }
    ],
    ["path", { d: "M8 11h8" }],
    ["path", { d: "M8 7h6" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/bug.mjs
  var Bug = [
    ["path", { d: "M12 20v-9" }],
    ["path", { d: "M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" }],
    ["path", { d: "M14.12 3.88 16 2" }],
    ["path", { d: "M21 21a4 4 0 0 0-3.81-4" }],
    ["path", { d: "M21 5a4 4 0 0 1-3.55 3.97" }],
    ["path", { d: "M22 13h-4" }],
    ["path", { d: "M3 21a4 4 0 0 1 3.81-4" }],
    ["path", { d: "M3 5a4 4 0 0 0 3.55 3.97" }],
    ["path", { d: "M6 13H2" }],
    ["path", { d: "m8 2 1.88 1.88" }],
    ["path", { d: "M9 7.13V6a3 3 0 1 1 6 0v1.13" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/check.mjs
  var Check = [["path", { d: "M20 6 9 17l-5-5" }]];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/chevron-down.mjs
  var ChevronDown = [["path", { d: "m6 9 6 6 6-6" }]];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/circle-alert.mjs
  var CircleAlert = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/circle-check.mjs
  var CircleCheck = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m9 12 2 2 4-4" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/circle-x.mjs
  var CircleX = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "m15 9-6 6" }],
    ["path", { d: "m9 9 6 6" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/code-xml.mjs
  var CodeXml = [
    ["path", { d: "m18 16 4-4-4-4" }],
    ["path", { d: "m6 8-4 4 4 4" }],
    ["path", { d: "m14.5 4-5 16" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/crown.mjs
  var Crown = [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
      }
    ],
    ["path", { d: "M5 21h14" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/external-link.mjs
  var ExternalLink = [
    ["path", { d: "M15 3h6v6" }],
    ["path", { d: "M10 14 21 3" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/git-pull-request.mjs
  var GitPullRequest = [
    ["circle", { cx: "18", cy: "18", r: "3" }],
    ["circle", { cx: "6", cy: "6", r: "3" }],
    ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7" }],
    ["line", { x1: "6", x2: "6", y1: "9", y2: "21" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/heart.mjs
  var Heart = [
    [
      "path",
      {
        d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
      }
    ]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/info.mjs
  var Info = [
    ["circle", { cx: "12", cy: "12", r: "10" }],
    ["path", { d: "M12 16v-4" }],
    ["path", { d: "M12 8h.01" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/lock-keyhole.mjs
  var LockKeyhole = [
    ["circle", { cx: "12", cy: "16", r: "1" }],
    ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2" }],
    ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/radio.mjs
  var Radio = [
    ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478" }],
    ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134" }],
    ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134" }],
    ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478" }],
    ["circle", { cx: "12", cy: "12", r: "2" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/rotate-ccw.mjs
  var RotateCcw = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }],
    ["path", { d: "M3 3v5h5" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/save.mjs
  var Save = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
      }
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/square-pen.mjs
  var SquarePen = [
    ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }],
    [
      "path",
      {
        d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
      }
    ]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/terminal.mjs
  var Terminal = [
    ["path", { d: "M12 19h8" }],
    ["path", { d: "m4 17 6-6-6-6" }]
  ];

  // node_modules/.pnpm/lucide@1.29.0/node_modules/lucide/dist/esm/icons/trash-2.mjs
  var Trash2 = [
    ["path", { d: "M10 11v6" }],
    ["path", { d: "M14 11v6" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" }],
    ["path", { d: "M3 6h18" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }]
  ];

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/buttonShard.js
  var ButtonShard = class extends Shard {
    get dynamicClassButton() {
      return {
        base: {
          cursor: "pointer",
          background: "var(--tmd-element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, rgb(34, 34, 34))",
          borderRadius: "6px"
        },
        hover: {
          background: "var(--tmd-element-hover, #ebf7fe)",
          borderColor: "var(--tmd-accent-hover, #7dd3fc)",
          color: "var(--tmd-accent-hover, #015a8c)"
        },
        "> .tooltip": {
          position: "absolute",
          color: "var(--tmd-text, black)",
          textAlign: "center",
          padding: "0.3em 0.6em",
          borderRadius: "4px",
          background: "var(--tmd-element-hint, #e6e6e6)",
          width: "max-content",
          visibility: "hidden",
          zIndex: "10"
        },
        "> .tooltip[position=left]": {
          right: "calc(100% + 1vw)"
        },
        "> .tooltip[position=right]": {
          left: "calc(100% + 1vw)"
        },
        ":hover .tooltip": {
          visibility: "visible"
        },
        "[data-zc-variant=filled]": {
          background: "var(--tmd-accent, #111)",
          border: "2px solid var(--tmd-accent, #111)",
          color: "var(--tmd-text, white)"
        },
        "[data-zc-variant=filled]:hover": {
          background: "var(--tmd-accent-hover, none)",
          color: "var(--tmd-text, black)"
        },
        "> .external-link-icon": {
          display: "flex",
          columnGap: "0.25em",
          position: "absolute",
          right: "-0.25em",
          top: "-0.25em",
          width: "0.75em",
          height: "0.75em",
          background: "var(--tmd-accent, #5b5bff)",
          color: "var(--tmd-text, white)",
          padding: "0.1em",
          boxSizing: "border-box",
          borderRadius: "50%"
        }
      };
    }
    generateBody() {
      const { height, text, variant, icon, iconAbsolutePosition = true, tooltip, href, onClick, isDisabled } = this.context;
      let iconElement;
      let textElement;
      const btn = document.createElement("button");
      addDynamicClass(btn, this.dynamicClassButton);
      btn.setAttribute("data-zc-variant", variant);
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.columnGap = "1.25vw";
      setFontFamily(btn, MOD_DATA.fontFamily);
      if (icon) {
        if (typeof icon === "string") {
          iconElement = document.createElement("img");
          iconElement.src = icon;
        } else {
          iconElement = icon;
        }
        iconElement.style.height = "80%";
        iconElement.style.width = "auto";
        if (text && iconAbsolutePosition) {
          iconElement.style.position = "absolute";
          iconElement.style.left = "1vw";
        }
        if (text && !iconAbsolutePosition) btn.style.justifyContent = "";
        btn.append(iconElement);
      }
      if (text) {
        textElement = document.createElement("span");
        textElement.textContent = text;
        if (height) {
          textElement.style.overflow = "hidden";
          textElement.style.textOverflow = "ellipsis";
          textElement.style.whiteSpace = "nowrap";
          textElement.style.maxHeight = "100%";
        }
        btn.append(textElement);
      }
      if (tooltip) {
        const tooltipEl = document.createElement("span");
        tooltipEl.classList.add("tooltip");
        tooltipEl.setAttribute("position", tooltip.position);
        tooltipEl.textContent = tooltip.text;
        btn.append(tooltipEl);
      }
      if (href) {
        const externalLinkContainer = document.createElement("div");
        externalLinkContainer.classList.add("external-link-icon");
        const externalLinkIcon = createElement(ExternalLink);
        externalLinkIcon.style.width = "auto";
        externalLinkIcon.style.height = "100%";
        externalLinkContainer.append(externalLinkIcon);
        btn.append(externalLinkContainer);
        let hrefTooltip = null;
        btn.addEventListener("mouseenter", () => {
          if (hrefTooltip) return;
          hrefTooltip = document.createElement("div");
          hrefTooltip.style.cssText = `position: fixed; top: 0; left: 0; right: 0; bottom: 0; margin: auto;
                width: fit-content; height: fit-content; font-size: calc(3.5px * var(--size-unit));
                z-index: 100; color: var(--tmd-text, black); background: var(--tmd-element, #f8f8f8); padding: 0.2em;
                border-radius: 4px; border: 1px solid var(--tmd-element-hover, #9f9f9f);`;
          setFontFamily(hrefTooltip, CommonGetFontName());
          hrefTooltip.textContent = href;
          document.body.append(hrefTooltip);
        });
        btn.addEventListener("mouseleave", () => {
          if (!hrefTooltip) return;
          hrefTooltip.remove();
          hrefTooltip = null;
        });
      }
      if (typeof isDisabled === "function" && isDisabled()) btn.classList.add("zcDisabled");
      btn.addEventListener("click", () => {
        if (typeof isDisabled === "function" && isDisabled()) return btn.classList.add("zcDisabled");
        if (typeof onClick === "function") onClick();
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      });
      return {
        text: textElement,
        icon: iconElement,
        base: btn
      };
    }
    update() {
      super.update();
      if ((this.context.fontSize ?? "auto") === "auto") autosetFontSize(this.body.base);
      else if (typeof this.context.fontSize === "number") setFontSize(this.body.base, this.context.fontSize);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/cardShard.js
  var CardShard = class extends Shard {
    generateBody() {
      const { name, value, icon } = this.context;
      const cardEl = document.createElement("div");
      cardEl.classList.add("zcCard");
      setFontFamily(cardEl, MOD_DATA.fontFamily);
      const cardName = document.createElement("p");
      cardName.classList.add("zcCard_name");
      cardName.textContent = name;
      const cardValue = document.createElement("p");
      cardValue.classList.add("zcCard_value");
      cardValue.textContent = `${value}`;
      if (icon) {
        icon.style.cssText += "position: absolute; top: 0.4em; right: 0.4em; width: 1.2em; height: 1.2em;";
        cardEl.append(icon);
      }
      cardEl.append(cardName, cardValue);
      return {
        base: cardEl,
        name: cardName,
        value: cardValue,
        icon
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/checkboxShard.js
  var CheckboxShard = class extends Shard {
    get dynamicClassInput() {
      return {
        base: {
          width: "min(6dvh, 3dvw)",
          height: "min(6dvh, 3dvw)",
          borderRadius: "min(0.8dvh, 0.3dvw)",
          border: "var(--border-width, 2px) solid #333",
          backgroundColor: "var(--checkbox-color, #fff)",
          position: "relative",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0",
          transition: "background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          appearance: "none"
        },
        ":checked": {
          backgroundColor: "var(--tmd-accent, black)",
          borderColor: "var(--tmd-accent, black)"
        },
        ":checked + svg": {
          strokeDashoffset: "0"
        },
        ":checked:hover": {
          backgroundColor: "var(--tmd-accent-hover, black)"
        },
        ".zcDisabled": {
          opacity: "0.6",
          cursor: "not-allowed",
          backgroundColor: "var(--disabled-color, #e5e5e5)"
        },
        ".pop": {
          animation: "pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
        }
      };
    }
    get dynamicClassCheckmark() {
      return {
        base: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "70%",
          pointerEvents: "none",
          stroke: "var(--tmd-text, white)",
          strokeWidth: "3.5",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "none",
          strokeDasharray: "24",
          strokeDashoffset: "24",
          transition: "stroke-dashoffset 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)"
        }
      };
    }
    get dynamicClassTooltip() {
      return {
        base: {
          position: "absolute",
          color: "var(--tmd-text, black)",
          fontSize: "0.65em",
          textAlign: "center",
          padding: "0.3em 0.6em",
          borderRadius: "4px",
          background: "var(--tmd-element-hint, #e6e6e6)",
          width: "max-content",
          visibility: "hidden",
          zIndex: "10",
          pointerEvents: "none",
          whiteSpace: "nowrap"
        },
        "[position=left]": {
          right: "calc(100% + 1vw)"
        },
        "[position=right]": {
          left: "calc(100% + 1vw)"
        }
      };
    }
    get dynamicClassBox() {
      return {
        base: {
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: "0"
        },
        ":hover .tooltip": {
          visibility: "visible"
        }
      };
    }
    get textColor() {
      return "var(--tmd-text, black)";
    }
    generateBody() {
      const { isChecked, text, tooltip, onChange, isDisabled } = this.context;
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.columnGap = "1vw";
      wrapper.style.padding = "0.25em";
      setFontFamily(wrapper, MOD_DATA.fontFamily);
      const box = document.createElement("div");
      addDynamicClass(box, this.dynamicClassBox);
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = isChecked;
      input.classList.add("zcCheckbox");
      addDynamicClass(input, this.dynamicClassInput);
      const checkmark = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      checkmark.setAttribute("viewBox", "0 0 24 24");
      checkmark.setAttribute("class", "checkmark");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", "M5 13L9 17L19 7");
      checkmark.appendChild(path);
      addDynamicClass(checkmark, this.dynamicClassCheckmark);
      box.append(input, checkmark);
      const label = document.createElement("p");
      label.textContent = text;
      label.style.color = this.textColor;
      label.style.margin = "0";
      if (typeof isDisabled === "function" && isDisabled()) {
        input.disabled = true;
        wrapper.classList.add("zcDisabled");
      }
      input.addEventListener("change", () => {
        if (typeof isDisabled === "function" && isDisabled()) {
          input.checked = !input.checked;
          return;
        }
        if (typeof onChange === "function") onChange();
        if (input.checked) {
        }
      });
      wrapper.append(box, label);
      if (tooltip) {
        const tooltipEl = document.createElement("span");
        tooltipEl.classList.add("tooltip");
        tooltipEl.setAttribute("position", tooltip.position);
        tooltipEl.textContent = tooltip.text;
        addDynamicClass(tooltipEl, this.dynamicClassTooltip);
        box.appendChild(tooltipEl);
      }
      return {
        base: wrapper,
        checkbox: input,
        label
      };
    }
    update() {
      super.update();
      if (this.body?.base) {
        autosetFontSize(this.body.base);
      }
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/containerShard.js
  var ContainerShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {},
        "> div:first-child::-webkit-scrollbar": {
          display: "none"
        },
        "> div:first-child": {
          scrollbarWidth: "none"
        }
      };
    }
    get mountReturnValue() {
      return this.body?.content ?? null;
    }
    generateBody() {
      const scrollMode = this.context.scroll ?? "auto";
      const container = document.createElement("div");
      container.style.position = "relative";
      addDynamicClass(container, this.dynamicClassContainer);
      const mayNeedVerticalScrollbar = scrollMode === "y" || scrollMode === "all" || scrollMode === "auto";
      const containerContent = document.createElement("div");
      containerContent.style.width = "100%";
      containerContent.style.height = "100%";
      containerContent.style.boxSizing = "border-box";
      switch (scrollMode) {
        case "all":
          containerContent.style.overflow = "scroll";
          break;
        case "x":
          containerContent.style.overflowX = "scroll";
          containerContent.style.overflowY = "hidden";
          break;
        case "y":
          containerContent.style.overflowY = "scroll";
          containerContent.style.overflowX = "hidden";
          break;
        case "none":
          containerContent.style.overflow = "unset";
          break;
        case "auto":
        default:
          containerContent.style.overflow = "auto";
          break;
      }
      const scrollbar = document.createElement("div");
      scrollbar.style.cssText = `
      position: absolute;
      right: 0;
      top: 50%;
      display: none;
      flex-direction: column;
      gap: calc(var(--size-unit) * 1.25px);
      transform: translateY(-50%);
      pointer-events: none;
      z-index: 10;
      width: calc(var(--size-unit) * 1.25px);
    `;
      const diamonds = [];
      for (let i = 0; i < 6; i++) {
        const diamond = document.createElement("div");
        diamond.style.cssText = `
        transform: rotate(45deg);
        width: 100%;
        aspect-ratio: 1/1;
        background: var(--tmd-element, gray);
        border: 1px solid var(--tmd-accent, black);
        transition: background 0.15s ease, transform 0.15s ease;
      `;
        scrollbar.append(diamond);
        diamonds.push(diamond);
      }
      const updateIndicators = () => {
        const maxScroll = containerContent.scrollHeight - containerContent.clientHeight;
        if (maxScroll <= 1) {
          diamonds.forEach((d) => {
            d.style.background = "var(--tmd-element, gray)";
            d.style.transform = "rotate(45deg) scale(1)";
          });
          return;
        }
        const progress = Math.min(1, Math.max(0, containerContent.scrollTop / maxScroll));
        const activeIndex = Math.round(progress * (diamonds.length - 1));
        diamonds.forEach((diamond, i) => {
          if (i === activeIndex) {
            diamond.style.background = "var(--tmd-accent, #fff)";
            diamond.style.transform = "rotate(45deg) scale(1.25)";
          } else if (i < activeIndex) {
            diamond.style.background = "var(--tmd-element, #aaa)";
            diamond.style.transform = "rotate(45deg) scale(1)";
          } else {
            diamond.style.background = "var(--tmd-element-hover, gray)";
            diamond.style.transform = "rotate(45deg) scale(1)";
          }
        });
      };
      containerContent.addEventListener("scroll", updateIndicators, { passive: true });
      const needsVerticalScrollbar = scrollMode === "y" || scrollMode === "all";
      const updateScrollbarVisibility = () => {
        const isOverflowing = containerContent.scrollHeight - containerContent.clientHeight > 1;
        const shouldShow = needsVerticalScrollbar || scrollMode === "auto" && isOverflowing;
        containerContent.style.paddingRight = shouldShow ? "min(2vw, 2vh)" : "";
        scrollbar.style.display = shouldShow ? "flex" : "none";
        updateIndicators();
      };
      if (mayNeedVerticalScrollbar) {
        const resizeObserver = new ResizeObserver(() => {
          requestAnimationFrame(updateScrollbarVisibility);
        });
        resizeObserver.observe(containerContent);
        const mutationObserver = new MutationObserver(() => {
          requestAnimationFrame(updateScrollbarVisibility);
        });
        mutationObserver.observe(containerContent, {
          childList: true,
          subtree: true,
          characterData: true
        });
        requestAnimationFrame(updateScrollbarVisibility);
      }
      container.append(containerContent, scrollbar);
      return {
        base: container,
        content: containerContent,
        scrollbar
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/imageShard.js
  var ImageShard = class extends Shard {
    modal = null;
    generateBody() {
      const { src, alt = "" } = this.context;
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.style.cursor = "zoom-in";
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.addEventListener("click", () => this.openModal(src, alt));
      return {
        base: img
      };
    }
    openModal(src, alt) {
      this.closeModal();
      this.modal = document.createElement("div");
      this.modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
      const modalContent = document.createElement("div");
      modalContent.style.cssText = `
            position: relative;
            max-width: 90vw;
            max-height: 90vh;
            transform: scale(0.7);
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
      const bigImg = document.createElement("img");
      bigImg.src = src;
      bigImg.alt = alt;
      bigImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
        `;
      const closeBtn = document.createElement("button");
      closeBtn.innerHTML = "\u2715";
      closeBtn.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            color: black;
            font-size: 20px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
        `;
      modalContent.appendChild(bigImg);
      modalContent.appendChild(closeBtn);
      this.modal.appendChild(modalContent);
      document.body.appendChild(this.modal);
      setTimeout(() => {
        this.modal.style.opacity = "1";
        modalContent.style.transform = "scale(1)";
      }, 10);
      const close = () => this.closeModal();
      closeBtn.addEventListener("click", close);
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      }, { once: true });
    }
    closeModal() {
      if (!this.modal) return;
      this.modal.style.opacity = "0";
      setTimeout(() => {
        this.modal?.remove();
        this.modal = null;
      }, 300);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/inputListShard.js
  var InputListShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {
          display: "flex",
          flexDirection: "column",
          gap: "1vw",
          border: "2px solid var(--tmd-accent, black)",
          borderRadius: "4px",
          padding: "0.75vw",
          boxSizing: "border-box",
          background: "var(--tmd-element, none)"
        },
        "> div:first-child": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "0.75vw",
          width: "100%"
        },
        "> div:first-child > b": {
          fontSize: "clamp(10px, 2.4vw, 28px)",
          color: "var(--tmd-text, black)"
        },
        "> div:first-child > div:last-child": {
          display: "flex",
          columnGap: "0.75vw"
        },
        "> div:last-child": {
          display: "flex",
          gap: "0.25em",
          alignContent: "flex-start",
          flexWrap: "wrap",
          overflowY: "scroll",
          width: "100%"
        },
        "> div:last-child > div": {
          cursor: "pointer",
          background: "var(--tmd-element-hover, rgb(206, 206, 206))",
          color: "var(--tmd-text, black)",
          height: "fit-content",
          padding: "0.25em 0.45em",
          borderRadius: "0.25em",
          fontSize: "clamp(8px, 1.85vw, 24px)"
        }
      };
    }
    get dynamicClassInput() {
      return {
        base: {
          border: "none !important",
          outline: "none !important",
          background: "none !important",
          flexGrow: "1",
          width: "6vw",
          fontSize: "clamp(8px, 1.85vw, 20px)"
        }
      };
    }
    get dynamicClassToolsButton() {
      return {
        base: {
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          background: "var(--tmd-accent, #333)",
          color: "white",
          width: "2.5vw",
          aspectRatio: "1/1",
          borderRadius: "8px",
          border: "none"
        },
        hover: {
          background: "var(--tmd-accent-hover, #00c2cc)"
        }
      };
    }
    generateBody() {
      const { value, title, fontSize, numbersOnly, onChange, isDisabled } = this.context;
      const checkbox = document.createElement("div");
      const items = [];
      const div = document.createElement("div");
      addDynamicClass(div, this.dynamicClassContainer);
      setFontFamily(div, MOD_DATA.fontFamily);
      const headerElement = document.createElement("div");
      const toolsElement = document.createElement("div");
      const titleElement = document.createElement("b");
      titleElement.textContent = title + ":";
      const itemsElement = document.createElement("div");
      const input = document.createElement("input");
      addDynamicClass(input, this.dynamicClassInput);
      const addButton = (icon, onClick) => {
        const b = document.createElement("button");
        addDynamicClass(b, this.dynamicClassToolsButton);
        icon.style.cssText = "width: 80%; height: auto;";
        b.append(icon);
        b.addEventListener("click", onClick);
        toolsElement.append(b);
      };
      const addItem = (text) => {
        const item = document.createElement("div");
        item.textContent = text;
        itemsElement.insertBefore(item, input);
        item.addEventListener("click", (e) => {
          if (item.style.border === "") item.style.border = "2px solid red";
          else item.style.border = "";
          e.stopPropagation();
        });
        items.push(text);
      };
      addButton(createElement(RotateCcw), () => {
        if (typeof isDisabled === "function" && isDisabled()) return div.classList.add("zcDisabled");
        itemsElement.innerHTML = "";
        items.splice(0, items.length);
        itemsElement.append(input);
        value?.forEach((v) => addItem(String(v)));
        if (typeof onChange === "function") onChange(numbersOnly ? items.map((i) => parseInt(i, 10)) : items);
      });
      addButton(createElement(Trash2), () => {
        if (typeof isDisabled === "function" && isDisabled()) return div.classList.add("zcDisabled");
        for (const c of [...itemsElement.children]) {
          if (c.getAttribute("style")?.includes("border: 2px solid red;")) {
            items.splice(items.indexOf(c.textContent), 1);
            c.remove();
          }
        }
        if (typeof onChange === "function") onChange(numbersOnly ? items.map((i) => parseInt(i, 10)) : items);
      });
      if (typeof isDisabled === "function" && isDisabled()) div.classList.add("zcDisabled");
      input.addEventListener("keypress", (e) => {
        if (document.activeElement === input) {
          switch (e.key) {
            case "Enter":
              if (numbersOnly && Number.isNaN(parseInt(input.value))) return;
              if (input.value.trim() === "") return;
              if (typeof isDisabled === "function" && isDisabled()) return div.classList.add("zcDisabled");
              addItem(input.value);
              input.value = "";
              if (typeof onChange === "function") onChange(numbersOnly ? items.map((i) => parseInt(i, 10)) : items);
              break;
          }
        }
      });
      div.addEventListener("click", (e) => {
        if (e.currentTarget == div) input.focus();
      });
      headerElement.append(titleElement, toolsElement);
      itemsElement.append(input);
      div.append(headerElement, itemsElement);
      value?.forEach((v) => addItem(String(v)));
      return {
        base: div,
        input
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/inputShard.js
  var InputShard = class extends Shard {
    generateBody() {
      const { textArea, placeholder, value, isDisabled, onChange, onInput } = this.context;
      const input = document.createElement(textArea ? "textarea" : "input");
      input.classList.add("zcInput");
      if (placeholder) input.placeholder = placeholder;
      if (value) input.value = value;
      setFontFamily(input, MOD_DATA.fontFamily);
      if (typeof isDisabled === "function" && isDisabled()) input.classList.add("zcDisabled");
      input.addEventListener("change", () => {
        if (typeof isDisabled === "function" && isDisabled()) return input.classList.add("zcDisabled");
        if (typeof onChange === "function") onChange();
      });
      input.addEventListener("input", () => {
        if (typeof isDisabled === "function" && isDisabled()) return input.classList.add("zcDisabled");
        if (typeof onInput === "function") onInput();
      });
      return {
        base: input
      };
    }
    update() {
      super.update();
      if ((this.context.fontSize ?? "auto") === "auto") autosetFontSize(this.body.base);
      else if (typeof this.context.fontSize === "number") setFontSize(this.body.base, this.context.fontSize);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/selectShard.js
  var SelectShard = class extends Shard {
    get dynamicClassContainer() {
      return {
        base: {
          cursor: "pointer",
          background: "var(--tmd-element, white)",
          color: "var(--tmd-text, black)",
          border: "2px solid var(--tmd-accent, rgb(195, 195, 195))",
          borderRadius: "0.4em",
          padding: "0.25em",
          boxSizing: "border-box",
          zIndex: "10"
        },
        "[opened=true]": {
          borderColor: "var(--tmd-accent-hover, rgb(0, 96, 223))"
        },
        "[opened=false]:hover": {
          borderColor: "var(--tmd-accent-hover, rgb(170, 170, 170))"
        },
        "> p": {
          margin: "0"
        },
        ">svg": {
          position: "absolute",
          right: "0.45em",
          top: "50%",
          transform: "translateY(-50%)",
          width: "1.5em",
          height: "1.5em",
          color: "var(--tmd-accent, rgb(0, 96, 223))"
        },
        ">div[data-zc-position='bottom']": {
          position: "absolute",
          top: "calc(100% + 0.45em)",
          left: "0",
          width: "100%",
          background: "var(--tmd-element, #f6f6f6)",
          border: "2px solid var(--tmd-element-hover, rgb(235 235 235))",
          borderRadius: "0.4em"
        },
        ">div[data-zc-position='top']": {
          position: "absolute",
          bottom: "calc(100% + 0.45em)",
          left: "0",
          width: "100%",
          background: "var(--tmd-element, #f6f6f6)",
          border: "2px solid var(--tmd-element-hover, rgb(235 235 235))",
          borderRadius: "0.4em"
        },
        ">div>div": {
          color: "var(--tmd-text, black)",
          width: "100%",
          padding: "0.25em",
          boxSizing: "border-box",
          borderRadius: "0.25em"
        },
        ">div>div>svg": {
          width: "1.25em",
          height: "1.25em",
          color: "var(--tmd-accent, rgb(0, 96, 223))"
        },
        ">div>div:hover": {
          background: "var(--tmd-element-hover, #ededed)"
        }
      };
    }
    generateBody() {
      let { options, currentOption, x, y } = CommonCloneDeep(this.context);
      let isOpened = false;
      let optionsContainer;
      const select = document.createElement("div");
      addDynamicClass(select, this.dynamicClassContainer);
      setFontFamily(select, MOD_DATA.fontFamily);
      select.setAttribute("opened", false);
      select.addEventListener("click", () => {
        if (this.context.isDisabled && this.context.isDisabled()) return select.classList.add("zcDisabled");
        if (isOpened) {
          isOpened = false;
          optionsContainer.remove();
        } else {
          isOpened = true;
          optionsContainer = document.createElement("div");
          optionsContainer.setAttribute(
            "data-zc-position",
            typeof y === "number" && y > 500 - select.offsetHeight / 2 ? "top" : "bottom"
          );
          options.forEach((option) => {
            const e = document.createElement("div");
            e.style.cssText = "display: flex; align-items: center; column-gap: 0.5em;";
            if (option.icon) {
              option.icon.style.cssText = "color: #bcbcbc;";
              e.append(option.icon);
            }
            e.append(option.text);
            if (option.name === currentOption) {
              e.append(checkmark);
            }
            e.addEventListener("click", () => {
              currentOption = option.name;
              p.textContent = option.text;
              optionsContainer.remove();
              if (this.context.onChange) this.context.onChange(option.name);
            });
            optionsContainer.append(e);
          });
          select.append(optionsContainer);
        }
      });
      const p = document.createElement("p");
      p.textContent = options.find((option) => option.name === currentOption)?.text ?? "";
      const arrow = createElement(ChevronDown);
      const checkmark = createElement(Check);
      checkmark.style.cssText = "position: absolute; right: 0.25em;";
      select.append(p, arrow);
      if (this.context.isDisabled && this.context.isDisabled()) select.classList.add("zcDisabled");
      return {
        base: select
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/svgShard.js
  var SvgShard = class extends Shard {
    generateBody() {
      const { dataurl, size, fill = "var(--tmd-accent, black)", stroke = "var(--tmd-accent-hover, black)", strokeWidth = "2px" } = this.context;
      function dataURLToSVGElement(dataURL) {
        const svgEncoded = dataURL.replace("data:image/svg+xml,", "");
        const svgString = decodeURIComponent(svgEncoded);
        const div = document.createElement("div");
        div.innerHTML = svgString;
        return div.firstElementChild;
      }
      const svg = dataURLToSVGElement(dataurl);
      if (svg) {
        recolorSVG(svg, { fill, stroke });
        svg.setAttribute("stroke-width", strokeWidth);
      }
      return {
        base: svg
      };
    }
    update() {
      super.update();
      setSize(this.body.base, this.context.size, this.context.size);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/tabsShard.js
  var TabsShard = class extends Shard {
    tabHandlers = {};
    clearDrawProcessHook = null;
    constructor(context) {
      super(context);
    }
    generateBody() {
      this.tabHandlers ??= {};
      this.clearDrawProcessHook = null;
      const { tabs, currentTabName } = this.context;
      let tabElements = [];
      const tabsEl = document.createElement("div");
      tabsEl.classList.add("zcTabs");
      setFontFamily(tabsEl, MOD_DATA.fontFamily);
      tabs.forEach((tab) => {
        const switchTab = () => {
          for (const c of tabsEl.children) {
            c.removeAttribute("data-opened");
          }
          for (const c of tabElements) {
            if (c instanceof Node) document.body.removeChild(c);
          }
          tabElements = [];
          tabEl.setAttribute("data-opened", "true");
          const originalAppend = document.body.append.bind(document.body);
          document.body.append = (...nodes) => {
            tabElements.push(...nodes);
            originalAppend(...nodes);
          };
          this.clearDrawProcessHook?.();
          this.tabHandlers.unload?.();
          this.tabHandlers.exit?.();
          this.tabHandlers = {
            run: tab.run,
            load: tab.load,
            unload: tab.unload,
            exit: tab.exit
          };
          this.clearDrawProcessHook = null;
          this.tabHandlers.load?.();
          if (tab.run) {
            this.clearDrawProcessHook = hookFunction("DrawProcess", HookPriority.ADD_BEHAVIOR, (args, next) => {
              next(args);
              tab.run?.();
            });
          }
          document.body.append = originalAppend;
        };
        const tabEl = document.createElement("button");
        tabEl.textContent = tab.name;
        if (tab.name === currentTabName) switchTab();
        tabEl.addEventListener("click", switchTab);
        tabsEl.append(tabEl);
      });
      eventBus?.once("subscreenUnloaded", () => this.clearDrawProcessHook?.());
      return {
        base: tabsEl
      };
    }
    update() {
      super.update();
      autosetFontSize(this.body.base);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/shards/textShard.js
  var TextShard = class extends Shard {
    get defaultColor() {
      return "var(--tmd-text, black)";
    }
    generateBody() {
      const p = document.createElement("p");
      p.innerHTML = this.context.text ?? "";
      p.style.color = this.context.color ?? this.defaultColor;
      p.style.margin = "0";
      p.style.boxSizing = "border-box";
      if (this.context.height) p.style.overflow = "auto";
      if (this.context.withBackground) p.style.background = "var(--tmd-element,rgb(239, 239, 239))";
      if (this.context.withBorder) p.style.border = "2px solid var(--tmd-accent, rgb(236, 236, 236))";
      setFontFamily(p, MOD_DATA.fontFamily);
      return {
        base: p
      };
    }
    update() {
      super.update();
      if ((this.context.fontSize ?? "auto") === "auto") autosetFontSize(this.body.base);
      else if (typeof this.context.fontSize === "number") setFontSize(this.body.base, this.context.fontSize);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/assets/icons/exit.svg
  var exit_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" %0A     width="86" height="86" %0A     viewBox="0 0 86 86" %0A     fill="none">%0A  <g transform="translate(0.000000,86.000000) scale(0.100000,-0.100000)"%0A     fill="currentColor" stroke="none">%0A    <path d="M120 507 l0 -305 151 -81 c83 -45 160 -81 170 -81 18 0 19 12 19 281%0A            0 163 -4 288 -10 299 -11 20 -44 40 -212 129 l-118 62 0 -304z"/>%0A    <path d="M260 787 c31 -19 52 -23 180 -27 l145 -5 3 -72 3 -73 29 0 30 0 0 81%0A            c0 126 14 119 -223 119 l-202 0 35 -23z"/>%0A    <path d="M690 590 c0 -19 -7 -20 -90 -20 l-90 0 0 -60 0 -60 90 0 c83 0 90 -1%0A            90 -20 0 -11 3 -20 7 -20 14 0 93 84 93 99 0 16 -78 101 -92 101 -4 0 -8 -9%0A            -8 -20z"/>%0A    <path d="M590 336 l0 -76 -40 0 c-38 0 -40 -2 -40 -30 0 -29 1 -30 50 -30 77 0%0A            92 20 88 123 -3 81 -3 82 -30 85 l-28 3 0 -75z"/>%0A  </g>%0A</svg>';

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/ui.js
  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  function recolorSVG(svgElement, { fill, stroke }) {
    const elements = svgElement.querySelectorAll("*");
    elements.forEach((element) => {
      if (element.getAttribute("fill") !== "none") {
        element.setAttribute("fill", fill);
      }
      if (element.getAttribute("stroke") !== "none") {
        element.setAttribute("stroke", stroke);
      }
    });
    if (svgElement.getAttribute("fill") !== "none") {
      svgElement.setAttribute("fill", fill);
    }
    if (svgElement.getAttribute("stroke") !== "none") {
      svgElement.setAttribute("stroke", stroke);
    }
    return svgElement;
  }
  function dataUrlSvgWithColor(dataUrl, newColor) {
    if (newColor.fill?.startsWith("#")) newColor.fill = hexToRgb(newColor.fill);
    if (newColor.stroke?.startsWith("#")) newColor.stroke = hexToRgb(newColor.stroke);
    if (newColor.fill) dataUrl = dataUrl.replace(/fill="[^"]*"/g, `fill="${newColor.fill}"`);
    if (newColor.stroke) dataUrl = dataUrl.replace(/stroke="[^"]*"/g, `stroke="${newColor.stroke}"`);
    return dataUrl;
  }
  function cssVar(name, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return value || fallback;
  }
  function getRelativeHeight(height) {
    return height * (MainCanvas.canvas.clientHeight / 1e3);
  }
  function getRelativeWidth(width) {
    return width * (MainCanvas.canvas.clientWidth / 2e3);
  }
  function getRelativeY(yPos, anchorPosition = "top") {
    const scaleY = MainCanvas.canvas.clientHeight / 1e3;
    return anchorPosition === "top" ? MainCanvas.canvas.offsetTop + yPos * scaleY : window.innerHeight - (MainCanvas.canvas.offsetTop + MainCanvas.canvas.clientHeight) + yPos * scaleY;
  }
  function getRelativeX(xPos, anchorPosition = "left") {
    const scaleX = MainCanvas.canvas.clientWidth / 2e3;
    return anchorPosition === "left" ? MainCanvas.canvas.offsetLeft + xPos * scaleX : window.innerWidth - (MainCanvas.canvas.offsetLeft + MainCanvas.canvas.clientWidth) + xPos * scaleX;
  }
  function setPosition(element, xPos, yPos, anchor = "top-left") {
    const yAnchor = anchor === "top-left" || anchor === "top-right" ? "top" : "bottom";
    const xAnchor = anchor === "top-left" || anchor === "bottom-left" ? "left" : "right";
    const y = getRelativeY(yPos, yAnchor);
    const x = getRelativeX(xPos, xAnchor);
    Object.assign(element.style, {
      position: "fixed",
      [xAnchor]: x + "px",
      [yAnchor]: y + "px"
    });
  }
  function setSize(element, width, height) {
    Object.assign(element.style, {
      width: getRelativeWidth(width) + "px",
      height: getRelativeHeight(height) + "px"
    });
  }
  function setFontSize(element, targetFontSize) {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;
    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
    const fontSize = targetFontSize * scaleFactor;
    Object.assign(element.style, {
      fontSize: fontSize + "px"
    });
  }
  function setFontFamily(element, fontFamily) {
    element.style.fontFamily = fontFamily ?? "sans-serif";
  }
  function setPadding(element, targetPadding) {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;
    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
    const paddingValue = targetPadding * scaleFactor;
    Object.assign(element.style, {
      padding: paddingValue + "px"
    });
  }
  function autosetFontSize(element) {
    const Font = MainCanvas.canvas.clientWidth <= MainCanvas.canvas.clientHeight * 2 ? MainCanvas.canvas.clientWidth / 50 : MainCanvas.canvas.clientHeight / 25;
    Object.assign(element.style, {
      fontSize: Font + "px"
    });
  }
  function setSizeUnitVariable() {
    const canvasWidth = MainCanvas.canvas.clientWidth;
    const canvasHeight = MainCanvas.canvas.clientHeight;
    const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
    document.documentElement.style.setProperty("--size-unit", scaleFactor.toString());
  }
  var createdDynamicClasses = [];
  function generateDynamicClassCacheKey(styles) {
    const sortedStringify = (obj) => {
      if (!obj) return "null";
      return JSON.stringify(
        Object.keys(obj).sort().reduce((acc, key) => {
          acc[key] = obj[key];
          return acc;
        }, {})
      );
    };
    let cacheKey = "";
    for (const [key, value] of Object.entries(styles)) {
      if (value === void 0) continue;
      cacheKey += `${key}:=${sortedStringify(value)}|`;
    }
    return cacheKey;
  }
  function addDynamicClass(targetElement, styles) {
    const cacheKey = generateDynamicClassCacheKey(styles);
    const _class = createdDynamicClasses.find((g) => g.key === cacheKey);
    if (_class) return targetElement.classList.add(_class.className);
    let className;
    do {
      className = "dynamic-" + Math.random().toString(36).substring(2, 10);
    } while (createdDynamicClasses.find((g) => g.className === className));
    createdDynamicClasses.push({
      key: cacheKey,
      className
    });
    const buildCssBlock = (selector, styleRules) => {
      let css = `${selector} {`;
      for (const [property, value] of Object.entries(styleRules)) {
        css += `${property.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase()}: ${value};`;
      }
      css += "}";
      return css;
    };
    let cssRules = "";
    for (const [key, value] of Object.entries(styles)) {
      if (value === void 0) continue;
      if (key === "base") {
        cssRules += buildCssBlock(`.${className}`, value);
      } else if (["hover", "active", "focus", "disabled", "before", "after"].includes(key)) {
        cssRules += buildCssBlock(`.${className}:${key}`, value);
      } else {
        cssRules += buildCssBlock(`.${className}${key}`, value);
      }
    }
    let styleElement = document.getElementById(`${MOD_DATA.key ?? ""}-dynamic-classes`);
    if (styleElement) {
      styleElement.textContent += cssRules;
    } else {
      styleElement = document.createElement("style");
      styleElement.id = `${MOD_DATA.key ?? ""}-dynamic-classes`;
      styleElement.textContent = cssRules;
      document.head.appendChild(styleElement);
    }
    targetElement.classList.add(className);
  }
  function setPreviousSubscreen() {
    setSubscreen(previousSubscreen);
  }
  var previousSubscreen = null;
  var currentSubscreen = null;
  function setSubscreen(subscreen) {
    previousSubscreen = currentSubscreen;
    currentSubscreen = subscreen;
    if (previousSubscreen) {
      try {
        previousSubscreen.unload();
      } catch (e) {
        logger.error("Failed to unload subscreen", previousSubscreen, e);
      }
    }
    if (subscreen) {
      try {
        subscreen.load();
      } catch (e) {
        logger.error("Failed to load subscreen", subscreen, e);
      }
    }
  }
  function getCurrentSubscreen() {
    return currentSubscreen;
  }
  function getPreviousSubscreen() {
    return previousSubscreen;
  }
  var BaseSubscreen = class {
    setSubscreen = setSubscreen;
    setPreviousSubscreen = setPreviousSubscreen;
    get currentSubscreen() {
      return getCurrentSubscreen();
    }
    get previousSubscreen() {
      return getPreviousSubscreen();
    }
    /**
     * Called each frame.
     * 
     * You probably want to override {@link onRun}, **do not** override `run` if you don't understand what you're doing.
     */
    run() {
      this.onRun?.();
    }
    /**
     * Called once after `setSubscreen()`.
     * Responsible for how the subscreen will load.
     * 
     * You probably want to override {@link onLoad}, **do not** override `load` if you don't understand what you're doing.
     * 
     * Override {@link onLoad} for creating UI elements.
     */
    load() {
      setSizeUnitVariable();
      this.createExitButton();
      if (this.name) this.createSubscreenTitle();
      this.onLoad?.();
      eventBus?.emit("subscreenLoaded", {
        subscreen: this
      });
    }
    /**
     * Called once when subscreen is being unloaded.
     * 
     * You probably want to override {@link onUnload}, **do not** override `unload` if you don't understand what you're doing.
     */
    unload() {
      this.onUnload?.();
      eventBus?.emit("subscreenUnloaded", {
        subscreen: this
      });
    }
    /**
     * Called after user clicks.
     * 
     * You probably want to override {@link onClick}, **do not** override `click` if you don't understand what you're doing.
     */
    click() {
      this.onClick?.();
    }
    /**
     * Called after user presses `Esc` or clicks on exit button.
     * 
     * Not called after subscreen unloading with `setSubscreen()`
     * 
     * You probably want to override {@link onExit}, **do not** override `exit` if you don't understand what you're doing.
     */
    exit() {
      this.onExit?.();
      setPreviousSubscreen();
    }
    update() {
    }
    /**
     * Called after screen size change.
     * 
     * You probably want to override {@link onResize}, **do not** override `resize` if you don't understand what you're doing.
     */
    resize() {
      setSizeUnitVariable();
      this.onResize?.();
    }
    createExitButton() {
      this.createButton({
        x: 1815,
        y: 75,
        width: 90,
        height: 90,
        icon: dataUrlSvgWithColor(exit_default, { fill: cssVar("--tmd-text", "black") }),
        tooltip: {
          position: "left",
          text: "Back"
        },
        modules: {
          base: [
            new StyleModule({
              zIndex: "10"
            })
          ]
        },
        onClick: () => this.exit()
      });
    }
    createSubscreenTitle() {
      this.createText({
        text: this.name,
        x: 100,
        y: 60,
        fontSize: 8
      }).style.cssText += "max-width: 85%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0.1em;";
    }
    create(shard) {
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createButton(ctx) {
      const shard = new ButtonShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createText(ctx) {
      const shard = new TextShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createInput(ctx) {
      const shard = new InputShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createCheckbox(ctx) {
      const shard = new CheckboxShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createInputList(ctx) {
      const shard = new InputListShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createImage(ctx) {
      const shard = new ImageShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createSvg(ctx) {
      const shard = new SvgShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createBackNextButton(ctx) {
      const shard = new BackNextButtonShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createTabs(ctx) {
      const shard = new TabsShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    drawPolylineArrow({
      points,
      strokeColor = cssVar("--tmd-text", "black"),
      lineWidth = 2,
      circleRadius = 5,
      circleColor = cssVar("--tmd-text", "black")
    }) {
      if (points.length < 2) return;
      const ctx = MainCanvas.canvas.getContext("2d");
      if (!ctx) return;
      ctx.save();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctx.fillStyle = circleColor;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(points[0].x, points[0].y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(points[points.length - 1].x, points[points.length - 1].y, circleRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    createCard(ctx) {
      const shard = new CardShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createSelect(ctx) {
      const shard = new SelectShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createContainer(ctx) {
      const shard = new ContainerShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/shards/coreButtonShard.js
  var CoreButtonShard = class extends ButtonShard {
    get dynamicClassButton() {
      return {
        ...super.dynamicClassButton,
        base: {
          ...super.dynamicClassButton.base,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          columnGap: "1.25vw",
          border: "2px solid #33c633",
          outline: "none",
          cursor: "pointer",
          background: "#20a214",
          color: "#004800",
          borderRadius: "0.1em"
        },
        hover: {
          ...super.dynamicClassButton.hover,
          background: "#39bd2dff",
          color: "#76ff76ff",
          borderColor: "#76ff76ff"
        }
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/shards/coreTextShard.js
  var CoreTextShard = class extends TextShard {
    get defaultColor() {
      return "rgb(162, 255, 19)";
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/shards/coreSelectShard.js
  var CoreSelectShard = class extends SelectShard {
    get dynamicClassContainer() {
      return {
        ...super.dynamicClassContainer,
        base: {
          ...super.dynamicClassContainer.base,
          background: "#20a214",
          color: "rgb(162, 255, 19)",
          border: "2px solid #33c633"
        }
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/shards/coreCheckboxShard.js
  var CoreCheckboxShard = class extends CheckboxShard {
    get dynamicClassInput() {
      return {
        ...super.dynamicClassInput,
        base: {
          ...super.dynamicClassInput.base,
          border: "var(--border-width) solid #33c633 !important",
          backgroundColor: "#20a214 !important",
          color: "rgb(162, 255, 19) !important"
        },
        hover: {
          ...super.dynamicClassInput.hover,
          backgroundColor: "#39bd2dff !important",
          color: "#76ff76ff !important"
        },
        before: {
          ...super.dynamicClassInput.before,
          backgroundColor: "rgb(162, 255, 19) !important"
        },
        ".zcDisabled": {
          ...super.dynamicClassInput[".zcDisabled"],
          backgroundColor: "var(--disabled-color)"
        }
      };
    }
    get textColor() {
      return "rgb(162, 255, 19)";
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/shards/coreInputListShard.js
  var CoreInputListShard = class extends InputListShard {
    get dynamicClassContainer() {
      return {
        ...super.dynamicClassContainer,
        base: {
          ...super.dynamicClassContainer.base,
          background: "#20a214 !important",
          border: "2px solid #33c633"
        },
        "> div:first-child > b": {
          ...super.dynamicClassContainer["> div:first-child > b"],
          color: "rgb(155, 255, 0)"
        },
        "> div:last-child > div": {
          ...super.dynamicClassContainer["> div:last-child > div"],
          background: "rgb(112, 234, 68)",
          color: "black"
        }
      };
    }
    get dynamicClassToolsButton() {
      return {
        ...super.dynamicClassToolsButton,
        base: {
          ...super.dynamicClassToolsButton.base,
          background: "rgb(112, 234, 68)",
          color: "black"
        },
        hover: {
          background: "rgb(77, 221, 65)"
        }
      };
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/coreSubscreen.js
  var CoreSubscreen = class extends BaseSubscreen {
    g = 40;
    h = 0.05;
    interval = null;
    run() {
      DrawRect(0, 0, 2e3, 1e3, "#008600ff");
      for (let x = 0; x <= 2e3; x += this.g) {
        DrawRect(x, 0, 5, 1e3, "#17a117ff");
      }
      for (let y = 0; y <= 1e3; y += this.g) {
        DrawRect(0, y, 2e3, 5, "#17a117ff");
      }
    }
    load() {
      this.createText({
        x: 60,
        y: 40,
        text: this.name,
        fontSize: 6,
        modules: {
          base: [
            new StyleModule({
              fontWeight: "bold"
            })
          ]
        }
      });
      this.createButton({
        anchor: "top-right",
        x: 40,
        y: 40,
        width: 90,
        height: 90,
        icon: "Icons/Exit.png",
        onClick: () => this.exit()
      });
      this.g = 40;
      this.h = 0.05;
      this.interval = setInterval(() => {
        this.g += this.h;
        if (this.g >= 60) this.h = -0.05;
        if (this.g <= 40) this.h = 0.05;
      }, 50);
    }
    createText(ctx) {
      const shard = new CoreTextShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createButton(ctx) {
      const shard = new CoreButtonShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createCheckbox(ctx) {
      const shard = new CoreCheckboxShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createInputList(ctx) {
      const shard = new CoreInputListShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    createSelect(ctx) {
      const shard = new CoreSelectShard(ctx);
      const htmlElement = shard.mount();
      return htmlElement;
    }
    unload() {
      super.unload();
      if (this.interval) clearInterval(this.interval);
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/generalSubscreen.js
  var GeneralSubscreen = class extends CoreSubscreen {
    get name() {
      return "General";
    }
    load() {
      super.load();
      this.createCheckbox({
        x: 60,
        y: 200,
        text: "Dev Mode",
        isChecked: !!coreSettings.devMode,
        onChange: () => {
          coreSettings.devMode = false;
          delete PreferenceExtensionsSettings.ZOIS_CORE;
        }
      });
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/toasts.js
  function createToastsContainer() {
    const container = document.createElement("div");
    container.classList.add("zcToastsContainer");
    container.addEventListener("click", () => {
      const pos = window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left";
      for (const toast of container.children) {
        if (toast instanceof HTMLElement) {
          toast.style.animation = `${pos.includes("left") ? "zcSlideOutToLeft" : "zcSlideOutToRight"} 0.3s ease-out forwards`;
        }
      }
      setTimeout(() => container.innerHTML = "", 300);
    });
    const update = () => {
      container.style.cssText = `font-family: ${CommonGetFontName()};`;
      setPosition(container, 5, 5, window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left");
    };
    window.addEventListener("resize", update);
    document.body.append(container);
    update();
    eventBus?.on("zois-core:coreSettingsChanged", update);
    return container;
  }
  function getToastIcon(type2, theme) {
    let icon;
    switch (type2) {
      case "info":
        icon = createElement(Info);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(68, 70, 202)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(148, 178, 217)";
        break;
      case "warning":
        icon = createElement(CircleAlert);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(198, 146, 25)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(244, 220, 147)";
        break;
      case "error":
        icon = createElement(CircleX);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(174, 1, 1)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(255, 163, 163)";
        break;
      case "success":
        icon = createElement(CircleCheck);
        icon.style.fill = theme ? theme.iconFillColor : "rgb(49, 142, 68)";
        icon.style.stroke = theme ? theme.iconStrokeColor : "rgb(122, 213, 162)";
        break;
      case "spinner":
        icon = document.createElement("div");
        icon.style.cssText = `
                box-sizing: border-box;
                border: 2px solid;
                border-radius: 100%;
                border-color: transparent ${theme ? theme.iconFillColor : "rgb(68, 70, 202)"};
                animation: zcSpin 0.65s linear infinite;
            `;
        break;
    }
    icon.style.cssText += `flex-shink: 0; width: 1.65em; height: 1.65em;`;
    return icon;
  }
  function createToast({ title, message, type: type2, duration, theme, id }) {
    const pos = window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left";
    const backgroundColor = theme ? theme.backgroundColor : type2 === "success" ? "rgb(122, 213, 162)" : type2 === "warning" ? "rgb(244, 220, 147)" : type2 === "error" ? "rgb(255, 163, 163)" : "rgb(148, 178, 217)";
    const textColor = theme ? theme.titleColor : type2 === "info" || type2 === "spinner" ? "rgb(0, 2, 125)" : type2 === "success" ? "#244428" : type2 === "error" ? "rgb(128, 22, 22)" : "rgb(100, 74, 16)";
    const progressBarColor = theme ? theme.progressBarColor : "#00000014";
    const toastContainer = document.querySelector(".zcToastsContainer") ?? createToastsContainer();
    const toast = document.createElement("div");
    toast.classList.add("zcToast");
    toast.setAttribute("data-zc-toast-type", type2);
    toast.setAttribute("data-zc-toast-id", id);
    const update = () => {
      const canvasWidth = MainCanvas.canvas.clientWidth;
      const canvasHeight = MainCanvas.canvas.clientHeight;
      const scaleFactor = Math.min(canvasWidth, canvasHeight) / 100;
      toast.style.cssText = `width: 100%; font-size: ${2.85 * scaleFactor}px; padding: ${1 * scaleFactor}px; background: ${backgroundColor}; border: 1px solid #555;`;
      toast.style.animation = `${pos.includes("left") ? "zcSlideInFromLeft" : "zcSlideInFromRight"} 0.3s ease-out forwards`;
    };
    if (type2 !== "spinner") {
      const progressBar = document.createElement("div");
      progressBar.classList.add("zcToast-ProgressBar");
      progressBar.style.cssText = `animation: zcToast-progress ${duration}ms linear 0s 1 alternate none; position: absolute; top: 0; left: 0; height: 100%; border-radius: 4px; background: ${progressBarColor};`;
      toast.append(progressBar);
    }
    const textContainer = document.createElement("div");
    if (title) {
      const _title = document.createElement("p");
      _title.style.color = textColor;
      _title.style.fontWeight = "bold";
      _title.style.fontSize = "0.9em";
      _title.textContent = title;
      textContainer.append(_title);
    }
    const _message = document.createElement("p");
    _message.style.color = textColor;
    _message.style.fontSize = !!title ? "0.7em" : "0.9em";
    _message.style.overflowWrap = "anywhere";
    if (!title) {
      _message.style.fontWeight = "bold";
    } else {
      _message.style.marginTop = "0.15em";
    }
    _message.textContent = message;
    textContainer.append(_message);
    toast.append(getToastIcon(type2, theme), textContainer);
    window.addEventListener("resize", update);
    toastContainer.append(toast);
    update();
    void toast.offsetHeight;
    setTimeout(() => {
      toast.style.animation = `${pos.includes("left") ? "zcSlideOutToLeft" : "zcSlideOutToRight"} 0.3s ease-out forwards`;
    }, duration);
    setTimeout(() => toast.remove(), duration + 300);
  }
  var ToastsManager = class {
    generateToastId() {
      return crypto.randomUUID();
    }
    process({ title, message, duration, type: type2, id, theme }) {
      const coreSettings2 = window.ZOIS_CORE.getSettings();
      if (coreSettings2.toasts?.blacklist?.enabled && coreSettings2.toasts.blacklist.content?.length !== 0) {
        if (coreSettings2.toasts.blacklist.content?.some((v) => {
          const regexp = new RegExp(v);
          return regexp.test(title ?? "") || regexp.test(message);
        })) {
          logger.log("Toast message blocked due to blacklist settings");
          return;
        }
      }
      if (coreSettings2.toasts?.preventUsingSingleTheme) {
        createToast({
          id,
          title,
          message,
          duration,
          type: type2
        });
      } else {
        createToast({
          id,
          title,
          message,
          duration,
          type: type2,
          theme
        });
      }
    }
    /**
    * Displays informational toast.
    * @param options - Title, message and duration of toast.
    */
    info({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "info", id, theme });
    }
    /**
    * Displays success toast.
    * @param options - Title, message and duration of toast.
    */
    success({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "success", id, theme });
    }
    /**
    * Displays warning toast.
    * @param options - Title, message and duration of toast.
    */
    warn({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "warning", id, theme });
    }
    /**
    * Displays error toast.
    * @param options - Title, message and duration of toast.
    */
    error({ title, message, duration }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration, type: "error", id, theme });
    }
    /**
    * Displays a long-running spinner toast and returns its ID.
    * Toast can be deleted manually with `toastsManager.removeSpinner(ID)` or by the user by clicking.
    * @param options - Title and message of toast.
    * @returns The unique ID of the created spinner toast.
    */
    spinner({ title, message }) {
      const id = this.generateToastId();
      const theme = MOD_DATA.singleToastsTheme;
      this.process({ title, message, duration: 1e6, type: "spinner", id, theme });
      return id;
    }
    /**
    * Removes a spinner toast by its ID.
    * @param id - Unique ID of the spinner toast to remove.
    */
    removeSpinner(id) {
      const toast = document.querySelector(`div[data-zc-toast-id="${id}"]`);
      if (!toast) return;
      const pos = window.ZOIS_CORE.getSettings().toasts?.position ?? "bottom-left";
      toast.style.animation = `${pos.includes("left") ? "zcSlideOutToLeft" : "zcSlideOutToRight"} 0.3s ease-out forwards`;
      setTimeout(() => toast.remove(), 300);
    }
  };
  var toastsManager = new ToastsManager();

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/toastsSubscreen.js
  var ToastsSubscreen = class extends CoreSubscreen {
    get name() {
      return "Toasts";
    }
    load() {
      super.load();
      this.createCheckbox({
        x: 60,
        y: 200,
        text: "Blacklist Enabled",
        isChecked: !!coreSettings.toasts?.blacklist?.enabled,
        onChange: () => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.blacklist ??= {};
          coreSettings.toasts.blacklist.enabled = !coreSettings.toasts.blacklist.enabled;
        }
      });
      this.createCheckbox({
        x: 60,
        y: 280,
        text: "Prevent Using Single Theme",
        isChecked: !!coreSettings.toasts?.preventUsingSingleTheme,
        onChange: () => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.preventUsingSingleTheme = !coreSettings.toasts.preventUsingSingleTheme;
        }
      });
      this.createText({
        text: "Toasts Position:",
        x: 60,
        y: 380
      });
      this.createSelect({
        x: 400,
        y: 360,
        width: 500,
        options: [
          {
            name: "top-left",
            text: "Top Left"
          },
          {
            name: "top-right",
            text: "Top Right"
          },
          {
            name: "bottom-left",
            text: "Bottom Left"
          },
          {
            name: "bottom-right",
            text: "Bottom Right"
          }
        ],
        currentOption: coreSettings.toasts?.position ?? "bottom-left",
        onChange: (pos) => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.position = pos;
        }
      });
      this.createInputList({
        title: "Blacklist",
        x: 1100,
        y: 200,
        width: 800,
        height: 600,
        value: coreSettings.toasts?.blacklist?.content ?? [],
        onChange: (value) => {
          coreSettings.toasts ??= {};
          coreSettings.toasts.blacklist ??= {};
          coreSettings.toasts.blacklist.content = value;
        }
      });
      this.createButton({
        text: "Test",
        x: 60,
        y: 850,
        padding: 1,
        width: 400,
        onClick: () => {
          syncSettings();
          toastsManager.success({
            title: "Something was completed successfully",
            message: "Message details",
            duration: 8e3
          });
          toastsManager.info({
            title: "Very important announcement",
            message: "You have been informed that you have been informed",
            duration: 8e3
          });
          toastsManager.warn({
            title: "Don't look at me like that",
            message: "You were warned",
            duration: 8e3
          });
          toastsManager.error({
            title: "Critical bug found",
            message: "Catch him!",
            duration: 8e3
          });
        }
      });
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/developmentSubscreen.js
  var DevelopmentSubscreen = class extends CoreSubscreen {
    get name() {
      return "Development";
    }
    load() {
      super.load();
      this.createCheckbox({
        x: 60,
        y: 200,
        text: "Auto Connect To Dev Server",
        isChecked: localStorage.getItem("autoConnectToDevServer") === "true",
        onChange: () => {
          const prev = localStorage.getItem("autoConnectToDevServer");
          localStorage.setItem("autoConnectToDevServer", prev === "true" ? "false" : "true");
        }
      });
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core-subscreen/mainSubscreen.js
  var MainSubscreen = class extends CoreSubscreen {
    get name() {
      return "Zoi's Modding Core";
    }
    load() {
      super.load();
      this.createText({
        x: 60,
        y: 120,
        text: "Here are all the experimental settings and settings for developing and debugging my mods."
      });
      [new GeneralSubscreen(), new ToastsSubscreen(), new DevelopmentSubscreen()].forEach((s, i) => {
        this.createButton({
          x: 100,
          y: 240 + 115 * i,
          padding: 2,
          text: s.name,
          width: 600,
          fontSize: 5,
          onClick: () => {
            this.setSubscreen(s);
          }
        });
      });
      this.createButton({
        anchor: "bottom-right",
        x: 40,
        y: 40,
        width: 90,
        height: 90,
        icon: createElement(BookText),
        onClick: () => {
          window.open(`https://github.com/FurryZoi/zois-core`, "_blank");
        }
      });
      this.createText({
        text: "This place is in WIP stage",
        x: 1e3,
        y: 500,
        fontSize: 6
      });
    }
    exit() {
      super.exit();
      this.setSubscreen(null);
      PreferenceSubscreenExtensionsClear();
      syncSettings();
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/dialogs.js
  function createDialog(dialog) {
    return new Promise((resolve, reject) => {
      let inputOrSelectElement = null;
      const clear = () => {
        _dialog.remove();
        background.remove();
        document.removeEventListener("keydown", handleKeyDown, { capture: true });
      };
      const submit = () => {
        clear();
        if (dialog.type === "prompt") {
          resolve(inputOrSelectElement.value);
        }
        if (dialog.type === "confirm") {
          resolve(true);
        }
        if (dialog.type === "pick") {
          resolve(inputOrSelectElement.value);
        }
      };
      const cancel = () => {
        clear();
        resolve(false);
      };
      const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
        }
        if (e.key === "Enter") submit();
        if (e.key === "Escape") cancel();
      };
      document.addEventListener("keydown", handleKeyDown, { capture: true });
      const background = document.createElement("div");
      background.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 20; opacity: 0.5; background: black;";
      const _dialog = document.createElement("div");
      _dialog.classList.add("zcDialog");
      _dialog.setAttribute("data-zc-dialog-type", dialog.type);
      _dialog.style.fontFamily = CommonGetFontName();
      const message = document.createElement("p");
      message.textContent = dialog.message;
      _dialog.append(message);
      switch (dialog.type) {
        case "confirm": {
          break;
        }
        case "prompt": {
          const input = document.createElement("input");
          input.style.cssText = "color: white; margin-top: 1px; width: 90%; background: rgb(82, 89, 104); border: none; border-radius: 4px; padding: 0.45em;";
          inputOrSelectElement = input;
          _dialog.append(input);
          break;
        }
        case "pick": {
          const select = document.createElement("select");
          select.style.cssText = "cursor: pointer; width: 90%; background: rgb(82, 89, 104); border: none; padding: 0.4em; color: white; border-radius: 4px;";
          dialog.options.forEach((o) => {
            const option = document.createElement("option");
            option.setAttribute("key", o.name);
            option.text = o.name;
            select.append(option);
          });
          inputOrSelectElement = select;
          _dialog.append(select);
          break;
        }
      }
      const buttons = document.createElement("div");
      buttons.style.cssText = "display: flex; justify-content: end; column-gap: 0.75em; width: 90%; padding: 0.9em 0;";
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.addEventListener("click", cancel);
      const submitBtn = document.createElement("button");
      submitBtn.textContent = "Ok";
      submitBtn.addEventListener("click", submit);
      buttons.append(cancelBtn, submitBtn);
      _dialog.append(buttons);
      document.body.append(_dialog, background);
      if (inputOrSelectElement) inputOrSelectElement.focus();
    });
  }
  var DialogsManager = class {
    process(dialogProps) {
      return createDialog(dialogProps);
    }
    prompt({ message }) {
      return this.process({
        type: "prompt",
        message
      });
    }
    confirm({ message }) {
      return this.process({
        type: "confirm",
        message
      });
    }
    pick({ message, options }) {
      return this.process({
        type: "pick",
        message,
        options
      });
    }
  };
  var dialogsManager = new DialogsManager();

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/core.js
  var coreSettings = {};
  var coreEventBus = null;
  function syncSettings() {
    if (typeof coreSettings !== "object") return;
    Player.ExtensionSettings.ZOIS_CORE = LZString.compressToBase64(JSON.stringify(coreSettings));
    ServerPlayerExtensionSettingsSync("ZOIS_CORE");
    coreEventBus?.emit("coreSettingsChanged", {
      settings: structuredClone(coreSettings)
    });
  }
  function registerSubscreen() {
    PreferenceRegisterExtensionSetting({
      Identifier: "ZOIS_CORE",
      Image: () => {
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(createElement(Terminal));
        return "data:image/svg+xml," + svgString;
      },
      ButtonText: () => "Zoi's Modding Core",
      load: () => {
        setSubscreen(new MainSubscreen());
      },
      run: () => {
        getCurrentSubscreen()?.run();
      },
      resize: () => {
        getCurrentSubscreen()?.resize();
      },
      click: () => {
        getCurrentSubscreen()?.click();
      },
      exit: () => {
        getCurrentSubscreen()?.exit();
      }
    });
  }
  var loginScreenElements = [];
  function registerCore() {
    const style = document.createElement("style");
    style.innerHTML = styles_default;
    document.head.append(style);
    coreEventBus = getEventBus("zois-core");
    window.ZOIS_CORE = Object.freeze({
      version,
      enableDevMode: () => {
        if (typeof Player?.MemberNumber !== "number") return;
        coreSettings.devMode = true;
        syncSettings();
        registerSubscreen();
      },
      getSettings: () => {
        return JSON.parse(JSON.stringify(coreSettings));
      },
      getEventBus
    });
    if (localStorage.getItem("autoConnectToDevServer") === "true") {
      hookFunction("CommonGetServer", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        return "https://bondage-club-server-test.herokuapp.com/";
      });
      const containerShard = new ContainerShard({
        x: 1250,
        y: 900,
        modules: {
          base: [
            new StyleModule({
              display: "flex"
            })
          ]
        }
      });
      const container = containerShard.mount();
      new ButtonShard({
        padding: 1,
        parent: container,
        text: "You connected to dev server"
      }).mount();
      new ButtonShard({
        width: 90,
        height: 90,
        padding: 1,
        icon: "Icons/Cancel.png",
        parent: container,
        onClick: () => {
          localStorage.removeItem("autoConnectToDevServer");
          location.reload();
        }
      }).mount();
      loginScreenElements.push(container);
      hookFunction("LoginUnload", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
        loginScreenElements.forEach((e) => e.remove());
        return next(args);
      });
      ServerURL = CommonGetServer();
      ServerInit();
    }
    hookFunction("ChatRoomMessageCreateReplyMessageElement", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      const [msgId, displayMessage, data] = args;
      const r = formatString(displayMessage);
      if (!r.isBeatifulString) return next(args);
      if (!msgId) {
        return [displayMessage];
      }
      const metadata = ChatRoomGetMetadataElem(data.time, data.sender);
      metadata.setAttribute("aria-hidden", "true");
      return [
        ElementCreate({
          tag: "span",
          classList: ["chat-room-message-content"],
          attributes: { "msgid": msgId },
          innerHTML: r.html
        }),
        ElementMenu.Create(
          ElementGenerateID(),
          [
            metadata,
            ElementButton.Create(
              null,
              () => ChatRoomMessageSetReply(msgId),
              { noStyling: true, tooltip: "Reply" },
              { button: { attributes: { name: "reply" } } }
            )
          ],
          { direction: "rtl", role: "menu" },
          { menu: { classList: ["chat-room-message-popup"], attributes: { "aria-direction": "horizontal" } } }
        )
      ];
    });
    document.addEventListener("click", async (event) => {
      const link = event.target.closest("a");
      if (link && link.href) {
        try {
          const url = new URL(link.href);
          if (url.protocol === "zc:") {
            event.preventDefault();
            if (link.href.startsWith("zc://open")) {
              const target = url.pathname.split("/").filter(Boolean)[1];
              if (target === void 0) return;
              switch (target) {
                case "Admin": {
                  if (await dialogsManager.confirm({ message: "This deep link wants to redirect you to Admin subscreen. Confirm the redirecting." })) {
                    ChatRoomOpenAdminScreen();
                  }
                  break;
                }
                case "Wardrobe": {
                  if (await dialogsManager.confirm({ message: "This deep link wants to redirect you to Wardrobe subscreen. Confirm the redirecting." })) {
                    ChatRoomOpenWardrobeScreen();
                  }
                  break;
                }
                case "Information": {
                  if (await dialogsManager.confirm({ message: "This deep link wants to redirect you to Information subscreen. Confirm the redirecting." })) {
                    ChatRoomOpenInformationScreen();
                  }
                  break;
                }
                default: {
                  coreEventBus?.emit("setSubscreen", {
                    target,
                    isTrusted: false
                  });
                }
              }
            }
          }
        } catch (e) {
        }
      }
    }, true);
    waitFor(() => typeof Player?.MemberNumber === "number").then(() => {
      if (typeof Player.ExtensionSettings.ZOIS_CORE === "string") {
        coreSettings = JSON.parse(LZString.decompressFromBase64(Player.ExtensionSettings.ZOIS_CORE) ?? "{}");
      }
      if (coreSettings.devMode) registerSubscreen();
    });
  }

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/localization.js
  var translations = {};
  function getText(tag, replacements) {
    if (MOD_DATA.localization === void 0) {
      logger.warn("Attempt to call getText() without configuring localization");
      return tag;
    }
    const defaultLocale = MOD_DATA.localization.locales.default;
    const preferredLocale = TranslationLanguage.toLowerCase();
    const value = getNestedValue(translations[preferredLocale], tag) ?? getNestedValue(translations[defaultLocale], tag);
    if (!value) {
      logger.warn("Unknown translation tag:", tag);
      return tag;
    }
    ;
    return replacements ? processReplacements(value, replacements) : value;
  }
  function getNestedValue(obj, path) {
    if (!obj || !path) return void 0;
    return path.split(".").reduce((current, key) => {
      if (current && typeof current === "object" && key in current) {
        return current[key];
      }
      return void 0;
    }, obj);
  }
  function processReplacements(text, replacements) {
    for (const [key, value] of Object.entries(replacements)) {
      text = text.replaceAll("$" + key, value.toString());
    }
    return text;
  }
  async function loadLocalization() {
    if (MOD_DATA.localization === void 0) {
      logger.log("Skip localization procedure because its not configured");
      return;
    }
    const supportedLocales = MOD_DATA.localization.locales.supported;
    const defaultLocale = MOD_DATA.localization.locales.default;
    const preferredLocale = TranslationLanguage.toLowerCase();
    if (!supportedLocales.includes(defaultLocale)) {
      logger.warn(`Default locale ${defaultLocale} isn't supported, fix configuration`);
      return;
    }
    hookFunction("TranslationSwitchLanguage", HookPriority.OBSERVE, (args, next) => {
      const value = next(args);
      if (supportedLocales.includes(TranslationLanguage.toLowerCase()) && !(TranslationLanguage.toLowerCase() in translations)) {
        fetchTranslationsForLocale(TranslationLanguage.toLowerCase());
      }
      return value;
    });
    await fetchTranslationsForLocale(defaultLocale);
    if (preferredLocale !== defaultLocale && supportedLocales.includes(preferredLocale)) {
      await fetchTranslationsForLocale(preferredLocale);
    }
  }
  async function fetchTranslationsForLocale(locale) {
    const response = await fetch(MOD_DATA.localization.translationsFolderPath + "/" + locale + ".json?=" + Date.now());
    if (!response.ok) return logger.error(`Failed to fetch ${locale} translations at ${response.url}` + locale);
    const data = await response.json();
    logger.log(`Fetched translations for locale: ${locale}`, data);
    translations[locale] = data;
  }

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/package.json
  var version = "2.2.1";

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/index.js
  var MOD_DATA;
  function bootstrap(modData) {
    MOD_DATA = modData;
    createModSdk();
    if (!window.ZOIS_CORE) registerCore();
    createEventBus();
    loadLocalization();
    hookFunction("GameKeyDown", HookPriority.ADD_BEHAVIOR, (args, next) => {
      const currentSubscreen2 = getCurrentSubscreen();
      if (CommonKey.IsPressed(args[0], "Escape") && !!currentSubscreen2) {
        currentSubscreen2.exit();
        return false;
      }
      const zcDialog = document.querySelector(".zcDialog");
      if (zcDialog instanceof HTMLDivElement) {
        zcDialog.focus();
        return false;
      }
      return next(args);
    });
    eventBus?.on("setSubscreen", async (data) => {
      const target = data.target;
      const isTrusted = data.isTrusted;
      if (target === void 0) return;
      if (target.startsWith(MOD_DATA.key + ":")) {
        const currentSubscreen2 = getCurrentSubscreen();
        const mod = target.substring(0, MOD_DATA.key.length);
        const subscreen = target.substring(MOD_DATA.key.length + 1);
        if (currentSubscreen2?.constructor?.name === subscreen) return;
        const s = MOD_DATA.subscreens?.[subscreen];
        if (s === void 0) return;
        if (isTrusted || await dialogsManager.confirm({ message: `Confirm the redirecting to modded subscreen ${target}` })) {
          await PreferenceOpenSubscreen("Extensions");
          await PreferenceSubscreenExtensionsOpen(mod, ["Online", "ChatRoom"]);
          setSubscreen(new s());
        }
      }
    });
    ServerIsLoggedInAsync().then(() => {
      if (modData.onReady) setTimeout(modData.onReady, getRandomNumber(3e3, 6e3));
    });
  }
  function formatString(text) {
    if (!text || typeof text !== "string") {
      return { isBeatifulString: false };
    }
    let result = text;
    let hasChanges = false;
    const markdownRegex = /\[([^\]]+?)\]\(([^)]+?)\)/g;
    const newResult = result.replace(markdownRegex, (match, linkText, url) => {
      hasChanges = true;
      const escapedText = linkText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${escapedText}</a>`;
    });
    if (newResult !== result) {
      result = newResult;
    }
    const zcRegex = /(?<!\S)zc:\/\/open[^\s<>"']*(?!\S)/gi;
    result = result.replace(zcRegex, (match) => {
      hasChanges = true;
      return `<a href="${match}" target="_blank" rel="noopener noreferrer">${match}</a>`;
    });
    if (hasChanges) {
      return {
        html: result,
        isBeatifulString: true
      };
    }
    return { isBeatifulString: false };
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function waitFor(func, cancelFunc = () => false) {
    while (!func()) {
      if (cancelFunc()) {
        return false;
      }
      await sleep(10);
    }
    return true;
  }
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function isVersionNewer(version1, version22) {
    const v1Parts = version1.split(".");
    const v2Parts = version22.split(".");
    for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      const v1Part = parseInt(v1Parts[i] || "0", 10);
      const v2Part = parseInt(v2Parts[i] || "0", 10);
      if (v1Part > v2Part) {
        return true;
      } else if (v1Part < v2Part) {
        return false;
      }
    }
    return false;
  }
  function getPlayer(value) {
    if (!value) return null;
    return ChatRoomCharacter.find((Character) => {
      return Character.MemberNumber == value || Character.Name.toLowerCase() === value || Character.Nickname?.toLowerCase() === value;
    }) ?? null;
  }
  function getNickname(target) {
    return CharacterNickname(target);
  }
  function normalizeObject(obj) {
    if (!CommonIsObject(obj)) return obj;
    if (Array.isArray(obj)) {
      return obj.map(normalizeObject).sort();
    }
    return Object.keys(obj).sort().reduce((acc, key) => {
      acc[key] = normalizeObject(obj[key]);
      return acc;
    }, {});
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/enums/transformation-type.enum.js
  var TransformationType;
  (function(TransformationType2) {
    TransformationType2[TransformationType2["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
    TransformationType2[TransformationType2["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
    TransformationType2[TransformationType2["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
  })(TransformationType || (TransformationType = {}));

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/MetadataStorage.js
  var MetadataStorage = (
    /** @class */
    (function() {
      function MetadataStorage3() {
        this._typeMetadatas = /* @__PURE__ */ new Map();
        this._transformMetadatas = /* @__PURE__ */ new Map();
        this._exposeMetadatas = /* @__PURE__ */ new Map();
        this._excludeMetadatas = /* @__PURE__ */ new Map();
        this._ancestorsMap = /* @__PURE__ */ new Map();
      }
      MetadataStorage3.prototype.addTypeMetadata = function(metadata) {
        if (!this._typeMetadatas.has(metadata.target)) {
          this._typeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      };
      MetadataStorage3.prototype.addTransformMetadata = function(metadata) {
        if (!this._transformMetadatas.has(metadata.target)) {
          this._transformMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
          this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
        }
        this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
      };
      MetadataStorage3.prototype.addExposeMetadata = function(metadata) {
        if (!this._exposeMetadatas.has(metadata.target)) {
          this._exposeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      };
      MetadataStorage3.prototype.addExcludeMetadata = function(metadata) {
        if (!this._excludeMetadatas.has(metadata.target)) {
          this._excludeMetadatas.set(metadata.target, /* @__PURE__ */ new Map());
        }
        this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
      };
      MetadataStorage3.prototype.findTransformMetadatas = function(target, propertyName, transformationType) {
        return this.findMetadatas(this._transformMetadatas, target, propertyName).filter(function(metadata) {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        });
      };
      MetadataStorage3.prototype.findExcludeMetadata = function(target, propertyName) {
        return this.findMetadata(this._excludeMetadatas, target, propertyName);
      };
      MetadataStorage3.prototype.findExposeMetadata = function(target, propertyName) {
        return this.findMetadata(this._exposeMetadatas, target, propertyName);
      };
      MetadataStorage3.prototype.findExposeMetadataByCustomName = function(target, name) {
        return this.getExposedMetadatas(target).find(function(metadata) {
          return metadata.options && metadata.options.name === name;
        });
      };
      MetadataStorage3.prototype.findTypeMetadata = function(target, propertyName) {
        return this.findMetadata(this._typeMetadatas, target, propertyName);
      };
      MetadataStorage3.prototype.getStrategy = function(target) {
        var excludeMap = this._excludeMetadatas.get(target);
        var exclude = excludeMap && excludeMap.get(void 0);
        var exposeMap = this._exposeMetadatas.get(target);
        var expose = exposeMap && exposeMap.get(void 0);
        if (exclude && expose || !exclude && !expose)
          return "none";
        return exclude ? "excludeAll" : "exposeAll";
      };
      MetadataStorage3.prototype.getExposedMetadatas = function(target) {
        return this.getMetadata(this._exposeMetadatas, target);
      };
      MetadataStorage3.prototype.getExcludedMetadatas = function(target) {
        return this.getMetadata(this._excludeMetadatas, target);
      };
      MetadataStorage3.prototype.getExposedProperties = function(target, transformationType) {
        return this.getExposedMetadatas(target).filter(function(metadata) {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map(function(metadata) {
          return metadata.propertyName;
        });
      };
      MetadataStorage3.prototype.getExcludedProperties = function(target, transformationType) {
        return this.getExcludedMetadatas(target).filter(function(metadata) {
          if (!metadata.options)
            return true;
          if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
            return true;
          if (metadata.options.toClassOnly === true) {
            return transformationType === TransformationType.CLASS_TO_CLASS || transformationType === TransformationType.PLAIN_TO_CLASS;
          }
          if (metadata.options.toPlainOnly === true) {
            return transformationType === TransformationType.CLASS_TO_PLAIN;
          }
          return true;
        }).map(function(metadata) {
          return metadata.propertyName;
        });
      };
      MetadataStorage3.prototype.clear = function() {
        this._typeMetadatas.clear();
        this._exposeMetadatas.clear();
        this._excludeMetadatas.clear();
        this._ancestorsMap.clear();
      };
      MetadataStorage3.prototype.getMetadata = function(metadatas, target) {
        var metadataFromTargetMap = metadatas.get(target);
        var metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function(meta) {
            return meta.propertyName !== void 0;
          });
        }
        var metadataFromAncestors = [];
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
          var ancestor = _a[_i];
          var ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function(meta) {
              return meta.propertyName !== void 0;
            });
            metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
          }
        }
        return metadataFromAncestors.concat(metadataFromTarget || []);
      };
      MetadataStorage3.prototype.findMetadata = function(metadatas, target, propertyName) {
        var metadataFromTargetMap = metadatas.get(target);
        if (metadataFromTargetMap) {
          var metadataFromTarget = metadataFromTargetMap.get(propertyName);
          if (metadataFromTarget) {
            return metadataFromTarget;
          }
        }
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
          var ancestor = _a[_i];
          var ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            var ancestorResult = ancestorMetadataMap.get(propertyName);
            if (ancestorResult) {
              return ancestorResult;
            }
          }
        }
        return void 0;
      };
      MetadataStorage3.prototype.findMetadatas = function(metadatas, target, propertyName) {
        var metadataFromTargetMap = metadatas.get(target);
        var metadataFromTarget;
        if (metadataFromTargetMap) {
          metadataFromTarget = metadataFromTargetMap.get(propertyName);
        }
        var metadataFromAncestorsTarget = [];
        for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
          var ancestor = _a[_i];
          var ancestorMetadataMap = metadatas.get(ancestor);
          if (ancestorMetadataMap) {
            if (ancestorMetadataMap.has(propertyName)) {
              metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
            }
          }
        }
        return metadataFromAncestorsTarget.slice().reverse().concat((metadataFromTarget || []).slice().reverse());
      };
      MetadataStorage3.prototype.getAncestors = function(target) {
        if (!target)
          return [];
        if (!this._ancestorsMap.has(target)) {
          var ancestors = [];
          for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
            ancestors.push(baseClass);
          }
          this._ancestorsMap.set(target, ancestors);
        }
        return this._ancestorsMap.get(target);
      };
      return MetadataStorage3;
    })()
  );

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/storage.js
  var defaultMetadataStorage = new MetadataStorage();

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/utils/get-global.util.js
  function getGlobal() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof self !== "undefined") {
      return self;
    }
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/utils/is-promise.util.js
  function isPromise(p) {
    return p !== null && typeof p === "object" && typeof p.then === "function";
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/TransformOperationExecutor.js
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  function instantiateArrayType(arrayType) {
    var array = new arrayType();
    if (!(array instanceof Set) && !("push" in array)) {
      return [];
    }
    return array;
  }
  var TransformOperationExecutor = (
    /** @class */
    (function() {
      function TransformOperationExecutor2(transformationType, options) {
        this.transformationType = transformationType;
        this.options = options;
        this.recursionStack = /* @__PURE__ */ new Set();
      }
      TransformOperationExecutor2.prototype.transform = function(source, value, targetType, arrayType, isMap2, level) {
        var _this = this;
        if (level === void 0) {
          level = 0;
        }
        if (Array.isArray(value) || value instanceof Set) {
          var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
          value.forEach(function(subValue, index) {
            var subSource = source ? source[index] : void 0;
            if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
              var realTargetType = void 0;
              if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
                if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                  realTargetType = targetType.options.discriminator.subTypes.find(function(subType) {
                    return subType.name === subValue[targetType.options.discriminator.property];
                  });
                  var options = { newObject: newValue_1, object: subValue, property: void 0 };
                  var newType = targetType.typeFunction(options);
                  realTargetType === void 0 ? realTargetType = newType : realTargetType = realTargetType.value;
                  if (!targetType.options.keepDiscriminatorProperty)
                    delete subValue[targetType.options.discriminator.property];
                }
                if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                  realTargetType = subValue.constructor;
                }
                if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                  subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function(subType) {
                    return subType.value === subValue.constructor;
                  }).name;
                }
              } else {
                realTargetType = targetType;
              }
              var value_1 = _this.transform(subSource, subValue, realTargetType, void 0, subValue instanceof Map, level + 1);
              if (newValue_1 instanceof Set) {
                newValue_1.add(value_1);
              } else {
                newValue_1.push(value_1);
              }
            } else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
              if (newValue_1 instanceof Set) {
                newValue_1.add(subValue);
              } else {
                newValue_1.push(subValue);
              }
            }
          });
          return newValue_1;
        } else if (targetType === String && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return String(value);
        } else if (targetType === Number && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return Number(value);
        } else if (targetType === Boolean && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return Boolean(value);
        } else if ((targetType === Date || value instanceof Date) && !isMap2) {
          if (value instanceof Date) {
            return new Date(value.valueOf());
          }
          if (value === null || value === void 0)
            return value;
          return new Date(value);
        } else if (!!getGlobal().Buffer && (targetType === Buffer || value instanceof Buffer) && !isMap2) {
          if (value === null || value === void 0)
            return value;
          return Buffer.from(value);
        } else if (isPromise(value) && !isMap2) {
          return new Promise(function(resolve, reject) {
            value.then(function(data) {
              return resolve(_this.transform(void 0, data, targetType, void 0, void 0, level + 1));
            }, reject);
          });
        } else if (!isMap2 && value !== null && typeof value === "object" && typeof value.then === "function") {
          return value;
        } else if (typeof value === "object" && value !== null) {
          if (!targetType && value.constructor !== Object)
            if (!Array.isArray(value) && value.constructor === Array) {
            } else {
              targetType = value.constructor;
            }
          if (!targetType && source)
            targetType = source.constructor;
          if (this.options.enableCircularCheck) {
            this.recursionStack.add(value);
          }
          var keys2 = this.getKeys(targetType, value, isMap2);
          var newValue = source ? source : {};
          if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
            if (isMap2) {
              newValue = /* @__PURE__ */ new Map();
            } else if (targetType) {
              newValue = new targetType();
            } else {
              newValue = {};
            }
          }
          var _loop_1 = function(key2) {
            if (key2 === "__proto__" || key2 === "constructor") {
              return "continue";
            }
            var valueKey = key2;
            var newValueKey = key2, propertyName = key2;
            if (!this_1.options.ignoreDecorators && targetType) {
              if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                var exposeMetadata = defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key2);
                if (exposeMetadata) {
                  propertyName = exposeMetadata.propertyName;
                  newValueKey = exposeMetadata.propertyName;
                }
              } else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                var exposeMetadata = defaultMetadataStorage.findExposeMetadata(targetType, key2);
                if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                  newValueKey = exposeMetadata.options.name;
                }
              }
            }
            var subValue = void 0;
            if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
              subValue = value[valueKey];
            } else {
              if (value instanceof Map) {
                subValue = value.get(valueKey);
              } else if (value[valueKey] instanceof Function) {
                subValue = value[valueKey]();
              } else {
                subValue = value[valueKey];
              }
            }
            var type2 = void 0, isSubValueMap = subValue instanceof Map;
            if (targetType && isMap2) {
              type2 = targetType;
            } else if (targetType) {
              var metadata_1 = defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
              if (metadata_1) {
                var options = { newObject: newValue, object: value, property: propertyName };
                var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
                if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                  if (!(value[valueKey] instanceof Array)) {
                    if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                      type2 = metadata_1.options.discriminator.subTypes.find(function(subType) {
                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                          return subType.name === subValue[metadata_1.options.discriminator.property];
                        }
                      });
                      type2 === void 0 ? type2 = newType : type2 = type2.value;
                      if (!metadata_1.options.keepDiscriminatorProperty) {
                        if (subValue && subValue instanceof Object && metadata_1.options.discriminator.property in subValue) {
                          delete subValue[metadata_1.options.discriminator.property];
                        }
                      }
                    }
                    if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                      type2 = subValue.constructor;
                    }
                    if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                      if (subValue) {
                        subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function(subType) {
                          return subType.value === subValue.constructor;
                        }).name;
                      }
                    }
                  } else {
                    type2 = metadata_1;
                  }
                } else {
                  type2 = newType;
                }
                isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
              } else if (this_1.options.targetMaps) {
                this_1.options.targetMaps.filter(function(map) {
                  return map.target === targetType && !!map.properties[propertyName];
                }).forEach(function(map) {
                  return type2 = map.properties[propertyName];
                });
              } else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
                if (reflectedType) {
                  type2 = reflectedType;
                }
              }
            }
            var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : void 0;
            var subSource = source ? source[valueKey] : void 0;
            if (newValue.constructor.prototype) {
              var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
              if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS) && // eslint-disable-next-line @typescript-eslint/unbound-method
              (descriptor && !descriptor.set || newValue[newValueKey] instanceof Function))
                return "continue";
            }
            if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
              var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key2;
              var finalValue = void 0;
              if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                finalValue = value[transformKey];
                finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                finalValue = value[transformKey] === finalValue ? subValue : finalValue;
                finalValue = this_1.transform(subSource, finalValue, type2, arrayType_1, isSubValueMap, level + 1);
              } else {
                if (subValue === void 0 && this_1.options.exposeDefaultValues) {
                  finalValue = newValue[newValueKey];
                } else {
                  finalValue = this_1.transform(subSource, subValue, type2, arrayType_1, isSubValueMap, level + 1);
                  finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                }
              }
              if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            } else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
              var finalValue = subValue;
              finalValue = this_1.applyCustomTransformations(finalValue, targetType, key2, value, this_1.transformationType);
              if (finalValue !== void 0 || this_1.options.exposeUnsetFields) {
                if (newValue instanceof Map) {
                  newValue.set(newValueKey, finalValue);
                } else {
                  newValue[newValueKey] = finalValue;
                }
              }
            }
          };
          var this_1 = this;
          for (var _i = 0, keys_1 = keys2; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            _loop_1(key);
          }
          if (this.options.enableCircularCheck) {
            this.recursionStack.delete(value);
          }
          return newValue;
        } else {
          return value;
        }
      };
      TransformOperationExecutor2.prototype.applyCustomTransformations = function(value, target, key, obj, transformationType) {
        var _this = this;
        var metadatas = defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
        if (this.options.version !== void 0) {
          metadatas = metadatas.filter(function(metadata) {
            if (!metadata.options)
              return true;
            return _this.checkVersion(metadata.options.since, metadata.options.until);
          });
        }
        if (this.options.groups && this.options.groups.length) {
          metadatas = metadatas.filter(function(metadata) {
            if (!metadata.options)
              return true;
            return _this.checkGroups(metadata.options.groups);
          });
        } else {
          metadatas = metadatas.filter(function(metadata) {
            return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
          });
        }
        metadatas.forEach(function(metadata) {
          value = metadata.transformFn({ value, key, obj, type: transformationType, options: _this.options });
        });
        return value;
      };
      TransformOperationExecutor2.prototype.isCircular = function(object) {
        return this.recursionStack.has(object);
      };
      TransformOperationExecutor2.prototype.getReflectedType = function(target, propertyName) {
        if (!target)
          return void 0;
        var meta = defaultMetadataStorage.findTypeMetadata(target, propertyName);
        return meta ? meta.reflectedType : void 0;
      };
      TransformOperationExecutor2.prototype.getKeys = function(target, object, isMap2) {
        var _this = this;
        var strategy = defaultMetadataStorage.getStrategy(target);
        if (strategy === "none")
          strategy = this.options.strategy || "exposeAll";
        var keys2 = [];
        if (strategy === "exposeAll" || isMap2) {
          if (object instanceof Map) {
            keys2 = Array.from(object.keys());
          } else {
            keys2 = Object.keys(object);
          }
        }
        if (isMap2) {
          return keys2;
        }
        if (this.options.ignoreDecorators && this.options.excludeExtraneousValues && target) {
          var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          var excludedProperties = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          keys2 = __spreadArray(__spreadArray([], exposedProperties, true), excludedProperties, true);
        }
        if (!this.options.ignoreDecorators && target) {
          var exposedProperties = defaultMetadataStorage.getExposedProperties(target, this.transformationType);
          if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
            exposedProperties = exposedProperties.map(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                return exposeMetadata.options.name;
              }
              return key;
            });
          }
          if (this.options.excludeExtraneousValues) {
            keys2 = exposedProperties;
          } else {
            keys2 = keys2.concat(exposedProperties);
          }
          var excludedProperties_1 = defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
          if (excludedProperties_1.length > 0) {
            keys2 = keys2.filter(function(key) {
              return !excludedProperties_1.includes(key);
            });
          }
          if (this.options.version !== void 0) {
            keys2 = keys2.filter(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
            });
          }
          if (this.options.groups && this.options.groups.length) {
            keys2 = keys2.filter(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              if (!exposeMetadata || !exposeMetadata.options)
                return true;
              return _this.checkGroups(exposeMetadata.options.groups);
            });
          } else {
            keys2 = keys2.filter(function(key) {
              var exposeMetadata = defaultMetadataStorage.findExposeMetadata(target, key);
              return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
            });
          }
        }
        if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
          keys2 = keys2.filter(function(key) {
            return _this.options.excludePrefixes.every(function(prefix) {
              return key.substr(0, prefix.length) !== prefix;
            });
          });
        }
        keys2 = keys2.filter(function(key, index, self2) {
          return self2.indexOf(key) === index;
        });
        return keys2;
      };
      TransformOperationExecutor2.prototype.checkVersion = function(since, until) {
        var decision = true;
        if (decision && since)
          decision = this.options.version >= since;
        if (decision && until)
          decision = this.options.version < until;
        return decision;
      };
      TransformOperationExecutor2.prototype.checkGroups = function(groups) {
        if (!groups)
          return true;
        return this.options.groups.some(function(optionGroup) {
          return groups.includes(optionGroup);
        });
      };
      return TransformOperationExecutor2;
    })()
  );

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/constants/default-options.constant.js
  var defaultOptions = {
    enableCircularCheck: false,
    enableImplicitConversion: false,
    excludeExtraneousValues: false,
    excludePrefixes: void 0,
    exposeDefaultValues: false,
    exposeUnsetFields: true,
    groups: void 0,
    ignoreDecorators: false,
    strategy: void 0,
    targetMaps: void 0,
    version: void 0
  };

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/ClassTransformer.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var ClassTransformer = (
    /** @class */
    (function() {
      function ClassTransformer2() {
      }
      ClassTransformer2.prototype.instanceToPlain = function(object, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.classToPlainFromExist = function(object, plainObject, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_PLAIN, __assign(__assign({}, defaultOptions), options));
        return executor.transform(plainObject, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.plainToInstance = function(cls, plain, options) {
        var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(void 0, plain, cls, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.plainToClassFromExist = function(clsObject, plain, options) {
        var executor = new TransformOperationExecutor(TransformationType.PLAIN_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(clsObject, plain, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.instanceToInstance = function(object, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(void 0, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.classToClassFromExist = function(object, fromObject, options) {
        var executor = new TransformOperationExecutor(TransformationType.CLASS_TO_CLASS, __assign(__assign({}, defaultOptions), options));
        return executor.transform(fromObject, object, void 0, void 0, void 0, void 0);
      };
      ClassTransformer2.prototype.serialize = function(object, options) {
        return JSON.stringify(this.instanceToPlain(object, options));
      };
      ClassTransformer2.prototype.deserialize = function(cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      };
      ClassTransformer2.prototype.deserializeArray = function(cls, json, options) {
        var jsonObject = JSON.parse(json);
        return this.plainToInstance(cls, jsonObject, options);
      };
      return ClassTransformer2;
    })()
  );

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/decorators/type.decorator.js
  function Type(typeFunction, options) {
    if (options === void 0) {
      options = {};
    }
    return function(target, propertyName) {
      var reflectedType = Reflect.getMetadata("design:type", target, propertyName);
      defaultMetadataStorage.addTypeMetadata({
        target: target.constructor,
        propertyName,
        reflectedType,
        typeFunction,
        options
      });
    };
  }

  // node_modules/.pnpm/class-transformer@0.5.1/node_modules/class-transformer/esm5/index.js
  var classTransformer = new ClassTransformer();
  function plainToInstance(cls, plain, options) {
    return classTransformer.plainToInstance(cls, plain, options);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/metadata/ValidationMetadata.js
  var ValidationMetadata = (
    /** @class */
    /* @__PURE__ */ (function() {
      function ValidationMetadata2(args) {
        this.groups = [];
        this.each = false;
        this.context = void 0;
        this.type = args.type;
        this.name = args.name;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args === null || args === void 0 ? void 0 : args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
          this.message = args.validationOptions.message;
          this.groups = args.validationOptions.groups;
          this.always = args.validationOptions.always;
          this.each = args.validationOptions.each;
          this.context = args.validationOptions.context;
        }
      }
      return ValidationMetadata2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation-schema/ValidationSchemaToMetadataTransformer.js
  var ValidationSchemaToMetadataTransformer = (
    /** @class */
    (function() {
      function ValidationSchemaToMetadataTransformer2() {
      }
      ValidationSchemaToMetadataTransformer2.prototype.transform = function(schema) {
        var metadatas = [];
        Object.keys(schema.properties).forEach(function(property) {
          schema.properties[property].forEach(function(validation) {
            var validationOptions = {
              message: validation.message,
              groups: validation.groups,
              always: validation.always,
              each: validation.each
            };
            var args = {
              type: validation.type,
              name: validation.name,
              target: schema.name,
              propertyName: property,
              constraints: validation.constraints,
              validationTypeOptions: validation.options,
              validationOptions
            };
            metadatas.push(new ValidationMetadata(args));
          });
        });
        return metadatas;
      };
      return ValidationSchemaToMetadataTransformer2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/utils/convert-to-array.util.js
  function convertToArray(val) {
    if (val instanceof Map) {
      return Array.from(val.values());
    }
    return Array.isArray(val) ? val : Array.from(val);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/utils/get-global.util.js
  function getGlobal2() {
    if (typeof globalThis !== "undefined") {
      return globalThis;
    }
    if (typeof global !== "undefined") {
      return global;
    }
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof self !== "undefined") {
      return self;
    }
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/utils/is-promise.util.js
  function isPromise2(p) {
    return p !== null && typeof p === "object" && typeof p.then === "function";
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/metadata/MetadataStorage.js
  var __values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = function(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var MetadataStorage2 = (
    /** @class */
    (function() {
      function MetadataStorage3() {
        this.validationMetadatas = /* @__PURE__ */ new Map();
        this.constraintMetadatas = /* @__PURE__ */ new Map();
      }
      Object.defineProperty(MetadataStorage3.prototype, "hasValidationMetaData", {
        get: function() {
          return !!this.validationMetadatas.size;
        },
        enumerable: false,
        configurable: true
      });
      MetadataStorage3.prototype.addValidationSchema = function(schema) {
        var _this = this;
        var validationMetadatas = new ValidationSchemaToMetadataTransformer().transform(schema);
        validationMetadatas.forEach(function(validationMetadata) {
          return _this.addValidationMetadata(validationMetadata);
        });
      };
      MetadataStorage3.prototype.addValidationMetadata = function(metadata) {
        var existingMetadata = this.validationMetadatas.get(metadata.target);
        if (existingMetadata) {
          existingMetadata.push(metadata);
        } else {
          this.validationMetadatas.set(metadata.target, [metadata]);
        }
      };
      MetadataStorage3.prototype.addConstraintMetadata = function(metadata) {
        var existingMetadata = this.constraintMetadatas.get(metadata.target);
        if (existingMetadata) {
          existingMetadata.push(metadata);
        } else {
          this.constraintMetadatas.set(metadata.target, [metadata]);
        }
      };
      MetadataStorage3.prototype.groupByPropertyName = function(metadata) {
        var grouped = {};
        metadata.forEach(function(metadata2) {
          if (!grouped[metadata2.propertyName])
            grouped[metadata2.propertyName] = [];
          grouped[metadata2.propertyName].push(metadata2);
        });
        return grouped;
      };
      MetadataStorage3.prototype.getTargetValidationMetadatas = function(targetConstructor, targetSchema, always, strictGroups, groups) {
        var e_1, _a;
        var includeMetadataBecauseOfAlwaysOption = function(metadata) {
          if (typeof metadata.always !== "undefined")
            return metadata.always;
          if (metadata.groups && metadata.groups.length)
            return false;
          return always;
        };
        var excludeMetadataBecauseOfStrictGroupsOption = function(metadata) {
          if (strictGroups) {
            if (!groups || !groups.length) {
              if (metadata.groups && metadata.groups.length)
                return true;
            }
          }
          return false;
        };
        var filteredForOriginalMetadatasSearch = this.validationMetadatas.get(targetConstructor) || [];
        var originalMetadatas = filteredForOriginalMetadatasSearch.filter(function(metadata) {
          if (metadata.target !== targetConstructor && metadata.target !== targetSchema)
            return false;
          if (includeMetadataBecauseOfAlwaysOption(metadata))
            return true;
          if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
            return false;
          if (groups && groups.length > 0)
            return metadata.groups && !!metadata.groups.find(function(group) {
              return groups.indexOf(group) !== -1;
            });
          return true;
        });
        var filteredForInheritedMetadatasSearch = [];
        try {
          for (var _b = __values(this.validationMetadatas.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            if (targetConstructor.prototype instanceof key) {
              filteredForInheritedMetadatasSearch.push.apply(filteredForInheritedMetadatasSearch, __spreadArray2([], __read(value), false));
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        var inheritedMetadatas = filteredForInheritedMetadatasSearch.filter(function(metadata) {
          if (typeof metadata.target === "string")
            return false;
          if (metadata.target === targetConstructor)
            return false;
          if (metadata.target instanceof Function && !(targetConstructor.prototype instanceof metadata.target))
            return false;
          if (includeMetadataBecauseOfAlwaysOption(metadata))
            return true;
          if (excludeMetadataBecauseOfStrictGroupsOption(metadata))
            return false;
          if (groups && groups.length > 0)
            return metadata.groups && !!metadata.groups.find(function(group) {
              return groups.indexOf(group) !== -1;
            });
          return true;
        });
        var uniqueInheritedMetadatas = inheritedMetadatas.filter(function(inheritedMetadata) {
          return !originalMetadatas.find(function(originalMetadata) {
            return originalMetadata.propertyName === inheritedMetadata.propertyName && originalMetadata.type === inheritedMetadata.type;
          });
        });
        return originalMetadatas.concat(uniqueInheritedMetadatas);
      };
      MetadataStorage3.prototype.getTargetValidatorConstraints = function(target) {
        return this.constraintMetadatas.get(target) || [];
      };
      return MetadataStorage3;
    })()
  );
  function getMetadataStorage() {
    var global2 = getGlobal2();
    if (!global2.classValidatorMetadataStorage) {
      global2.classValidatorMetadataStorage = new MetadataStorage2();
    }
    return global2.classValidatorMetadataStorage;
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationError.js
  var ValidationError = (
    /** @class */
    (function() {
      function ValidationError2() {
      }
      ValidationError2.prototype.toString = function(shouldDecorate, hasParent, parentPath, showConstraintMessages) {
        var _this = this;
        if (shouldDecorate === void 0) {
          shouldDecorate = false;
        }
        if (hasParent === void 0) {
          hasParent = false;
        }
        if (parentPath === void 0) {
          parentPath = "";
        }
        if (showConstraintMessages === void 0) {
          showConstraintMessages = false;
        }
        var boldStart = shouldDecorate ? "\x1B[1m" : "";
        var boldEnd = shouldDecorate ? "\x1B[22m" : "";
        var constraintsToString = function() {
          var _a;
          return (showConstraintMessages ? Object.values : Object.keys)((_a = _this.constraints) !== null && _a !== void 0 ? _a : {}).join(", ");
        };
        var propConstraintFailed = function(propertyName) {
          return " - property ".concat(boldStart).concat(parentPath).concat(propertyName).concat(boldEnd, " has failed the following constraints: ").concat(boldStart).concat(constraintsToString()).concat(boldEnd, " \n");
        };
        if (!hasParent) {
          return "An instance of ".concat(boldStart).concat(this.target ? this.target.constructor.name : "an object").concat(boldEnd, " has failed the validation:\n") + (this.constraints ? propConstraintFailed(this.property) : "") + (this.children ? this.children.map(function(childError) {
            return childError.toString(shouldDecorate, true, _this.property, showConstraintMessages);
          }).join("") : "");
        } else {
          var formattedProperty_1 = Number.isInteger(+this.property) ? "[".concat(this.property, "]") : "".concat(parentPath ? "." : "").concat(this.property);
          if (this.constraints) {
            return propConstraintFailed(formattedProperty_1);
          } else {
            return this.children ? this.children.map(function(childError) {
              return childError.toString(shouldDecorate, true, "".concat(parentPath).concat(formattedProperty_1), showConstraintMessages);
            }).join("") : "";
          }
        }
      };
      return ValidationError2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationTypes.js
  var ValidationTypes = (
    /** @class */
    (function() {
      function ValidationTypes2() {
      }
      ValidationTypes2.isValid = function(type2) {
        var _this = this;
        return type2 !== "isValid" && type2 !== "getMessage" && Object.keys(this).map(function(key) {
          return _this[key];
        }).indexOf(type2) !== -1;
      };
      ValidationTypes2.CUSTOM_VALIDATION = "customValidation";
      ValidationTypes2.NESTED_VALIDATION = "nestedValidation";
      ValidationTypes2.PROMISE_VALIDATION = "promiseValidation";
      ValidationTypes2.CONDITIONAL_VALIDATION = "conditionalValidation";
      ValidationTypes2.WHITELIST = "whitelistValidation";
      ValidationTypes2.IS_DEFINED = "isDefined";
      return ValidationTypes2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationUtils.js
  function constraintToString(constraint) {
    if (Array.isArray(constraint)) {
      return constraint.join(", ");
    }
    if (typeof constraint === "symbol") {
      constraint = constraint.description;
    }
    return "".concat(constraint);
  }
  var ValidationUtils = (
    /** @class */
    (function() {
      function ValidationUtils2() {
      }
      ValidationUtils2.replaceMessageSpecialTokens = function(message, validationArguments) {
        var messageString;
        if (message instanceof Function) {
          messageString = message(validationArguments);
        } else if (typeof message === "string") {
          messageString = message;
        }
        if (messageString && Array.isArray(validationArguments.constraints)) {
          validationArguments.constraints.forEach(function(constraint, index) {
            messageString = messageString.replace(new RegExp("\\$constraint".concat(index + 1), "g"), constraintToString(constraint));
          });
        }
        if (messageString && validationArguments.value !== void 0 && validationArguments.value !== null && ["string", "boolean", "number"].includes(typeof validationArguments.value))
          messageString = messageString.replace(/\$value/g, validationArguments.value);
        if (messageString)
          messageString = messageString.replace(/\$property/g, validationArguments.property);
        if (messageString)
          messageString = messageString.replace(/\$target/g, validationArguments.targetName);
        return messageString;
      };
      return ValidationUtils2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/ValidationExecutor.js
  var __read2 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  };
  var ValidationExecutor = (
    /** @class */
    (function() {
      function ValidationExecutor2(validator, validatorOptions) {
        this.validator = validator;
        this.validatorOptions = validatorOptions;
        this.awaitingPromises = [];
        this.ignoreAsyncValidations = false;
        this.metadataStorage = getMetadataStorage();
      }
      ValidationExecutor2.prototype.execute = function(object, targetSchema, validationErrors) {
        var _this = this;
        var _a, _b;
        if (!this.metadataStorage.hasValidationMetaData && ((_a = this.validatorOptions) === null || _a === void 0 ? void 0 : _a.enableDebugMessages) === true) {
          console.warn("No validation metadata found. No validation will be  performed. There are multiple possible reasons:\n  - There may be multiple class-validator versions installed. You will need to flatten your dependencies to fix the issue.\n  - This validation runs before any file with validation decorator was parsed by NodeJS.");
        }
        var groups = this.validatorOptions ? this.validatorOptions.groups : void 0;
        var strictGroups = this.validatorOptions && this.validatorOptions.strictGroups || false;
        var always = this.validatorOptions && this.validatorOptions.always || false;
        var forbidUnknownValues = ((_b = this.validatorOptions) === null || _b === void 0 ? void 0 : _b.forbidUnknownValues) === void 0 || this.validatorOptions.forbidUnknownValues !== false;
        var targetMetadatas = this.metadataStorage.getTargetValidationMetadatas(object.constructor, targetSchema, always, strictGroups, groups);
        var groupedMetadatas = this.metadataStorage.groupByPropertyName(targetMetadatas);
        if (forbidUnknownValues && !targetMetadatas.length) {
          var validationError = new ValidationError();
          if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === true)
            validationError.target = object;
          validationError.value = void 0;
          validationError.property = void 0;
          validationError.children = [];
          validationError.constraints = { unknownValue: "an unknown value was passed to the validate function" };
          validationErrors.push(validationError);
          return;
        }
        if (this.validatorOptions && this.validatorOptions.whitelist)
          this.whitelist(object, groupedMetadatas, validationErrors);
        Object.keys(groupedMetadatas).forEach(function(propertyName) {
          var value = object[propertyName];
          var definedMetadatas = groupedMetadatas[propertyName].filter(function(metadata) {
            return metadata.type === ValidationTypes.IS_DEFINED;
          });
          var metadatas = groupedMetadatas[propertyName].filter(function(metadata) {
            return metadata.type !== ValidationTypes.IS_DEFINED && metadata.type !== ValidationTypes.WHITELIST;
          });
          if (value instanceof Promise && metadatas.find(function(metadata) {
            return metadata.type === ValidationTypes.PROMISE_VALIDATION;
          })) {
            _this.awaitingPromises.push(value.then(function(resolvedValue) {
              _this.performValidations(object, resolvedValue, propertyName, definedMetadatas, metadatas, validationErrors);
            }));
          } else {
            _this.performValidations(object, value, propertyName, definedMetadatas, metadatas, validationErrors);
          }
        });
      };
      ValidationExecutor2.prototype.whitelist = function(object, groupedMetadatas, validationErrors) {
        var _this = this;
        var notAllowedProperties = [];
        Object.keys(object).forEach(function(propertyName) {
          if (!groupedMetadatas[propertyName] || groupedMetadatas[propertyName].length === 0)
            notAllowedProperties.push(propertyName);
        });
        if (notAllowedProperties.length > 0) {
          if (this.validatorOptions && this.validatorOptions.forbidNonWhitelisted) {
            notAllowedProperties.forEach(function(property) {
              var _a;
              var validationError = _this.generateValidationError(object, object[property], property);
              validationError.constraints = (_a = {}, _a[ValidationTypes.WHITELIST] = "property ".concat(property, " should not exist"), _a);
              validationError.children = void 0;
              validationErrors.push(validationError);
            });
          } else {
            notAllowedProperties.forEach(function(property) {
              return delete object[property];
            });
          }
        }
      };
      ValidationExecutor2.prototype.stripEmptyErrors = function(errors) {
        var _this = this;
        return errors.filter(function(error) {
          if (error.children) {
            error.children = _this.stripEmptyErrors(error.children);
          }
          if (Object.keys(error.constraints).length === 0) {
            if (error.children.length === 0) {
              return false;
            } else {
              delete error.constraints;
            }
          }
          return true;
        });
      };
      ValidationExecutor2.prototype.performValidations = function(object, value, propertyName, definedMetadatas, metadatas, validationErrors) {
        var customValidationMetadatas = metadatas.filter(function(metadata) {
          return metadata.type === ValidationTypes.CUSTOM_VALIDATION;
        });
        var nestedValidationMetadatas = metadatas.filter(function(metadata) {
          return metadata.type === ValidationTypes.NESTED_VALIDATION;
        });
        var conditionalValidationMetadatas = metadatas.filter(function(metadata) {
          return metadata.type === ValidationTypes.CONDITIONAL_VALIDATION;
        });
        var validationError = this.generateValidationError(object, value, propertyName);
        validationErrors.push(validationError);
        var canValidate = this.conditionalValidations(object, value, conditionalValidationMetadatas);
        if (!canValidate) {
          return;
        }
        this.customValidations(object, value, definedMetadatas, validationError);
        this.mapContexts(object, value, definedMetadatas, validationError);
        if (value === void 0 && this.validatorOptions && this.validatorOptions.skipUndefinedProperties === true) {
          return;
        }
        if (value === null && this.validatorOptions && this.validatorOptions.skipNullProperties === true) {
          return;
        }
        if ((value === null || value === void 0) && this.validatorOptions && this.validatorOptions.skipMissingProperties === true) {
          return;
        }
        this.customValidations(object, value, customValidationMetadatas, validationError);
        this.nestedValidations(value, nestedValidationMetadatas, validationError);
        this.mapContexts(object, value, metadatas, validationError);
        this.mapContexts(object, value, customValidationMetadatas, validationError);
      };
      ValidationExecutor2.prototype.generateValidationError = function(object, value, propertyName) {
        var validationError = new ValidationError();
        if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.target === void 0 || this.validatorOptions.validationError.target === true)
          validationError.target = object;
        if (!this.validatorOptions || !this.validatorOptions.validationError || this.validatorOptions.validationError.value === void 0 || this.validatorOptions.validationError.value === true)
          validationError.value = value;
        validationError.property = propertyName;
        validationError.children = [];
        validationError.constraints = {};
        return validationError;
      };
      ValidationExecutor2.prototype.conditionalValidations = function(object, value, metadatas) {
        return metadatas.map(function(metadata) {
          return metadata.constraints[0](object, value);
        }).reduce(function(resultA, resultB) {
          return resultA && resultB;
        }, true);
      };
      ValidationExecutor2.prototype.customValidations = function(object, value, metadatas, error) {
        var _this = this;
        metadatas.forEach(function(metadata) {
          _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls).forEach(function(customConstraintMetadata) {
            if (customConstraintMetadata.async && _this.ignoreAsyncValidations)
              return;
            if (_this.validatorOptions && _this.validatorOptions.stopAtFirstError && Object.keys(error.constraints || {}).length > 0)
              return;
            var validationArguments = {
              targetName: object.constructor ? object.constructor.name : void 0,
              property: metadata.propertyName,
              object,
              value,
              constraints: metadata.constraints
            };
            if (!metadata.each || !(Array.isArray(value) || value instanceof Set || value instanceof Map)) {
              var validatedValue = customConstraintMetadata.instance.validate(value, validationArguments);
              if (isPromise2(validatedValue)) {
                var promise = validatedValue.then(function(isValid) {
                  if (!isValid) {
                    var _a2 = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type3 = _a2[0], message2 = _a2[1];
                    error.constraints[type3] = message2;
                    if (metadata.context) {
                      if (!error.contexts) {
                        error.contexts = {};
                      }
                      error.contexts[type3] = Object.assign(error.contexts[type3] || {}, metadata.context);
                    }
                  }
                });
                _this.awaitingPromises.push(promise);
              } else {
                if (!validatedValue) {
                  var _a = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type2 = _a[0], message = _a[1];
                  error.constraints[type2] = message;
                }
              }
              return;
            }
            var arrayValue = convertToArray(value);
            var validatedSubValues = arrayValue.map(function(subValue) {
              return customConstraintMetadata.instance.validate(subValue, validationArguments);
            });
            var validationIsAsync = validatedSubValues.some(function(validatedSubValue) {
              return isPromise2(validatedSubValue);
            });
            if (validationIsAsync) {
              var asyncValidatedSubValues = validatedSubValues.map(function(validatedSubValue) {
                return isPromise2(validatedSubValue) ? validatedSubValue : Promise.resolve(validatedSubValue);
              });
              var asyncValidationIsFinishedPromise = Promise.all(asyncValidatedSubValues).then(function(flatValidatedValues) {
                var validationResult2 = flatValidatedValues.every(function(isValid) {
                  return isValid;
                });
                if (!validationResult2) {
                  var _a2 = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type3 = _a2[0], message2 = _a2[1];
                  error.constraints[type3] = message2;
                  if (metadata.context) {
                    if (!error.contexts) {
                      error.contexts = {};
                    }
                    error.contexts[type3] = Object.assign(error.contexts[type3] || {}, metadata.context);
                  }
                }
              });
              _this.awaitingPromises.push(asyncValidationIsFinishedPromise);
              return;
            }
            var validationResult = validatedSubValues.every(function(isValid) {
              return isValid;
            });
            if (!validationResult) {
              var _b = __read2(_this.createValidationError(object, value, metadata, customConstraintMetadata), 2), type2 = _b[0], message = _b[1];
              error.constraints[type2] = message;
            }
          });
        });
      };
      ValidationExecutor2.prototype.nestedValidations = function(value, metadatas, error) {
        var _this = this;
        if (value === void 0) {
          return;
        }
        metadatas.forEach(function(metadata) {
          if (metadata.type !== ValidationTypes.NESTED_VALIDATION && metadata.type !== ValidationTypes.PROMISE_VALIDATION) {
            return;
          } else if (_this.validatorOptions && _this.validatorOptions.stopAtFirstError && Object.keys(error.constraints || {}).length > 0) {
            return;
          }
          if (Array.isArray(value) || value instanceof Set || value instanceof Map) {
            var arrayLikeValue = value instanceof Set ? Array.from(value) : value;
            arrayLikeValue.forEach(function(subValue, index) {
              _this.performValidations(value, subValue, index.toString(), [], metadatas, error.children);
            });
          } else if (value instanceof Object) {
            var targetSchema = typeof metadata.target === "string" ? metadata.target : metadata.target.name;
            _this.execute(value, targetSchema, error.children);
          } else {
            var _a = __read2(_this.createValidationError(metadata.target, value, metadata), 2), type2 = _a[0], message = _a[1];
            error.constraints[type2] = message;
          }
        });
      };
      ValidationExecutor2.prototype.mapContexts = function(object, value, metadatas, error) {
        var _this = this;
        return metadatas.forEach(function(metadata) {
          if (metadata.context) {
            var customConstraint = void 0;
            if (metadata.type === ValidationTypes.CUSTOM_VALIDATION) {
              var customConstraints = _this.metadataStorage.getTargetValidatorConstraints(metadata.constraintCls);
              customConstraint = customConstraints[0];
            }
            var type2 = _this.getConstraintType(metadata, customConstraint);
            if (error.constraints[type2]) {
              if (!error.contexts) {
                error.contexts = {};
              }
              error.contexts[type2] = Object.assign(error.contexts[type2] || {}, metadata.context);
            }
          }
        });
      };
      ValidationExecutor2.prototype.createValidationError = function(object, value, metadata, customValidatorMetadata) {
        var targetName = object.constructor ? object.constructor.name : void 0;
        var type2 = this.getConstraintType(metadata, customValidatorMetadata);
        var validationArguments = {
          targetName,
          property: metadata.propertyName,
          object,
          value,
          constraints: metadata.constraints
        };
        var message = metadata.message || "";
        if (!metadata.message && (!this.validatorOptions || this.validatorOptions && !this.validatorOptions.dismissDefaultMessages)) {
          if (customValidatorMetadata && customValidatorMetadata.instance.defaultMessage instanceof Function) {
            message = customValidatorMetadata.instance.defaultMessage(validationArguments);
          }
        }
        var messageString = ValidationUtils.replaceMessageSpecialTokens(message, validationArguments);
        return [type2, messageString];
      };
      ValidationExecutor2.prototype.getConstraintType = function(metadata, customValidatorMetadata) {
        var type2 = customValidatorMetadata && customValidatorMetadata.name ? customValidatorMetadata.name : metadata.type;
        return type2;
      };
      return ValidationExecutor2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/validation/Validator.js
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var Validator = (
    /** @class */
    (function() {
      function Validator2() {
      }
      Validator2.prototype.validate = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions);
      };
      Validator2.prototype.validateOrReject = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        return __awaiter(this, void 0, void 0, function() {
          var errors;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, this.coreValidate(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions)];
              case 1:
                errors = _a.sent();
                if (errors.length)
                  return [2, Promise.reject(errors)];
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      Validator2.prototype.validateSync = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === "string" ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === "string" ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === "string" ? objectOrSchemaName : void 0;
        var executor = new ValidationExecutor(this, options);
        executor.ignoreAsyncValidations = true;
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return executor.stripEmptyErrors(validationErrors);
      };
      Validator2.prototype.coreValidate = function(objectOrSchemaName, objectOrValidationOptions, maybeValidatorOptions) {
        var object = typeof objectOrSchemaName === "string" ? objectOrValidationOptions : objectOrSchemaName;
        var options = typeof objectOrSchemaName === "string" ? maybeValidatorOptions : objectOrValidationOptions;
        var schema = typeof objectOrSchemaName === "string" ? objectOrSchemaName : void 0;
        var executor = new ValidationExecutor(this, options);
        var validationErrors = [];
        executor.execute(object, schema, validationErrors);
        return Promise.all(executor.awaitingPromises).then(function() {
          return executor.stripEmptyErrors(validationErrors);
        });
      };
      return Validator2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/container.js
  var defaultContainer = new /** @class */
  ((function() {
    function class_1() {
      this.instances = [];
    }
    class_1.prototype.get = function(someClass) {
      var instance = this.instances.find(function(instance2) {
        return instance2.type === someClass;
      });
      if (!instance) {
        instance = { type: someClass, object: new someClass() };
        this.instances.push(instance);
      }
      return instance.object;
    };
    return class_1;
  })())();
  var userContainer;
  var userContainerOptions;
  function getFromContainer(someClass) {
    if (userContainer) {
      try {
        var instance = userContainer.get(someClass);
        if (instance)
          return instance;
        if (!userContainerOptions || !userContainerOptions.fallback)
          return instance;
      } catch (error) {
        if (!userContainerOptions || !userContainerOptions.fallbackOnErrors)
          throw error;
      }
    }
    return defaultContainer.get(someClass);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/metadata/ConstraintMetadata.js
  var ConstraintMetadata = (
    /** @class */
    (function() {
      function ConstraintMetadata2(target, name, async) {
        if (async === void 0) {
          async = false;
        }
        this.target = target;
        this.name = name;
        this.async = async;
      }
      Object.defineProperty(ConstraintMetadata2.prototype, "instance", {
        // -------------------------------------------------------------------------
        // Accessors
        // -------------------------------------------------------------------------
        /**
         * Instance of the target custom validation class which performs validation.
         */
        get: function() {
          return getFromContainer(this.target);
        },
        enumerable: false,
        configurable: true
      });
      return ConstraintMetadata2;
    })()
  );

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/register-decorator.js
  function registerDecorator(options) {
    var constraintCls;
    if (options.validator instanceof Function) {
      constraintCls = options.validator;
      var constraintClasses = getFromContainer(MetadataStorage2).getTargetValidatorConstraints(options.validator);
      if (constraintClasses.length > 1) {
        throw "More than one implementation of ValidatorConstraintInterface found for validator on: ".concat(options.target.name, ":").concat(options.propertyName);
      }
    } else {
      var validator_1 = options.validator;
      constraintCls = /** @class */
      (function() {
        function CustomConstraint() {
        }
        CustomConstraint.prototype.validate = function(value, validationArguments) {
          return validator_1.validate(value, validationArguments);
        };
        CustomConstraint.prototype.defaultMessage = function(validationArguments) {
          if (validator_1.defaultMessage) {
            return validator_1.defaultMessage(validationArguments);
          }
          return "";
        };
        return CustomConstraint;
      })();
      getMetadataStorage().addConstraintMetadata(new ConstraintMetadata(constraintCls, options.name, options.async));
    }
    var validationMetadataArgs = {
      type: options.name && ValidationTypes.isValid(options.name) ? options.name : ValidationTypes.CUSTOM_VALIDATION,
      name: options.name,
      target: options.target,
      propertyName: options.propertyName,
      validationOptions: options.options,
      constraintCls,
      constraints: options.constraints
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(validationMetadataArgs));
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/common/ValidateBy.js
  function buildMessage(impl, validationOptions) {
    return function(validationArguments) {
      var eachPrefix = validationOptions && validationOptions.each ? "each value in " : "";
      return impl(eachPrefix, validationArguments);
    };
  }
  function ValidateBy(options, validationOptions) {
    return function(object, propertyName) {
      registerDecorator({
        name: options.name,
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: options.constraints,
        validator: options.validator
      });
    };
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/common/IsOptional.js
  var IS_OPTIONAL = "isOptional";
  function IsOptional(validationOptions) {
    return function(object, propertyName) {
      var args = {
        type: ValidationTypes.CONDITIONAL_VALIDATION,
        name: IS_OPTIONAL,
        target: object.constructor,
        propertyName,
        constraints: [
          function(object2, value) {
            return object2[propertyName] !== null && object2[propertyName] !== void 0;
          }
        ],
        validationOptions
      };
      getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    };
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/common/ValidateNested.js
  var __assign2 = function() {
    __assign2 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
      }
      return t;
    };
    return __assign2.apply(this, arguments);
  };
  function ValidateNested(validationOptions) {
    var opts = __assign2({}, validationOptions);
    var eachPrefix = opts.each ? "each value in " : "";
    opts.message = opts.message || eachPrefix + "nested property $property must be either object or array";
    return function(object, propertyName) {
      var args = {
        type: ValidationTypes.NESTED_VALIDATION,
        target: object.constructor,
        propertyName,
        validationOptions: opts
      };
      getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    };
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/common/IsIn.js
  var IS_IN = "isIn";
  function isIn(value, possibleValues) {
    return Array.isArray(possibleValues) && possibleValues.some(function(possibleValue) {
      return possibleValue === value;
    });
  }
  function IsIn(values, validationOptions) {
    return ValidateBy({
      name: IS_IN,
      constraints: [values],
      validator: {
        validate: function(value, args) {
          return isIn(value, args === null || args === void 0 ? void 0 : args.constraints[0]);
        },
        defaultMessage: buildMessage(function(eachPrefix) {
          return eachPrefix + "$property must be one of the following values: $constraint1";
        }, validationOptions)
      }
    }, validationOptions);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/string/Matches.js
  var import_matches = __toESM(require_matches());
  var MATCHES = "matches";
  function matches(value, pattern, modifiers) {
    return typeof value === "string" && (0, import_matches.default)(value, pattern, modifiers);
  }
  function Matches(pattern, modifiersOrAnnotationOptions, validationOptions) {
    var modifiers;
    if (modifiersOrAnnotationOptions && modifiersOrAnnotationOptions instanceof Object && !validationOptions) {
      validationOptions = modifiersOrAnnotationOptions;
    } else {
      modifiers = modifiersOrAnnotationOptions;
    }
    return ValidateBy({
      name: MATCHES,
      constraints: [pattern, modifiers],
      validator: {
        validate: function(value, args) {
          return matches(value, args === null || args === void 0 ? void 0 : args.constraints[0], args === null || args === void 0 ? void 0 : args.constraints[1]);
        },
        defaultMessage: buildMessage(function(eachPrefix, args) {
          return eachPrefix + "$property must match $constraint1 regular expression";
        }, validationOptions)
      }
    }, validationOptions);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/typechecker/IsBoolean.js
  var IS_BOOLEAN = "isBoolean";
  function isBoolean(value) {
    return value instanceof Boolean || typeof value === "boolean";
  }
  function IsBoolean(validationOptions) {
    return ValidateBy({
      name: IS_BOOLEAN,
      validator: {
        validate: function(value, args) {
          return isBoolean(value);
        },
        defaultMessage: buildMessage(function(eachPrefix) {
          return eachPrefix + "$property must be a boolean value";
        }, validationOptions)
      }
    }, validationOptions);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/typechecker/IsNumber.js
  var IS_NUMBER = "isNumber";
  function isNumber(value, options) {
    if (options === void 0) {
      options = {};
    }
    if (typeof value !== "number") {
      return false;
    }
    if (value === Infinity || value === -Infinity) {
      return !!options.allowInfinity;
    }
    if (Number.isNaN(value)) {
      return !!options.allowNaN;
    }
    if (options.maxDecimalPlaces !== void 0) {
      var decimalPlaces = 0;
      if (value % 1 !== 0) {
        decimalPlaces = value.toString().split(".")[1].length;
      }
      if (decimalPlaces > options.maxDecimalPlaces) {
        return false;
      }
    }
    return Number.isFinite(value);
  }
  function IsNumber(options, validationOptions) {
    if (options === void 0) {
      options = {};
    }
    return ValidateBy({
      name: IS_NUMBER,
      constraints: [options],
      validator: {
        validate: function(value, args) {
          return isNumber(value, args === null || args === void 0 ? void 0 : args.constraints[0]);
        },
        defaultMessage: buildMessage(function(eachPrefix) {
          return eachPrefix + "$property must be a number conforming to the specified constraints";
        }, validationOptions)
      }
    }, validationOptions);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/typechecker/IsEnum.js
  function isEnum(value, entity) {
    var enumValues = Object.keys(entity).map(function(k) {
      return entity[k];
    });
    return enumValues.includes(value);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/typechecker/IsString.js
  var IS_STRING = "isString";
  function isString(value) {
    return value instanceof String || typeof value === "string";
  }
  function IsString(validationOptions) {
    return ValidateBy({
      name: IS_STRING,
      validator: {
        validate: function(value, args) {
          return isString(value);
        },
        defaultMessage: buildMessage(function(eachPrefix) {
          return eachPrefix + "$property must be a string";
        }, validationOptions)
      }
    }, validationOptions);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/decorator/typechecker/IsArray.js
  var IS_ARRAY = "isArray";
  function isArray(value) {
    return Array.isArray(value);
  }
  function IsArray(validationOptions) {
    return ValidateBy({
      name: IS_ARRAY,
      validator: {
        validate: function(value, args) {
          return isArray(value);
        },
        defaultMessage: buildMessage(function(eachPrefix) {
          return eachPrefix + "$property must be an array";
        }, validationOptions)
      }
    }, validationOptions);
  }

  // node_modules/.pnpm/class-validator@0.14.4/node_modules/class-validator/esm5/index.js
  function validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions) {
    if (typeof schemaNameOrObject === "string") {
      return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions, maybeValidatorOptions);
    } else {
      return getFromContainer(Validator).validate(schemaNameOrObject, objectOrValidationOptions);
    }
  }

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/validation.js
  async function validateData(data, dtoClass) {
    try {
      const dtoInstance = plainToInstance(dtoClass, data);
      const errors = await validate(dtoInstance);
      if (errors.length > 0) {
        const errorMessages = errors.flatMap(
          (error) => Object.values(error.constraints || {})
        );
        return {
          isValid: false,
          errors: errorMessages
        };
      }
      return {
        isValid: true,
        validatedData: dtoInstance
      };
    } catch (error) {
      return {
        isValid: false,
        errors: ["Validation error: " + error.message]
      };
    }
  }

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/messaging.js
  function isZoiChatRoomMessage(m) {
    return m.Content === MOD_DATA.key;
  }
  function isClassConstructor(c) {
    return typeof c === "function" && c.prototype?.constructor == c;
  }
  var MessagesManager = class {
    /**
     * Sends beep message to a specific player.
     * @param data - The data to send in the beep.
     * @param targetId - The member number of the target player.
     */
    sendBeep(data, targetId) {
      const beep = {
        IsSecret: true,
        BeepType: "Leash",
        MemberNumber: targetId,
        Message: JSON.stringify({
          ...data
        })
      };
      ServerSend("AccountBeep", beep);
    }
    /**
     * Sends hidden packet message to the chat room or a specific player.
     * @param msg - The message identifier.
     * @param _data - Optional data payload to include.
     * @param targetNumber - Optional target player member number.
     */
    sendPacket(msg, _data, targetNumber) {
      const data = {
        Content: MOD_DATA.key,
        Dictionary: {
          msg
        },
        Type: "Hidden"
      };
      if (_data) data.Dictionary.data = _data;
      if (targetNumber) data.Target = targetNumber;
      ServerSend("ChatRoomChat", data);
    }
    /**
     * Sends a custom action message to the chat room with automatic pronoun replacement.
     * 
     * Replaces placeholders such as `<Possessive>`, `<Intensive>`, `<SelfIntensive>`, and `<Pronoun>`.
     * @param msg - The action message text.
     * @param target - Optional target player member number.
     * @param dictionary - Optional additional dictionary entries.
     */
    sendAction(msg, target = void 0, dictionary = []) {
      if (!msg || !ServerPlayerIsInChatRoom()) return;
      const isFemale = CharacterPronounDescription(Player) === "She/Her";
      const capPossessive = isFemale ? "Her" : "His";
      const capIntensive = isFemale ? "Her" : "Him";
      const capSelfIntensive = isFemale ? "Herself" : "Himself";
      const capPronoun = isFemale ? "She" : "He";
      msg = msg.replaceAll("<Possessive>", capPossessive).replaceAll("<possessive>", capPossessive.toLocaleLowerCase()).replaceAll("<Intensive>", capIntensive).replaceAll("<intensive>", capIntensive.toLocaleLowerCase()).replaceAll("<SelfIntensive>", capSelfIntensive).replaceAll("<selfIntensive>", capSelfIntensive.toLocaleLowerCase()).replaceAll("<Pronoun>", capPronoun).replaceAll("<pronoun>", capPronoun.toLocaleLowerCase());
      ServerSend("ChatRoomChat", {
        Content: "Beep",
        Type: "Action",
        Target: target ?? void 0,
        Dictionary: [
          // EN
          { Tag: "Beep", Text: "msg" },
          // CN
          { Tag: "\u53D1\u9001\u79C1\u804A", Text: "msg" },
          // DE
          { Tag: "Biep", Text: "msg" },
          // FR
          { Tag: "Sonner", Text: "msg" },
          // RU
          { Tag: "\u0417\u0432\u0443\u043A\u043E\u0432\u043E\u0439 \u0441\u0438\u0433\u043D\u0430\u043B", Text: "msg" },
          { Tag: "msg", Text: msg },
          ...dictionary
        ]
      });
    }
    /**
     * Sends a request to a target player and waits for a response.
     * 
     * Supports both packet and beep transport. Automatically times out after 6 seconds.
     * @param options - Request configuration.
     * @param options.message - The request message identifier.
     * @param options.data - Optional data to send with the request.
     * @param options.target - Target player member number.
     * @param options.type - Transport type: `"packet"` or `"beep"`.
     * @returns A promise that resolves with the response data or an error flag.
     */
    sendRequest({
      message,
      data = {},
      target,
      type: type2 = "packet",
      responseDto
    }) {
      const requestId = crypto.randomUUID();
      return new Promise((resolve) => {
        let deleteHook;
        if (type2 === "packet") {
          messagesManager.sendPacket("request", {
            requestId,
            message,
            data
          }, target);
          deleteHook = hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, async (args, next) => {
            const _message = args[0];
            const sender = getPlayer(_message.Sender);
            if (!sender) return next(args);
            if (isZoiChatRoomMessage(_message) && !sender.IsPlayer()) {
              const msg = _message.Dictionary.msg;
              const data2 = _message.Dictionary.data;
              if (msg === "requestResponse" && data2.requestId === requestId) {
                deleteHook();
                if (responseDto) {
                  const validationResult = await validateData(data2.data, responseDto);
                  if (!validationResult.isValid) {
                    logger.warn(`DTO Failure:`, validationResult);
                    resolve({
                      isError: true
                    });
                  }
                }
                resolve({
                  data: data2.data,
                  isError: false
                });
              }
            }
            return next(args);
          });
        } else {
          messagesManager.sendBeep({
            type: `${MOD_DATA.key}_request`,
            requestId,
            message,
            data
          }, target);
          deleteHook = hookFunction("ServerAccountBeep", HookPriority.ADD_BEHAVIOR, async (args, next) => {
            const beep = args[0];
            if (beep.BeepType !== "Leash") return next(args);
            let data2;
            try {
              data2 = JSON.parse(beep.Message);
            } catch {
              return next(args);
            }
            if (data2.type === `${MOD_DATA.key}_requestResponse` && data2.requestId === requestId) {
              deleteHook();
              if (responseDto) {
                const validationResult = await validateData(data2.data, responseDto);
                if (!validationResult.isValid) {
                  logger.warn(`DTO Failure:`, validationResult);
                  resolve({
                    isError: true
                  });
                }
              }
              resolve({
                data: data2.data,
                isError: false
              });
            }
            return next(args);
          });
        }
        setTimeout(() => {
          deleteHook();
          resolve({
            isError: true
          });
        }, 6e3);
      });
    }
    /**
     * Displays a local message in the chat log (visible only to the current player).
     * @param message - The message content as a string or DOM node.
     */
    sendLocal(message) {
      if (!ServerPlayerIsInChatRoom()) return;
      const div = document.createElement("div");
      div.setAttribute("class", "ChatMessage ChatMessageLocalMessage");
      div.setAttribute("data-time", ChatRoomCurrentTime());
      div.setAttribute("data-sender", `${Player.MemberNumber}`);
      setFontFamily(div, MOD_DATA.fontFamily);
      div.style.background = MOD_DATA.chatMessageBackground ?? "#55edc095";
      div.style.color = MOD_DATA.chatMessageColor ?? "black";
      div.style.margin = "0.15em 0";
      if (typeof message === "string") div.innerHTML = message;
      else div.appendChild(message);
      document.querySelector("#TextAreaChatLog")?.appendChild(div);
      ElementScrollToEnd("TextAreaChatLog");
    }
    /**
     * Sends a regular chat message to the chat room.
     * @param message - The chat message content.
     */
    sendChat(message) {
      ServerSend("ChatRoomChat", { Type: "Chat", Content: message });
    }
    onRequest(message, dtoOrListener, listener) {
      let _listener;
      let dto;
      if (isClassConstructor(dtoOrListener)) {
        dto = dtoOrListener;
        _listener = listener;
      } else {
        _listener = dtoOrListener;
      }
      const rm1 = hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, async (args, next) => {
        const _message = args[0];
        const sender = getPlayer(_message.Sender);
        if (!sender) return next(args);
        if (isZoiChatRoomMessage(_message) && !sender.IsPlayer()) {
          const msg = _message.Dictionary?.msg;
          const data = _message.Dictionary?.data;
          if (msg === "request" && data.message === message) {
            if (typeof data.requestId !== "string" || typeof data.message !== "string") return;
            if (dto) {
              const validationResult = await validateData(data.data, dto);
              if (!validationResult.isValid) {
                logger.warn(`DTO Failure:`, validationResult);
                return;
              }
            }
            const _data = _listener?.(data.data, sender);
            if (_data !== void 0) {
              messagesManager.sendPacket("requestResponse", {
                requestId: data.requestId,
                message: data.message,
                data: _data
              }, sender.MemberNumber);
            }
          }
        }
        return next(args);
      });
      const rm2 = hookFunction("ServerAccountBeep", HookPriority.ADD_BEHAVIOR, async (args, next) => {
        const beep = args[0];
        if (beep.BeepType !== "Leash") return next(args);
        let data;
        try {
          data = JSON.parse(beep.Message);
        } catch {
          return next(args);
        }
        if (data.type === `${MOD_DATA.key}_request` && data.message === message) {
          if (typeof data.requestId !== "string") return;
          const validationResult = await validateData(data.data, dto);
          if (dto && !validationResult.isValid) {
            logger.warn(`DTO Failure:`, validationResult);
            return next(args);
          }
          const _data = _listener?.(data.data, beep.MemberNumber, beep.MemberName);
          if (_data !== void 0) {
            messagesManager.sendBeep({
              type: `${MOD_DATA.key}_requestResponse`,
              requestId: data.requestId,
              message: data.message,
              data: _data
            }, beep.MemberNumber);
          }
        }
        return next(args);
      });
      return () => {
        rm1();
        rm2();
      };
    }
    onPacket(message, dtoOrListener, listener) {
      return hookFunction("ChatRoomMessage", HookPriority.ADD_BEHAVIOR, async (args, next) => {
        let _listener;
        let dto;
        if (isClassConstructor(dtoOrListener)) {
          dto = dtoOrListener;
          _listener = listener;
        } else {
          _listener = dtoOrListener;
        }
        const _message = args[0];
        const sender = getPlayer(_message.Sender);
        if (!sender) return next(args);
        if (isZoiChatRoomMessage(_message) && _message.Dictionary.msg === message && !sender.IsPlayer()) {
          const validationResult = await validateData(_message.Dictionary.data, dto);
          if (dto && !validationResult.isValid) {
            logger.warn(`DTO Failure:`, validationResult);
            return next(args);
          }
          _listener?.(_message.Dictionary.data, sender);
        }
        return next(args);
      });
    }
  };
  var messagesManager = new MessagesManager();

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_freeGlobal.js
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  var freeGlobal_default = freeGlobal;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_root.js
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal_default || freeSelf || Function("return this")();
  var root_default = root;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Symbol.js
  var Symbol2 = root_default.Symbol;
  var Symbol_default = Symbol2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getRawTag.js
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = Symbol_default ? Symbol_default.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var getRawTag_default = getRawTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_objectToString.js
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString2.call(value);
  }
  var objectToString_default = objectToString;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetTag.js
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var symToStringTag2 = Symbol_default ? Symbol_default.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag_default(value) : objectToString_default(value);
  }
  var baseGetTag_default = baseGetTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObjectLike.js
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var isObjectLike_default = isObjectLike;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArray.js
  var isArray2 = Array.isArray;
  var isArray_default = isArray2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isObject.js
  function isObject(value) {
    var type2 = typeof value;
    return value != null && (type2 == "object" || type2 == "function");
  }
  var isObject_default = isObject;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isFunction.js
  var asyncTag = "[object AsyncFunction]";
  var funcTag = "[object Function]";
  var genTag = "[object GeneratorFunction]";
  var proxyTag = "[object Proxy]";
  function isFunction(value) {
    if (!isObject_default(value)) {
      return false;
    }
    var tag = baseGetTag_default(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var isFunction_default = isFunction;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_coreJsData.js
  var coreJsData = root_default["__core-js_shared__"];
  var coreJsData_default = coreJsData;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isMasked.js
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData_default && coreJsData_default.keys && coreJsData_default.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var isMasked_default = isMasked;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_toSource.js
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var toSource_default = toSource;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsNative.js
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype;
  var objectProto3 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto3.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject_default(value) || isMasked_default(value)) {
      return false;
    }
    var pattern = isFunction_default(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource_default(value));
  }
  var baseIsNative_default = baseIsNative;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getValue.js
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  var getValue_default = getValue;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getNative.js
  function getNative(object, key) {
    var value = getValue_default(object, key);
    return baseIsNative_default(value) ? value : void 0;
  }
  var getNative_default = getNative;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_WeakMap.js
  var WeakMap2 = getNative_default(root_default, "WeakMap");
  var WeakMap_default = WeakMap2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseCreate.js
  var objectCreate = Object.create;
  var baseCreate = /* @__PURE__ */ (function() {
    function object() {
    }
    return function(proto) {
      if (!isObject_default(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  var baseCreate_default = baseCreate;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copyArray.js
  function copyArray(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  var copyArray_default = copyArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_defineProperty.js
  var defineProperty = (function() {
    try {
      var func = getNative_default(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  var defineProperty_default = defineProperty;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayEach.js
  function arrayEach(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  var arrayEach_default = arrayEach;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isIndex.js
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type2 = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (type2 == "number" || type2 != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var isIndex_default = isIndex;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssignValue.js
  function baseAssignValue(object, key, value) {
    if (key == "__proto__" && defineProperty_default) {
      defineProperty_default(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  var baseAssignValue_default = baseAssignValue;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/eq.js
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var eq_default = eq;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assignValue.js
  var objectProto4 = Object.prototype;
  var hasOwnProperty3 = objectProto4.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty3.call(object, key) && eq_default(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue_default(object, key, value);
    }
  }
  var assignValue_default = assignValue;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copyObject.js
  function copyObject(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue_default(object, key, newValue);
      } else {
        assignValue_default(object, key, newValue);
      }
    }
    return object;
  }
  var copyObject_default = copyObject;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isLength.js
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  var isLength_default = isLength;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArrayLike.js
  function isArrayLike(value) {
    return value != null && isLength_default(value.length) && !isFunction_default(value);
  }
  var isArrayLike_default = isArrayLike;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isPrototype.js
  var objectProto5 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto5;
    return value === proto;
  }
  var isPrototype_default = isPrototype;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseTimes.js
  function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var baseTimes_default = baseTimes;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsArguments.js
  var argsTag = "[object Arguments]";
  function baseIsArguments(value) {
    return isObjectLike_default(value) && baseGetTag_default(value) == argsTag;
  }
  var baseIsArguments_default = baseIsArguments;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isArguments.js
  var objectProto6 = Object.prototype;
  var hasOwnProperty4 = objectProto6.hasOwnProperty;
  var propertyIsEnumerable = objectProto6.propertyIsEnumerable;
  var isArguments = baseIsArguments_default(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments_default : function(value) {
    return isObjectLike_default(value) && hasOwnProperty4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
  };
  var isArguments_default = isArguments;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/stubFalse.js
  function stubFalse() {
    return false;
  }
  var stubFalse_default = stubFalse;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isBuffer.js
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root_default.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_default;
  var isBuffer_default = isBuffer;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsTypedArray.js
  var argsTag2 = "[object Arguments]";
  var arrayTag = "[object Array]";
  var boolTag = "[object Boolean]";
  var dateTag = "[object Date]";
  var errorTag = "[object Error]";
  var funcTag2 = "[object Function]";
  var mapTag = "[object Map]";
  var numberTag = "[object Number]";
  var objectTag = "[object Object]";
  var regexpTag = "[object RegExp]";
  var setTag = "[object Set]";
  var stringTag = "[object String]";
  var weakMapTag = "[object WeakMap]";
  var arrayBufferTag = "[object ArrayBuffer]";
  var dataViewTag = "[object DataView]";
  var float32Tag = "[object Float32Array]";
  var float64Tag = "[object Float64Array]";
  var int8Tag = "[object Int8Array]";
  var int16Tag = "[object Int16Array]";
  var int32Tag = "[object Int32Array]";
  var uint8Tag = "[object Uint8Array]";
  var uint8ClampedTag = "[object Uint8ClampedArray]";
  var uint16Tag = "[object Uint16Array]";
  var uint32Tag = "[object Uint32Array]";
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag2] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag2] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike_default(value) && isLength_default(value.length) && !!typedArrayTags[baseGetTag_default(value)];
  }
  var baseIsTypedArray_default = baseIsTypedArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseUnary.js
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }
  var baseUnary_default = baseUnary;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nodeUtil.js
  var freeExports2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule2 = freeExports2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess = moduleExports2 && freeGlobal_default.process;
  var nodeUtil = (function() {
    try {
      var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  })();
  var nodeUtil_default = nodeUtil;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isTypedArray.js
  var nodeIsTypedArray = nodeUtil_default && nodeUtil_default.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary_default(nodeIsTypedArray) : baseIsTypedArray_default;
  var isTypedArray_default = isTypedArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayLikeKeys.js
  var objectProto7 = Object.prototype;
  var hasOwnProperty5 = objectProto7.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_default(value), isArg = !isArr && isArguments_default(value), isBuff = !isArr && !isArg && isBuffer_default(value), isType = !isArr && !isArg && !isBuff && isTypedArray_default(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes_default(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex_default(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var arrayLikeKeys_default = arrayLikeKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_overArg.js
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  var overArg_default = overArg;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeKeys.js
  var nativeKeys = overArg_default(Object.keys, Object);
  var nativeKeys_default = nativeKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseKeys.js
  var objectProto8 = Object.prototype;
  var hasOwnProperty6 = objectProto8.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype_default(object)) {
      return nativeKeys_default(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty6.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeys_default = baseKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/keys.js
  function keys(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object) : baseKeys_default(object);
  }
  var keys_default = keys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeKeysIn.js
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  var nativeKeysIn_default = nativeKeysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseKeysIn.js
  var objectProto9 = Object.prototype;
  var hasOwnProperty7 = objectProto9.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject_default(object)) {
      return nativeKeysIn_default(object);
    }
    var isProto = isPrototype_default(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty7.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  var baseKeysIn_default = baseKeysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/keysIn.js
  function keysIn(object) {
    return isArrayLike_default(object) ? arrayLikeKeys_default(object, true) : baseKeysIn_default(object);
  }
  var keysIn_default = keysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_nativeCreate.js
  var nativeCreate = getNative_default(Object, "create");
  var nativeCreate_default = nativeCreate;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashClear.js
  function hashClear() {
    this.__data__ = nativeCreate_default ? nativeCreate_default(null) : {};
    this.size = 0;
  }
  var hashClear_default = hashClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashDelete.js
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var hashDelete_default = hashDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashGet.js
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto10 = Object.prototype;
  var hasOwnProperty8 = objectProto10.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate_default) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty8.call(data, key) ? data[key] : void 0;
  }
  var hashGet_default = hashGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashHas.js
  var objectProto11 = Object.prototype;
  var hasOwnProperty9 = objectProto11.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate_default ? data[key] !== void 0 : hasOwnProperty9.call(data, key);
  }
  var hashHas_default = hashHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_hashSet.js
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate_default && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  var hashSet_default = hashSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Hash.js
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear_default;
  Hash.prototype["delete"] = hashDelete_default;
  Hash.prototype.get = hashGet_default;
  Hash.prototype.has = hashHas_default;
  Hash.prototype.set = hashSet_default;
  var Hash_default = Hash;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheClear.js
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  var listCacheClear_default = listCacheClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_assocIndexOf.js
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_default(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var assocIndexOf_default = assocIndexOf;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheDelete.js
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  var listCacheDelete_default = listCacheDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheGet.js
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  var listCacheGet_default = listCacheGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheHas.js
  function listCacheHas(key) {
    return assocIndexOf_default(this.__data__, key) > -1;
  }
  var listCacheHas_default = listCacheHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_listCacheSet.js
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf_default(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  var listCacheSet_default = listCacheSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_ListCache.js
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear_default;
  ListCache.prototype["delete"] = listCacheDelete_default;
  ListCache.prototype.get = listCacheGet_default;
  ListCache.prototype.has = listCacheHas_default;
  ListCache.prototype.set = listCacheSet_default;
  var ListCache_default = ListCache;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Map.js
  var Map2 = getNative_default(root_default, "Map");
  var Map_default = Map2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheClear.js
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash_default(),
      "map": new (Map_default || ListCache_default)(),
      "string": new Hash_default()
    };
  }
  var mapCacheClear_default = mapCacheClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_isKeyable.js
  function isKeyable(value) {
    var type2 = typeof value;
    return type2 == "string" || type2 == "number" || type2 == "symbol" || type2 == "boolean" ? value !== "__proto__" : value === null;
  }
  var isKeyable_default = isKeyable;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getMapData.js
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable_default(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  var getMapData_default = getMapData;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheDelete.js
  function mapCacheDelete(key) {
    var result = getMapData_default(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  var mapCacheDelete_default = mapCacheDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheGet.js
  function mapCacheGet(key) {
    return getMapData_default(this, key).get(key);
  }
  var mapCacheGet_default = mapCacheGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheHas.js
  function mapCacheHas(key) {
    return getMapData_default(this, key).has(key);
  }
  var mapCacheHas_default = mapCacheHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapCacheSet.js
  function mapCacheSet(key, value) {
    var data = getMapData_default(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  var mapCacheSet_default = mapCacheSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_MapCache.js
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear_default;
  MapCache.prototype["delete"] = mapCacheDelete_default;
  MapCache.prototype.get = mapCacheGet_default;
  MapCache.prototype.has = mapCacheHas_default;
  MapCache.prototype.set = mapCacheSet_default;
  var MapCache_default = MapCache;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayPush.js
  function arrayPush(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  var arrayPush_default = arrayPush;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getPrototype.js
  var getPrototype = overArg_default(Object.getPrototypeOf, Object);
  var getPrototype_default = getPrototype;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackClear.js
  function stackClear() {
    this.__data__ = new ListCache_default();
    this.size = 0;
  }
  var stackClear_default = stackClear;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackDelete.js
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  var stackDelete_default = stackDelete;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackGet.js
  function stackGet(key) {
    return this.__data__.get(key);
  }
  var stackGet_default = stackGet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackHas.js
  function stackHas(key) {
    return this.__data__.has(key);
  }
  var stackHas_default = stackHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_stackSet.js
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache_default) {
      var pairs = data.__data__;
      if (!Map_default || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache_default(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  var stackSet_default = stackSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Stack.js
  function Stack(entries) {
    var data = this.__data__ = new ListCache_default(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear_default;
  Stack.prototype["delete"] = stackDelete_default;
  Stack.prototype.get = stackGet_default;
  Stack.prototype.has = stackHas_default;
  Stack.prototype.set = stackSet_default;
  var Stack_default = Stack;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssign.js
  function baseAssign(object, source) {
    return object && copyObject_default(source, keys_default(source), object);
  }
  var baseAssign_default = baseAssign;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseAssignIn.js
  function baseAssignIn(object, source) {
    return object && copyObject_default(source, keysIn_default(source), object);
  }
  var baseAssignIn_default = baseAssignIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneBuffer.js
  var freeExports3 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule3 = freeExports3 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports3 = freeModule3 && freeModule3.exports === freeExports3;
  var Buffer3 = moduleExports3 ? root_default.Buffer : void 0;
  var allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  var cloneBuffer_default = cloneBuffer;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arrayFilter.js
  function arrayFilter(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  var arrayFilter_default = arrayFilter;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/stubArray.js
  function stubArray() {
    return [];
  }
  var stubArray_default = stubArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getSymbols.js
  var objectProto12 = Object.prototype;
  var propertyIsEnumerable2 = objectProto12.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray_default : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter_default(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable2.call(object, symbol);
    });
  };
  var getSymbols_default = getSymbols;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copySymbols.js
  function copySymbols(source, object) {
    return copyObject_default(source, getSymbols_default(source), object);
  }
  var copySymbols_default = copySymbols;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getSymbolsIn.js
  var nativeGetSymbols2 = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols2 ? stubArray_default : function(object) {
    var result = [];
    while (object) {
      arrayPush_default(result, getSymbols_default(object));
      object = getPrototype_default(object);
    }
    return result;
  };
  var getSymbolsIn_default = getSymbolsIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_copySymbolsIn.js
  function copySymbolsIn(source, object) {
    return copyObject_default(source, getSymbolsIn_default(source), object);
  }
  var copySymbolsIn_default = copySymbolsIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseGetAllKeys.js
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_default(object) ? result : arrayPush_default(result, symbolsFunc(object));
  }
  var baseGetAllKeys_default = baseGetAllKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getAllKeys.js
  function getAllKeys(object) {
    return baseGetAllKeys_default(object, keys_default, getSymbols_default);
  }
  var getAllKeys_default = getAllKeys;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getAllKeysIn.js
  function getAllKeysIn(object) {
    return baseGetAllKeys_default(object, keysIn_default, getSymbolsIn_default);
  }
  var getAllKeysIn_default = getAllKeysIn;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_DataView.js
  var DataView = getNative_default(root_default, "DataView");
  var DataView_default = DataView;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Promise.js
  var Promise2 = getNative_default(root_default, "Promise");
  var Promise_default = Promise2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Set.js
  var Set2 = getNative_default(root_default, "Set");
  var Set_default = Set2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_getTag.js
  var mapTag2 = "[object Map]";
  var objectTag2 = "[object Object]";
  var promiseTag = "[object Promise]";
  var setTag2 = "[object Set]";
  var weakMapTag2 = "[object WeakMap]";
  var dataViewTag2 = "[object DataView]";
  var dataViewCtorString = toSource_default(DataView_default);
  var mapCtorString = toSource_default(Map_default);
  var promiseCtorString = toSource_default(Promise_default);
  var setCtorString = toSource_default(Set_default);
  var weakMapCtorString = toSource_default(WeakMap_default);
  var getTag = baseGetTag_default;
  if (DataView_default && getTag(new DataView_default(new ArrayBuffer(1))) != dataViewTag2 || Map_default && getTag(new Map_default()) != mapTag2 || Promise_default && getTag(Promise_default.resolve()) != promiseTag || Set_default && getTag(new Set_default()) != setTag2 || WeakMap_default && getTag(new WeakMap_default()) != weakMapTag2) {
    getTag = function(value) {
      var result = baseGetTag_default(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource_default(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag2;
          case mapCtorString:
            return mapTag2;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag2;
          case weakMapCtorString:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  var getTag_default = getTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneArray.js
  var objectProto13 = Object.prototype;
  var hasOwnProperty10 = objectProto13.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty10.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  var initCloneArray_default = initCloneArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_Uint8Array.js
  var Uint8Array2 = root_default.Uint8Array;
  var Uint8Array_default = Uint8Array2;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneArrayBuffer.js
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array_default(result).set(new Uint8Array_default(arrayBuffer));
    return result;
  }
  var cloneArrayBuffer_default = cloneArrayBuffer;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneDataView.js
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var cloneDataView_default = cloneDataView;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneRegExp.js
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var cloneRegExp_default = cloneRegExp;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneSymbol.js
  var symbolProto = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  var cloneSymbol_default = cloneSymbol;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cloneTypedArray.js
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer_default(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var cloneTypedArray_default = cloneTypedArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneByTag.js
  var boolTag2 = "[object Boolean]";
  var dateTag2 = "[object Date]";
  var mapTag3 = "[object Map]";
  var numberTag2 = "[object Number]";
  var regexpTag2 = "[object RegExp]";
  var setTag3 = "[object Set]";
  var stringTag2 = "[object String]";
  var symbolTag = "[object Symbol]";
  var arrayBufferTag2 = "[object ArrayBuffer]";
  var dataViewTag3 = "[object DataView]";
  var float32Tag2 = "[object Float32Array]";
  var float64Tag2 = "[object Float64Array]";
  var int8Tag2 = "[object Int8Array]";
  var int16Tag2 = "[object Int16Array]";
  var int32Tag2 = "[object Int32Array]";
  var uint8Tag2 = "[object Uint8Array]";
  var uint8ClampedTag2 = "[object Uint8ClampedArray]";
  var uint16Tag2 = "[object Uint16Array]";
  var uint32Tag2 = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag2:
        return cloneArrayBuffer_default(object);
      case boolTag2:
      case dateTag2:
        return new Ctor(+object);
      case dataViewTag3:
        return cloneDataView_default(object, isDeep);
      case float32Tag2:
      case float64Tag2:
      case int8Tag2:
      case int16Tag2:
      case int32Tag2:
      case uint8Tag2:
      case uint8ClampedTag2:
      case uint16Tag2:
      case uint32Tag2:
        return cloneTypedArray_default(object, isDeep);
      case mapTag3:
        return new Ctor();
      case numberTag2:
      case stringTag2:
        return new Ctor(object);
      case regexpTag2:
        return cloneRegExp_default(object);
      case setTag3:
        return new Ctor();
      case symbolTag:
        return cloneSymbol_default(object);
    }
  }
  var initCloneByTag_default = initCloneByTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_initCloneObject.js
  function initCloneObject(object) {
    return typeof object.constructor == "function" && !isPrototype_default(object) ? baseCreate_default(getPrototype_default(object)) : {};
  }
  var initCloneObject_default = initCloneObject;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsMap.js
  var mapTag4 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike_default(value) && getTag_default(value) == mapTag4;
  }
  var baseIsMap_default = baseIsMap;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isMap.js
  var nodeIsMap = nodeUtil_default && nodeUtil_default.isMap;
  var isMap = nodeIsMap ? baseUnary_default(nodeIsMap) : baseIsMap_default;
  var isMap_default = isMap;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsSet.js
  var setTag4 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike_default(value) && getTag_default(value) == setTag4;
  }
  var baseIsSet_default = baseIsSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isSet.js
  var nodeIsSet = nodeUtil_default && nodeUtil_default.isSet;
  var isSet = nodeIsSet ? baseUnary_default(nodeIsSet) : baseIsSet_default;
  var isSet_default = isSet;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseClone.js
  var CLONE_DEEP_FLAG = 1;
  var CLONE_FLAT_FLAG = 2;
  var CLONE_SYMBOLS_FLAG = 4;
  var argsTag3 = "[object Arguments]";
  var arrayTag2 = "[object Array]";
  var boolTag3 = "[object Boolean]";
  var dateTag3 = "[object Date]";
  var errorTag2 = "[object Error]";
  var funcTag3 = "[object Function]";
  var genTag2 = "[object GeneratorFunction]";
  var mapTag5 = "[object Map]";
  var numberTag3 = "[object Number]";
  var objectTag3 = "[object Object]";
  var regexpTag3 = "[object RegExp]";
  var setTag5 = "[object Set]";
  var stringTag3 = "[object String]";
  var symbolTag2 = "[object Symbol]";
  var weakMapTag3 = "[object WeakMap]";
  var arrayBufferTag3 = "[object ArrayBuffer]";
  var dataViewTag4 = "[object DataView]";
  var float32Tag3 = "[object Float32Array]";
  var float64Tag3 = "[object Float64Array]";
  var int8Tag3 = "[object Int8Array]";
  var int16Tag3 = "[object Int16Array]";
  var int32Tag3 = "[object Int32Array]";
  var uint8Tag3 = "[object Uint8Array]";
  var uint8ClampedTag3 = "[object Uint8ClampedArray]";
  var uint16Tag3 = "[object Uint16Array]";
  var uint32Tag3 = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag3] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag3] = cloneableTags[dataViewTag4] = cloneableTags[boolTag3] = cloneableTags[dateTag3] = cloneableTags[float32Tag3] = cloneableTags[float64Tag3] = cloneableTags[int8Tag3] = cloneableTags[int16Tag3] = cloneableTags[int32Tag3] = cloneableTags[mapTag5] = cloneableTags[numberTag3] = cloneableTags[objectTag3] = cloneableTags[regexpTag3] = cloneableTags[setTag5] = cloneableTags[stringTag3] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag3] = cloneableTags[uint8ClampedTag3] = cloneableTags[uint16Tag3] = cloneableTags[uint32Tag3] = true;
  cloneableTags[errorTag2] = cloneableTags[funcTag3] = cloneableTags[weakMapTag3] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject_default(value)) {
      return value;
    }
    var isArr = isArray_default(value);
    if (isArr) {
      result = initCloneArray_default(value);
      if (!isDeep) {
        return copyArray_default(value, result);
      }
    } else {
      var tag = getTag_default(value), isFunc = tag == funcTag3 || tag == genTag2;
      if (isBuffer_default(value)) {
        return cloneBuffer_default(value, isDeep);
      }
      if (tag == objectTag3 || tag == argsTag3 || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject_default(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn_default(value, baseAssignIn_default(result, value)) : copySymbols_default(value, baseAssign_default(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag_default(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack_default());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet_default(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_default(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn_default : getAllKeys_default : isFlat ? keysIn_default : keys_default;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach_default(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue_default(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var baseClone_default = baseClone;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/cloneDeep.js
  var CLONE_DEEP_FLAG2 = 1;
  var CLONE_SYMBOLS_FLAG2 = 4;
  function cloneDeep(value) {
    return baseClone_default(value, CLONE_DEEP_FLAG2 | CLONE_SYMBOLS_FLAG2);
  }
  var cloneDeep_default = cloneDeep;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_setCacheAdd.js
  var HASH_UNDEFINED3 = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED3);
    return this;
  }
  var setCacheAdd_default = setCacheAdd;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_setCacheHas.js
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  var setCacheHas_default = setCacheHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_SetCache.js
  function SetCache(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache_default();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd_default;
  SetCache.prototype.has = setCacheHas_default;
  var SetCache_default = SetCache;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_arraySome.js
  function arraySome(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  var arraySome_default = arraySome;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_cacheHas.js
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  var cacheHas_default = cacheHas;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_equalArrays.js
  var COMPARE_PARTIAL_FLAG = 1;
  var COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache_default() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome_default(other, function(othValue2, othIndex) {
          if (!cacheHas_default(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  var equalArrays_default = equalArrays;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_mapToArray.js
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  var mapToArray_default = mapToArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_setToArray.js
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var setToArray_default = setToArray;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_equalByTag.js
  var COMPARE_PARTIAL_FLAG2 = 1;
  var COMPARE_UNORDERED_FLAG2 = 2;
  var boolTag4 = "[object Boolean]";
  var dateTag4 = "[object Date]";
  var errorTag3 = "[object Error]";
  var mapTag6 = "[object Map]";
  var numberTag4 = "[object Number]";
  var regexpTag4 = "[object RegExp]";
  var setTag6 = "[object Set]";
  var stringTag4 = "[object String]";
  var symbolTag3 = "[object Symbol]";
  var arrayBufferTag4 = "[object ArrayBuffer]";
  var dataViewTag5 = "[object DataView]";
  var symbolProto2 = Symbol_default ? Symbol_default.prototype : void 0;
  var symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag5:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag4:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array_default(object), new Uint8Array_default(other))) {
          return false;
        }
        return true;
      case boolTag4:
      case dateTag4:
      case numberTag4:
        return eq_default(+object, +other);
      case errorTag3:
        return object.name == other.name && object.message == other.message;
      case regexpTag4:
      case stringTag4:
        return object == other + "";
      case mapTag6:
        var convert = mapToArray_default;
      case setTag6:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
        convert || (convert = setToArray_default);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG2;
        stack.set(object, other);
        var result = equalArrays_default(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag3:
        if (symbolValueOf2) {
          return symbolValueOf2.call(object) == symbolValueOf2.call(other);
        }
    }
    return false;
  }
  var equalByTag_default = equalByTag;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_equalObjects.js
  var COMPARE_PARTIAL_FLAG3 = 1;
  var objectProto14 = Object.prototype;
  var hasOwnProperty11 = objectProto14.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG3, objProps = getAllKeys_default(object), objLength = objProps.length, othProps = getAllKeys_default(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty11.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  var equalObjects_default = equalObjects;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsEqualDeep.js
  var COMPARE_PARTIAL_FLAG4 = 1;
  var argsTag4 = "[object Arguments]";
  var arrayTag3 = "[object Array]";
  var objectTag4 = "[object Object]";
  var objectProto15 = Object.prototype;
  var hasOwnProperty12 = objectProto15.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray_default(object), othIsArr = isArray_default(other), objTag = objIsArr ? arrayTag3 : getTag_default(object), othTag = othIsArr ? arrayTag3 : getTag_default(other);
    objTag = objTag == argsTag4 ? objectTag4 : objTag;
    othTag = othTag == argsTag4 ? objectTag4 : othTag;
    var objIsObj = objTag == objectTag4, othIsObj = othTag == objectTag4, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer_default(object)) {
      if (!isBuffer_default(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack_default());
      return objIsArr || isTypedArray_default(object) ? equalArrays_default(object, other, bitmask, customizer, equalFunc, stack) : equalByTag_default(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG4)) {
      var objIsWrapped = objIsObj && hasOwnProperty12.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty12.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack_default());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack_default());
    return equalObjects_default(object, other, bitmask, customizer, equalFunc, stack);
  }
  var baseIsEqualDeep_default = baseIsEqualDeep;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/_baseIsEqual.js
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike_default(value) && !isObjectLike_default(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep_default(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  var baseIsEqual_default = baseIsEqual;

  // node_modules/.pnpm/lodash-es@4.18.1/node_modules/lodash-es/isEqual.js
  function isEqual(value, other) {
    return baseIsEqual_default(value, other);
  }
  var isEqual_default = isEqual;

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/wardrobe.js
  var AppearanceComparer = class {
    seedsCache = /* @__PURE__ */ new Map();
    getSeed(arr) {
      const normalized = normalizeObject(ServerAppearanceBundle(arr));
      const key = JSON.stringify(normalized);
      if (!this.seedsCache.has(key)) {
        this.seedsCache.set(key, this.generateSeed(key));
      }
      return this.seedsCache.get(key);
    }
    generateSeed(str) {
      let seed = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        seed = (seed << 5) - seed + char;
        seed = seed & seed;
      }
      return seed;
    }
    compare(arr1, arr2) {
      return this.getSeed(arr1) === this.getSeed(arr2);
    }
    getDifference(arr1, arr2) {
      const diff = {
        added: [],
        modified: [],
        removed: []
      };
      if (this.compare(arr1, arr2)) return diff;
      const diffMap = ServerBuildAppearanceDiff("Female3DCG", arr1, ServerAppearanceBundle(arr2));
      for (const [group, diffResult] of Object.entries(diffMap)) {
        if (diffResult[0] === null && diffResult[1] !== null) {
          diff.added.push(diffResult[1].Asset.Description);
          continue;
        }
        if (diffResult[0] !== null && diffResult[1] === null) {
          diff.removed.push(diffResult[0].Asset.Description);
          continue;
        }
        if (diffResult[0].Asset.Name !== diffResult[1].Asset.Name) {
          diff.removed.push(diffResult[0].Asset.Description);
          diff.added.push(diffResult[1].Asset.Description);
          continue;
        }
        if (!this.compare([diffResult[0]], [diffResult[1]])) diff.modified.push(diffResult[0].Asset.Description);
      }
      return diff;
    }
  };
  var appearanceComparer = new AppearanceComparer();
  function smartGetItemName(item) {
    if (item?.Craft?.Name) return item.Craft.Name;
    return item?.Asset?.Description;
  }

  // src/subscreens/deviousPadlockSettingsSubscreen.ts
  var basePadlockNames = {
    ["ExclusivePadlock" /* EXCLUSIVE */]: () => getText("settings.devious_padlock_editor.base_padlocks.exclusive_padlock"),
    ["LoversPadlock" /* LOVERS */]: () => getText("settings.devious_padlock_editor.base_padlocks.lovers_padlock"),
    ["OwnerPadlock" /* OWNER */]: () => getText("settings.devious_padlock_editor.base_padlocks.owner_padlock")
  };
  var minimumRolesNames = {
    [0 /* EVERYONE_EXCEPT_WEARER */]: () => getText("common.minimum_roles.public"),
    [4 /* FRIEND */]: () => getText("common.minimum_roles.friend"),
    [5 /* WHITELIST */]: () => getText("common.minimum_roles.whitelist"),
    [1 /* FAMILY */]: () => getText("common.minimum_roles.family"),
    [2 /* LOVER */]: () => getText("common.minimum_roles.lover"),
    [3 /* OWNER */]: () => getText("common.minimum_roles.owner")
  };
  var DeviousPadlockSettingsSubscreen = class extends BaseSubscreen {
    get name() {
      return "";
    }
    padlockSettings;
    sourcePadlockSettings;
    combinationToUnlock;
    combinationToLock;
    target;
    itemGroupName;
    pincodeCombinationInputs = [];
    syncTabCanvasCharacter;
    saveButtonElement;
    zoneNamesToSync = [];
    syncingSelectedProfile;
    syncingSelectedProfileName;
    mode;
    currentSyncConfigName;
    generalKeyDownListener = null;
    syncingClickListener = null;
    canEdit = () => this.itemGroupName === void 0 || hasKeyToPadlock(this.itemGroupName, Player, this.target) || this.combinationToUnlock.isCorrect;
    generalKeyDown(e) {
      if (this.pincodeCombinationInputs.length === 0) return;
      if (e.key === "Backspace") {
        const t = this.pincodeCombinationInputs.toReversed().find((w) => w.value !== "");
        if (t) {
          t.value = "";
          t.focus();
        }
        return e.preventDefault();
      }
      const emptyInput = this.pincodeCombinationInputs.find((w) => w.value === "");
      if (emptyInput) emptyInput.focus();
    }
    syncingClick(e) {
      for (const group of AssetGroup) {
        if (!Array.isArray(group.Zone)) continue;
        const groupItem = InventoryGet(this.target, group.Name);
        if (!groupItem) continue;
        if (!group.IsItem()) continue;
        if (!isDeviousLock(groupItem)) continue;
        if (!hasKeyToPadlock(group.Name, Player, this.target)) continue;
        if (DialogClickedInZone(this.syncTabCanvasCharacter, group.Zone[0], 0.8, 1550, 160, this.syncTabCanvasCharacter.HeightRatio)) {
          if (this.zoneNamesToSync.includes(group.Name)) this.zoneNamesToSync.splice(this.zoneNamesToSync.indexOf(group.Name), 1);
          else this.zoneNamesToSync.push(group.Name);
        }
      }
    }
    async checkCombination(combinationElement) {
      if (Array.isArray(combinationElement)) {
        this.combinationToUnlock.value = combinationElement.map((e) => e.value).join("");
      } else this.combinationToUnlock.value = combinationElement.value;
      this.combinationToUnlock.isCorrect = await hashCombination(this.combinationToUnlock.value) === this.padlockSettings.combination?.hash;
      if (this.combinationToUnlock.isCorrect) {
        if (Array.isArray(combinationElement)) combinationElement.forEach((e) => e.style.setProperty("border-color", "green", "important"));
        else combinationElement.style.setProperty("border-color", "green", "important");
        toastsManager.success({
          message: getText("toasts.correct_combination"),
          duration: 3e3
        });
      } else {
        if (Array.isArray(combinationElement)) {
          combinationElement.forEach((e) => {
            e.style.setProperty("border-color", "red", "important");
            setTimeout(() => e.value = "", 500);
          });
          combinationElement[0].focus();
        } else {
          combinationElement.style.setProperty("border-color", "red", "important");
        }
      }
      document.querySelectorAll("button").forEach((b) => b.textContent === getText("common.save") && b.classList.toggle("zcDisabled", !this.canEdit()));
      document.querySelectorAll("button").forEach((b) => b.textContent === getText("settings.devious_padlock_editor.remove_padlock") && b.classList.toggle("zcDisabled", !this.combinationToUnlock.isCorrect));
    }
    constructor(args) {
      super();
      this.mode = args.mode;
      switch (args.mode) {
        case "inspect-padlock": {
          this.itemGroupName = args.itemGroup.Name;
          this.target = args.target;
          this.padlockSettings = cloneDeep_default(getPadlockSettings(args.target, args.itemGroup.Name));
          this.sourcePadlockSettings = cloneDeep_default(this.padlockSettings);
          this.combinationToLock = {
            value: "",
            type: "password",
            wasChanged: false
          };
          break;
        }
        case "edit-sync-config": {
          this.padlockSettings = cloneDeep_default({
            ...args.syncConfig,
            combination: {
              ...args.syncConfig.combination,
              hash: ""
            },
            item: null,
            name: void 0,
            owner: Player.MemberNumber
          });
          this.combinationToLock = {
            value: args.syncConfig.combination?.value ?? "",
            type: args.syncConfig.combination?.type ?? "password",
            wasChanged: false
          };
          this.currentSyncConfigName = args.syncConfig.name;
          break;
        }
        default: {
          logger.error(`Unknown subscreen mode`);
        }
      }
      this.padlockSettings.minimumRole ??= 0 /* EVERYONE_EXCEPT_WEARER */;
      this.padlockSettings.memberNumbers ??= [];
      this.padlockSettings.preventCheatCommands ??= false;
      this.padlockSettings.baseLock ??= "ExclusivePadlock" /* EXCLUSIVE */;
      this.padlockSettings.note ??= "";
      this.combinationToUnlock = {
        value: "",
        isCorrect: null
      };
    }
    onLoad() {
      this.syncTabCanvasCharacter = CharacterCreate(Player.AssetFamily, CharacterType.NPC, "LC_CanvasCharacter");
      ServerAppearanceLoadFromBundle(
        this.syncTabCanvasCharacter,
        this.syncTabCanvasCharacter.AssetFamily,
        ServerAppearanceBundle(this.mode === "inspect-padlock" ? this.target.Appearance : Player.Appearance)
      );
      CharacterRefresh(this.syncTabCanvasCharacter);
      this.saveButtonElement = this.createButton({
        anchor: "bottom-right",
        x: 80,
        y: 50,
        width: 400,
        padding: 4,
        variant: "filled",
        text: getText("common.save"),
        isDisabled: () => !this.canEdit(),
        onClick: async () => {
          if (this.mode === "inspect-padlock") {
            const updateConfig = {
              ...this.padlockSettings,
              combinationToUnlock: this.combinationToUnlock.value ?? void 0,
              combinationToLock: this.combinationToLock.wasChanged ? {
                type: this.combinationToLock.type,
                value: this.combinationToLock.value
              } : void 0
            };
            if (this.target.IsPlayer()) {
              const result = await validatePadlockSettingsUpdate(Player, updateConfig, this.itemGroupName);
              if (result.valid) {
                await changePadlockSettings(this.itemGroupName, result.data);
                const itemName = smartGetItemName(InventoryGet(Player, this.itemGroupName));
                messagesManager.sendAction(
                  `${getNickname(Player)} changed devious padlock's configurations on <possessive> ${itemName}`
                );
              }
            } else {
              messagesManager.sendPacket("changePadlockSettings", {
                groupName: this.itemGroupName,
                config: updateConfig
              }, this.target.MemberNumber);
            }
          } else {
            const { item, owner, combination, ...rest } = this.padlockSettings;
            const profile = {
              ...rest,
              name: this.currentSyncConfigName,
              combination: {
                type: this.combinationToLock.type,
                value: this.combinationToLock.value
              }
            };
            const configIndex = (modStorage.deviousPadlock.profiles ?? []).findIndex((c) => c.name === this.currentSyncConfigName);
            if (configIndex === -1) {
              modStorage.deviousPadlock.profiles?.push(profile);
            } else {
              modStorage.deviousPadlock.profiles[configIndex] = profile;
            }
            syncStorage();
            toastsManager.success({
              message: getText("toasts.profile_saved"),
              duration: 3e3
            });
          }
          this.exit();
        }
      });
      this.createTabs({
        x: 65,
        y: 60,
        width: 1725,
        tabs: [
          {
            name: getText("settings.devious_padlock_editor.tabs.general"),
            load: () => {
              this.generalKeyDownListener = this.generalKeyDown.bind(this);
              window.addEventListener("keydown", this.generalKeyDownListener);
              this.createText({
                text: getText("settings.devious_padlock_editor.protected_from_cheats"),
                x: 100,
                y: 200,
                width: 500,
                withBackground: true,
                color: "red",
                padding: 2
              }).style.textAlign = "center";
              this.createText({
                text: getText("settings.devious_padlock_editor.member_number_on_padlock") + " " + this.padlockSettings.owner,
                width: 800,
                x: 100,
                y: 400
              });
              this.createText({
                x: 100,
                y: 480,
                text: getText("settings.devious_padlock_editor.padlock_can_be_unlocked")
              }).style.fontWeight = "bold";
              this.createText({
                x: 140,
                y: 540,
                width: 800,
                text: getText("settings.devious_padlock_editor.unlock_by_key_note")
              });
              this.createText({
                x: 140,
                y: 730,
                width: 800,
                text: getText("settings.devious_padlock_editor.unlock_by_timer_note")
              });
              this.createText({
                x: 140,
                y: 830,
                width: 800,
                text: getText("settings.devious_padlock_editor.unlock_by_code_note")
              });
              if (this.mode === "inspect-padlock") {
                this.createButton({
                  icon: "Icons/Copy.png",
                  anchor: "bottom-right",
                  x: 80,
                  y: 210,
                  width: 90,
                  height: 90,
                  tooltip: {
                    text: getText("tooltips.export_profile"),
                    position: "left"
                  },
                  onClick: async () => {
                    const result = await dialogsManager.prompt({
                      message: getText("dialogs.name_of_profile")
                    });
                    if (result === false || result.trim() === "") return;
                    modStorage.deviousPadlock.profiles ??= [];
                    const configIndex = modStorage.deviousPadlock.profiles.findIndex((c) => c.name === result);
                    if (configIndex !== -1 && await dialogsManager.confirm({ message: getText("dialogs.confirm_profile_overwriting") }) === false) return;
                    const { owner, item, combination, ...rest } = cloneDeep_default(this.padlockSettings);
                    const syncConfig = {
                      name: result,
                      ...rest
                    };
                    if (configIndex === -1) {
                      modStorage.deviousPadlock.profiles.push(syncConfig);
                    } else {
                      modStorage.deviousPadlock.profiles[configIndex] = syncConfig;
                    }
                    syncStorage();
                  }
                });
              }
              if (this.mode === "inspect-padlock" && typeof this.padlockSettings.combination?.hash === "string") {
                this.createText({
                  text: getText("settings.devious_padlock_editor.enter_combination"),
                  anchor: "top-right",
                  x: 400,
                  y: 220,
                  width: 400
                });
                if (this.padlockSettings.combination.type === "password") {
                  const combination = this.createInput({
                    anchor: "top-right",
                    x: 400,
                    y: 280,
                    width: 400,
                    padding: 2,
                    placeholder: this.padlockSettings.combination.type === "password" ? getText("settings.devious_padlock_editor.password_placeholder") : getText("settings.devious_padlock_editor.pin_placeholder"),
                    value: this.combinationToUnlock.value,
                    onInput: () => this.checkCombination(combination)
                  });
                } else {
                  this.pincodeCombinationInputs = [];
                  for (let i = 0; i < 6; i++) {
                    const input = this.createInput({
                      anchor: "top-right",
                      x: 700 - i * 90,
                      y: 320,
                      padding: 1,
                      width: 60,
                      height: 80,
                      value: this.combinationToUnlock.value[i] ?? "",
                      onInput: () => {
                        if (input.value === "") return this.pincodeCombinationInputs[i - 1 === -1 ? 0 : i - 1].focus();
                        if (!Number.isInteger(parseInt(input.value))) return input.value = "";
                        if (input.value.length > 1) return input.value = input.value[0];
                        const emptyInput = this.pincodeCombinationInputs.find((w) => w.value === "");
                        if (emptyInput) {
                          emptyInput.focus();
                        } else {
                          this.checkCombination(this.pincodeCombinationInputs);
                        }
                      }
                    });
                    input.setAttribute("maxlength", 1);
                    this.pincodeCombinationInputs.push(input);
                  }
                }
                this.createButton({
                  text: getText("settings.devious_padlock_editor.remove_padlock"),
                  anchor: "top-right",
                  x: 400,
                  y: 450,
                  padding: 2,
                  isDisabled: () => !this.combinationToUnlock.isCorrect,
                  onClick: async () => {
                    const confirmation = await dialogsManager.confirm({
                      message: getText("dialogs.confirm_padlock_removing")
                    });
                    if (!confirmation) return;
                    if (this.target.IsPlayer()) {
                      if (this.combinationToUnlock.isCorrect) {
                        const itemName = smartGetItemName(InventoryGet(Player, this.itemGroupName));
                        delete modStorage.deviousPadlock.itemGroups[this.itemGroupName];
                        unsyncItemGroups([this.itemGroupName], false);
                        InventoryUnlock(Player, this.itemGroupName);
                        ChatRoomCharacterUpdate(Player);
                        syncStorage();
                        messagesManager.sendAction(
                          `${getNickname(Player)} entered the correct combination and devious padlock was unlocked on <possessive> ${itemName}`
                        );
                        this.exit();
                      }
                    } else {
                      messagesManager.sendPacket("removePadlock", {
                        groupName: this.itemGroupName,
                        combination: this.combinationToUnlock.value
                      }, this.target.MemberNumber);
                      this.exit();
                    }
                  }
                });
              }
              if (this.padlockSettings.unlockTime) {
                this.createText({
                  text: `${getText("settings.devious_padlock_editor.timer_expires_at")} ${new Date(this.padlockSettings.unlockTime).toUTCString()}`,
                  x: 1200,
                  y: 600,
                  width: 650
                });
              }
            },
            unload: () => {
              if (this.generalKeyDownListener) window.removeEventListener("keydown", this.generalKeyDownListener);
            }
          },
          {
            name: getText("settings.devious_padlock_editor.tabs.locking"),
            run: () => {
              this.drawPolylineArrow({
                points: [
                  {
                    x: 1500,
                    y: 540
                  },
                  {
                    x: 800,
                    y: 540
                  }
                ]
              });
              this.drawPolylineArrow({
                points: [
                  {
                    x: 1700,
                    y: 500
                  },
                  {
                    x: 1700,
                    y: 430
                  }
                ]
              });
              this.drawPolylineArrow({
                points: [
                  {
                    x: 950,
                    y: 900
                  },
                  {
                    x: 800,
                    y: 900
                  }
                ]
              });
            },
            load: () => {
              this.createText({
                text: getText("settings.devious_padlock_editor.combination"),
                width: 850,
                x: 100,
                y: 220,
                withBackground: true,
                padding: 2
              });
              const combinationTypeBtn = this.createButton({
                text: `${getText("settings.devious_padlock_editor.type_label")} ${this.combinationToLock.type === "password" ? getText("settings.devious_padlock_editor.password_placeholder") : getText("settings.devious_padlock_editor.pin_placeholder")}`,
                width: 850,
                x: 100,
                y: 325,
                padding: 2,
                isDisabled: () => !this.canEdit(),
                onClick: () => {
                  this.combinationToLock.type = this.combinationToLock.type === "password" ? "PIN-Code" : "password";
                  combinationTypeBtn.textContent = `${getText("settings.devious_padlock_editor.type_label")} ${this.combinationToLock.type === "password" ? getText("settings.devious_padlock_editor.password_placeholder") : getText("settings.devious_padlock_editor.pin_placeholder")}`;
                  combination.setAttribute("maxlength", this.combinationToLock.type === "password" ? "25" : "6");
                  combination.setAttribute("minlength", this.combinationToLock.type === "password" ? "1" : "6");
                }
              });
              const combination = this.createInput({
                placeholder: getText("settings.devious_padlock_editor.combination_placeholder"),
                x: 100,
                y: 435,
                width: 850,
                padding: 2,
                value: this.combinationToLock.value,
                isDisabled: () => !this.canEdit(),
                onInput: () => {
                  if (this.combinationToLock.type === "PIN-Code" && Number.isNaN(parseInt(combination.value.slice(-1)))) return combination.value = combination.value.slice(0, -1);
                  this.combinationToLock.value = combination.value;
                  this.combinationToLock.wasChanged = true;
                }
              });
              combination.setAttribute("maxlength", this.combinationToLock.type === "password" ? "25" : "6");
              combination.setAttribute("minlength", this.combinationToLock.type === "password" ? "1" : "6");
              this.createButton({
                text: getText("common.reset"),
                x: 100,
                y: 540,
                padding: 2,
                isDisabled: () => !this.canEdit(),
                onClick: () => {
                  toastsManager.success({
                    message: getText("toasts.combination_reset"),
                    duration: 3500
                  });
                  this.combinationToLock.value = "";
                  this.combinationToLock.wasChanged = true;
                  combination.value = "";
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.unlock_time"),
                x: 1050,
                y: 220,
                width: 850,
                withBackground: true,
                padding: 2
              });
              let unlockTimeValue = "";
              if (this.padlockSettings.unlockTime) {
                const utcUnlockTime = new Date(this.padlockSettings.unlockTime);
                const localUnlockTime = new Date(utcUnlockTime.getTime() - utcUnlockTime.getTimezoneOffset() * 6e4);
                unlockTimeValue = localUnlockTime.toISOString().slice(0, 16);
              }
              const unlockTime = this.createInput({
                x: 1050,
                y: 325,
                width: 850,
                padding: 2,
                placeholder: getText("settings.devious_padlock_editor.time_placeholder"),
                value: unlockTimeValue,
                onChange: () => {
                  this.padlockSettings.unlockTime = new Date(unlockTime.value).toISOString();
                },
                isDisabled: () => !this.canEdit()
              });
              unlockTime.setAttribute("type", "datetime-local");
              this.createButton({
                text: getText("common.reset"),
                x: 1050,
                y: 430,
                padding: 2,
                isDisabled: () => !this.canEdit(),
                onClick: () => {
                  toastsManager.success({
                    message: getText("toasts.timer_reset"),
                    duration: 3500
                  });
                  this.padlockSettings.unlockTime = "";
                  unlockTime.value = "";
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.base_lock"),
                x: 100,
                y: 660,
                width: 850,
                withBackground: true,
                padding: 2
              });
              this.createBackNextButton({
                x: 100,
                y: 780,
                width: 850,
                height: 80,
                currentIndex: Object.values(BasePadlock).indexOf(this.padlockSettings.baseLock),
                items: Object.values(BasePadlock).map((r) => [basePadlockNames[r](), r]),
                onChange: (value) => {
                  this.padlockSettings.baseLock = value;
                  this.padlockSettings.minimumRole = basePadlockMinimumRole(value, this.padlockSettings.minimumRole);
                  if (value !== "ExclusivePadlock" /* EXCLUSIVE */) this.padlockSettings.memberNumbers = [];
                },
                isDisabled: (value) => {
                  if (this.mode === "edit-sync-config") return false;
                  return !this.canEdit() || !canUseBasePadlock(Player, this.target, this.padlockSettings.owner, value);
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.additional_unlock_methods"),
                x: 80,
                y: 210,
                width: 400,
                height: 265,
                anchor: "bottom-right",
                withBackground: true,
                padding: 2
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.base_lock_description"),
                x: 510,
                y: 75,
                width: 510,
                height: 350,
                fontSize: 3,
                anchor: "bottom-right",
                withBackground: true,
                padding: 2
              });
            }
          },
          {
            name: getText("settings.devious_padlock_editor.tabs.key_holders"),
            load: () => {
              this.createText({
                text: getText("settings.devious_padlock_editor.minimum_role"),
                x: 100,
                y: 200,
                width: 800
              }).style.textAlign = "center";
              this.createBackNextButton({
                x: 100,
                y: 260,
                width: 800,
                height: 80,
                currentIndex: Object.values(KeyHolderMinimumRole).slice(Object.values(KeyHolderMinimumRole).length / 2).indexOf(this.padlockSettings.minimumRole),
                items: Object.values(KeyHolderMinimumRole).slice(Object.values(KeyHolderMinimumRole).length / 2).map((r) => [minimumRolesNames[r](), r]),
                onChange: (value) => this.padlockSettings.minimumRole = value,
                isDisabled: (value) => {
                  if (this.mode === "edit-sync-config") return false;
                  return !this.canEdit() || !canSetKeyHolderMinimumRole(Player, this.target, value) || !!this.padlockSettings.baseLock && basePadlockMinimumRole(this.padlockSettings.baseLock, value) !== value;
                }
              });
              this.createInputList({
                title: getText("settings.devious_padlock_editor.member_numbers"),
                x: 100,
                y: 425,
                width: 800,
                height: 500,
                value: this.padlockSettings.memberNumbers,
                numbersOnly: true,
                isDisabled: () => !this.canEdit() || this.padlockSettings.baseLock !== "ExclusivePadlock" /* EXCLUSIVE */,
                onChange: (value) => {
                  this.padlockSettings.memberNumbers = value.map((v) => typeof v === "string" ? CommonParseInt(v) : v).filter((v) => v !== null);
                }
              });
              this.createText({
                x: 1200,
                y: 210,
                width: 700,
                height: 200,
                text: getText("settings.devious_padlock_editor.minimum_role_description"),
                withBackground: true,
                padding: 2
              });
              this.createText({
                x: 1e3,
                y: 450,
                width: 900,
                height: 175,
                text: getText("settings.devious_padlock_editor.member_numbers_description"),
                withBackground: true,
                padding: 2
              });
            },
            run: () => {
              this.drawPolylineArrow({
                points: [
                  {
                    x: 1180,
                    y: 350
                  },
                  {
                    x: 1100,
                    y: 350
                  },
                  {
                    x: 1100,
                    y: 280
                  },
                  {
                    x: 925,
                    y: 280
                  }
                ]
              });
              this.drawPolylineArrow({
                points: [
                  {
                    x: 1450,
                    y: 650
                  },
                  {
                    x: 1450,
                    y: 800
                  },
                  {
                    x: 925,
                    y: 800
                  }
                ]
              });
            }
          },
          {
            name: getText("settings.devious_padlock_editor.tabs.note"),
            load: () => {
              const note = this.createInput({
                x: 200,
                y: 200,
                width: 1600,
                height: 600,
                textArea: true,
                value: this.padlockSettings.note,
                placeholder: getText("settings.devious_padlock_editor.note_placeholder"),
                isDisabled: () => !this.canEdit(),
                onChange: () => {
                  this.padlockSettings.note = note.value;
                }
              });
            }
          },
          {
            name: getText("settings.devious_padlock_editor.tabs.advanced"),
            load: () => {
              this.createCheckbox({
                text: getText("settings.devious_padlock_editor.prevent_cheat_commands"),
                x: 100,
                y: 200,
                width: 800,
                isChecked: this.padlockSettings.preventCheatCommands,
                isDisabled: () => !this.canEdit(),
                onChange: () => {
                  this.padlockSettings.preventCheatCommands = !this.padlockSettings.preventCheatCommands;
                }
              });
            }
          },
          this.mode === "inspect-padlock" && {
            name: getText("settings.devious_padlock_editor.tabs.syncing"),
            run: async () => {
              DrawCharacter(this.syncTabCanvasCharacter, 1550, 125, 0.85, true);
              for (const group of AssetGroup) {
                if (!Array.isArray(group.Zone)) continue;
                const groupItem = InventoryGet(this.target, group.Name);
                if (!groupItem) continue;
                if (!group.IsItem()) continue;
                if (!isDeviousLock(groupItem)) continue;
                let borderColor;
                let fillColor;
                if (hasKeyToPadlock(group.Name, Player, this.target) && (this.syncingSelectedProfile.padlockSettings.baseLock === void 0 || canUseBasePadlock(Player, this.target, this.padlockSettings.owner, this.syncingSelectedProfile.padlockSettings.baseLock)) && (this.syncingSelectedProfile.padlockSettings.minimumRole === void 0 || canSetKeyHolderMinimumRole(Player, this.target, this.syncingSelectedProfile.padlockSettings.minimumRole))) {
                  if (this.zoneNamesToSync.includes(group.Name)) {
                    borderColor = "#00C9D5" /* TO_SYNC */;
                    fillColor = "#a2faff3f" /* TO_SYNC */;
                  } else {
                    borderColor = "#00FF7F" /* CAN_BE_SYNCED */;
                    fillColor = "#99ffcc50" /* CAN_BE_SYNCED */;
                  }
                  ;
                } else {
                  borderColor = "#ff0000ff" /* LIMITED */;
                  fillColor = "#ff00002a" /* LIMITED */;
                }
                if (isItemGroupSyncedWithConfig(this.target, group.Name, this.syncingSelectedProfile.padlockSettings)) {
                  borderColor = "#0066ffff" /* SYNCED */;
                  fillColor = "#0066ff2a" /* SYNCED */;
                }
                DrawAssetGroupZone(this.syncTabCanvasCharacter, group.Zone, 0.85, 1550, 125, this.syncTabCanvasCharacter.HeightRatio, borderColor, group.Name === this.itemGroupName ? 3 + Math.sin(Date.now() / 200) * 0.85 : 2.5, fillColor);
              }
            },
            load: () => {
              this.syncingClickListener = this.syncingClick.bind(this);
              window.addEventListener("click", this.syncingClickListener);
              this.saveButtonElement.style.display = "none";
              this.syncingSelectedProfileName = getText("settings.devious_padlock_editor.current_config");
              const { item, owner, ...rest } = this.padlockSettings;
              this.syncingSelectedProfile ??= {};
              this.syncingSelectedProfile.padlockSettings = cloneDeep_default(rest);
              this.createContainer({
                x: 1250,
                y: 220,
                width: 30,
                height: 30,
                modules: {
                  base: [
                    new StyleModule({
                      background: "#00FF7F" /* CAN_BE_SYNCED */,
                      border: "1px solid black"
                    })
                  ]
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.zones_you_can_sync"),
                x: 1300,
                y: 220,
                fontSize: 2.5,
                width: 280,
                height: 60
              });
              this.createContainer({
                x: 1250,
                y: 300,
                width: 30,
                height: 30,
                modules: {
                  base: [
                    new StyleModule({
                      background: "#ff0000ff" /* LIMITED */,
                      border: "1px solid black"
                    })
                  ]
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.zones_you_cant_sync"),
                x: 1300,
                y: 300,
                fontSize: 2.5,
                width: 280,
                height: 90
              });
              this.createContainer({
                x: 1250,
                y: 400,
                width: 30,
                height: 30,
                modules: {
                  base: [
                    new StyleModule({
                      background: "#00C9D5" /* TO_SYNC */,
                      border: "1px solid black"
                    })
                  ]
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.zones_to_sync"),
                x: 1300,
                y: 400,
                fontSize: 2.5,
                width: 280,
                height: 60
              });
              this.createContainer({
                x: 1250,
                y: 480,
                width: 30,
                height: 30,
                modules: {
                  base: [
                    new StyleModule({
                      background: "#0066ffff" /* SYNCED */,
                      border: "1px solid black"
                    })
                  ]
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.zones_already_synced"),
                x: 1300,
                y: 480,
                fontSize: 2.5,
                width: 280,
                height: 60
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.profile_heading"),
                x: 200,
                y: 220,
                width: 600,
                withBackground: true,
                padding: 2
              });
              this.createSelect({
                x: 200,
                y: 325,
                width: 600,
                options: [
                  {
                    name: getText("settings.devious_padlock_editor.current_config"),
                    text: getText("settings.devious_padlock_editor.current_config_description")
                  },
                  ...modStorage.deviousPadlock.profiles?.map((c) => ({
                    name: c.name,
                    text: c.name
                  })) ?? []
                ],
                onChange: async (configName) => {
                  if (configName === getText("settings.devious_padlock_editor.current_config") || configName === "Current Config") {
                    const { item: item2, owner: owner2, ...rest3 } = this.padlockSettings;
                    this.syncingSelectedProfile.padlockSettings = rest3;
                    this.syncingSelectedProfileName = configName;
                    return;
                  }
                  const profile = modStorage.deviousPadlock.profiles?.find((c) => c.name === configName);
                  if (!profile) return;
                  const { name, combination, ...rest2 } = profile;
                  let settings = {};
                  settings = cloneDeep_default(rest2);
                  if (combination) {
                    settings.combination = {
                      type: combination.type,
                      hash: await hashCombination(combination.value)
                    };
                  }
                  this.syncingSelectedProfile.padlockSettings = settings;
                  this.syncingSelectedProfile.settings = profile;
                  this.syncingSelectedProfileName = configName;
                },
                currentOption: this.syncingSelectedProfileName
              });
              this.createButton({
                text: getText("settings.devious_padlock_editor.sync_padlocks"),
                x: 200,
                y: 815,
                padding: 2,
                onClick: async () => {
                  if (this.zoneNamesToSync.length === 0) return;
                  const { combination, ...rest2 } = this.syncingSelectedProfile.padlockSettings;
                  const config = rest2;
                  if (this.syncingSelectedProfile.settings?.combination) {
                    config.combinationToLock = {
                      type: this.syncingSelectedProfile.settings.combination.type,
                      value: this.syncingSelectedProfile.settings.combination.value
                    };
                  }
                  if (!this.syncingSelectedProfile.settings && this.combinationToLock.wasChanged) {
                    config.combinationToLock = {
                      type: this.combinationToLock.type,
                      value: this.combinationToLock.value
                    };
                  }
                  if (this.target.IsPlayer()) {
                    syncPadlockConfigurationWithItemGroups(this.zoneNamesToSync, this.syncingSelectedProfile.padlockSettings);
                  } else {
                    messagesManager.sendPacket("syncPadlockConfigurations", {
                      groupNames: this.zoneNamesToSync,
                      settings: config
                    });
                  }
                  this.exit();
                  toastsManager.success({
                    message: getText("toasts.profile_applied"),
                    duration: 3e3
                  });
                }
              });
              this.createText({
                text: getText("settings.devious_padlock_editor.sync_description"),
                x: 200,
                y: 450,
                width: 800,
                withBorder: true,
                padding: 2
              });
            },
            unload: () => {
              if (this.syncingClickListener) window.removeEventListener("click", this.syncingClickListener);
              this.saveButtonElement.style.display = "";
            }
          }
        ].filter((t) => !!t),
        currentTabName: getText("settings.devious_padlock_editor.tabs.general")
      });
    }
    onExit() {
      if (this.mode === "inspect-padlock") {
        if (ChatRoomData !== null) CommonSetScreen("Online", "ChatRoom");
        else CommonSetScreen("Room", "MainHall");
      }
    }
  };

  // src/modules/remoteControl.ts
  var remoteControlIsInteracting = false;
  var setRemoteControlIsInteracting = (value) => remoteControlIsInteracting = value;
  var remoteControlControllers = [];
  var RemoteConnectMinimumRole = /* @__PURE__ */ ((RemoteConnectMinimumRole2) => {
    RemoteConnectMinimumRole2[RemoteConnectMinimumRole2["FRIEND"] = 0] = "FRIEND";
    RemoteConnectMinimumRole2[RemoteConnectMinimumRole2["WHITELIST"] = 1] = "WHITELIST";
    RemoteConnectMinimumRole2[RemoteConnectMinimumRole2["LOVER"] = 2] = "LOVER";
    RemoteConnectMinimumRole2[RemoteConnectMinimumRole2["OWNER"] = 3] = "OWNER";
    return RemoteConnectMinimumRole2;
  })(RemoteConnectMinimumRole || {});
  function hasPermissionForRemoteControl(targetId) {
    if (!modStorage.remoteControl.state) return false;
    if (modStorage.remoteControl.connectMinimumRole === 1 /* WHITELIST */) {
      return Player.IsLoverOfMemberNumber(targetId) || Player.IsOwnedByMemberNumber(targetId) || Player.WhiteList.includes(targetId);
    }
    if (modStorage.remoteControl.connectMinimumRole === 2 /* LOVER */) {
      return Player.IsLoverOfMemberNumber(targetId) || Player.IsOwnedByMemberNumber(targetId);
    }
    if (modStorage.remoteControl.connectMinimumRole === 3 /* OWNER */) {
      return Player.IsOwnedByMemberNumber(targetId);
    }
    return Player.FriendList.includes(targetId);
  }
  function loadRemoteControl() {
    messagesManager.onRequest("remoteControlConnect", (data, sender, senderName) => {
      const senderNumber = typeof sender === "number" ? sender : sender.MemberNumber;
      if (!hasPermissionForRemoteControl(senderNumber)) {
        return {
          rejectReason: `You don't fit minimum role`
        };
      }
      if (!ServerPlayerIsInChatRoom()) {
        return {
          rejectReason: "Target player is not in chat room right now"
        };
      }
      if (!remoteControlControllers.includes(senderNumber)) {
        remoteControlControllers.push(senderNumber);
      }
      messagesManager.sendLocal(`<b>${senderName} (${senderNumber})</b> remotely connected to you.`);
      const pb = ServerPackItemPermissions(Player.PermissionItems);
      return {
        bundle: {
          ID: Player.OnlineID,
          Name: Player.Name,
          ActivePose: Player.ActivePose,
          ArousalSettings: Player.ArousalSettings,
          AssetFamily: Player.AssetFamily,
          BlackList: Player.BlackList,
          BlockItems: pb.BlockItems,
          Creation: Player.Creation,
          Description: Player.Description,
          Difficulty: Player.Difficulty,
          FavoriteItems: {},
          Game: {},
          Inventory: {},
          LimitedItems: pb.LimitedItems,
          ItemPermission: Player.AllowedInteractions,
          AllowedInteractions: Player.AllowedInteractions,
          Lovership: Player.Lovership,
          LabelColor: Player.LabelColor,
          MemberNumber: Player.MemberNumber,
          Nickname: Player.Nickname,
          OnlineSharedSettings: Player.OnlineSharedSettings,
          Owner: Player.Owner,
          Ownership: Player.Ownership,
          Reputation: Player.Reputation,
          Title: Player.Title,
          WhiteList: [],
          Appearance: ServerAppearanceBundle(Player.Appearance)
        }
      };
    });
    messagesManager.onRequest("remoteControlUpdate", (data, sender, senderName) => {
      const senderNumber = typeof sender === "number" ? sender : sender.MemberNumber;
      if (!hasPermissionForRemoteControl(senderNumber) || !remoteControlControllers.includes(senderNumber) || !data.bundle) {
        return {
          wasChanged: false
        };
      }
      ServerAppearanceLoadFromBundle(
        Player,
        Player.AssetFamily,
        data.bundle,
        senderNumber
      );
      ChatRoomCharacterUpdate(Player);
      messagesManager.sendLocal(`<b>${senderName} (${senderNumber})</b> remotely changed your appearance.`);
      if (modStorage.remoteControl.notifyOthers ?? true) {
        messagesManager.sendAction(`${getNickname(Player)}'s appearance was remotely changed`);
      }
      remoteControlControllers.splice(remoteControlControllers.indexOf(senderNumber), 1);
      return {
        wasChanged: true
      };
    });
    hookFunction("DialogMenuButtonBuild", HookPriority.ADD_BEHAVIOR, (args, next) => {
      next(args);
      if (remoteControlIsInteracting) {
        DialogMenuButton = DialogMenuButton.filter((btn) => btn !== "Activity");
      }
    });
    hookFunction("DialogLeave", HookPriority.ADD_BEHAVIOR, (args, next) => {
      if (remoteControlIsInteracting) {
        return DialogLeaveFocusItem();
      }
      return next(args);
    });
    hookFunction("DialogMenuBack", HookPriority.ADD_BEHAVIOR, async (args, next) => {
      const C = CurrentCharacter;
      if (remoteControlIsInteracting) {
        const toastId = toastsManager.spinner({
          title: "Updating appearance...",
          message: `Member number: ${C.MemberNumber}`
        });
        const response = await messagesManager.sendRequest({
          type: "beep",
          message: "remoteControlUpdate",
          data: {
            bundle: ServerAppearanceBundle(C.Appearance)
          },
          target: C.MemberNumber
        });
        toastsManager.removeSpinner(toastId);
        setRemoteControlIsInteracting(false);
        DialogLeave();
        if (response.isError) {
          return toastsManager.error({
            message: "Your changes weren't applied",
            duration: 5e3
          });
        }
        if (response.data?.wasChanged) {
          toastsManager.success({
            message: "Your changes were applied",
            duration: 5e3
          });
        } else {
          toastsManager.error({
            message: "Your changes weren't applied",
            duration: 5e3
          });
        }
        return;
      }
      return next(args);
    });
    hookFunction("DialogDraw", HookPriority.OBSERVE, (args, next) => {
      if (!CurrentCharacter?.Canvas?.getContext("2d") || !CurrentCharacter?.CanvasBlink?.getContext("2d")) return next(args);
      if (!remoteControlIsInteracting) return next(args);
      next(args);
      CurrentCharacter.Canvas.getContext("2d").globalAlpha = 1;
      CurrentCharacter.CanvasBlink.getContext("2d").globalAlpha = 1;
      CharacterAppearanceBuildCanvas(CurrentCharacter);
    });
    CommandCombine({
      Tag: "connect",
      Description: "Remotely connect to target player using DOGS remote control",
      Action: async (argumentsString, message, args) => {
        const targetNumber = parseInt(args[0]);
        if (!targetNumber) {
          return messagesManager.sendLocal(
            `Example: /connect <member number>`
          );
        }
        const toastId = toastsManager.spinner({
          title: "Connecting...",
          message: `Member number: ${targetNumber}`
        });
        const response = await messagesManager.sendRequest({
          type: "beep",
          message: "remoteControlConnect",
          target: targetNumber
        });
        toastsManager.removeSpinner(toastId);
        if (response.isError) {
          return toastsManager.error({
            title: "Connection was not established",
            message: "Something wrong happened... Maybe target player offline or not using DOGS?",
            duration: 6e3
          });
        }
        if (response.data?.rejectReason) {
          return toastsManager.error({
            title: "Connection rejected",
            message: response.data.rejectReason,
            duration: 6e3
          });
        }
        if (!response.data?.bundle) return;
        if (!ServerPlayerIsInChatRoom()) return;
        if (CurrentScreen !== "ChatRoom") CommonSetScreen("Online", "ChatRoom");
        const C = CharacterLoadOnline(response.data.bundle, targetNumber);
        setRemoteControlIsInteracting(true);
        ChatRoomFocusCharacter(C);
        if (!C.AllowItem) C.AllowItem = true;
        DialogChangeMode("items");
        DialogChangeFocusToGroup(C, "ItemArms");
      }
    });
  }

  // src/dto/decorators.ts
  function ValidateWith(validator, validationOptions) {
    return (object, propertyName) => {
      registerDecorator({
        name: "validateCustom",
        target: object.constructor,
        propertyName,
        options: validationOptions,
        validator: {
          validate(value, args) {
            return validator(args.object);
          },
          defaultMessage(args) {
            return "Params error";
          }
        }
      });
    };
  }

  // src/dto/updatePadlockMessageDto.ts
  var CombinationToLockDto = class {
    type;
    value;
  };
  __decorateClass([
    IsIn(["PIN-Code", "password"])
  ], CombinationToLockDto.prototype, "type", 2);
  __decorateClass([
    IsString(),
    Matches(/^[a-zA-Z0-9!@#$%^&*]+$/, {
      message: "combination contains invalid characters"
    })
  ], CombinationToLockDto.prototype, "value", 2);
  var PadlockConfigDto = class {
    baseLock;
    minimumRole;
    memberNumbers;
    note;
    preventCheatCommands;
    unlockTime;
    combinationToLock;
    combinationToUnlock;
  };
  __decorateClass([
    IsOptional(),
    ValidateWith((dto) => isEnum(dto.baseLock, BasePadlock))
  ], PadlockConfigDto.prototype, "baseLock", 2);
  __decorateClass([
    IsOptional(),
    ValidateWith((dto) => isEnum(dto.minimumRole, KeyHolderMinimumRole))
  ], PadlockConfigDto.prototype, "minimumRole", 2);
  __decorateClass([
    IsOptional(),
    IsArray(),
    IsNumber({}, { each: true })
  ], PadlockConfigDto.prototype, "memberNumbers", 2);
  __decorateClass([
    IsOptional(),
    IsString()
  ], PadlockConfigDto.prototype, "note", 2);
  __decorateClass([
    IsOptional(),
    IsBoolean()
  ], PadlockConfigDto.prototype, "preventCheatCommands", 2);
  __decorateClass([
    IsOptional(),
    IsString(),
    ValidateWith((obj) => {
      const date = new Date(obj.unlockTime ?? "");
      return !isNaN(date.getTime());
    }, { message: "unlockTime must be a valid ISO date string" })
  ], PadlockConfigDto.prototype, "unlockTime", 2);
  __decorateClass([
    IsOptional(),
    Type(() => CombinationToLockDto),
    ValidateNested()
  ], PadlockConfigDto.prototype, "combinationToLock", 2);
  __decorateClass([
    IsOptional(),
    IsString()
  ], PadlockConfigDto.prototype, "combinationToUnlock", 2);
  var UpdatePadlockMessageDto = class {
    groupName;
    config;
  };
  __decorateClass([
    IsString(),
    ValidateWith((obj) => {
      const g = AssetGroupGet("Female3DCG", obj.groupName);
      return !!g && g.IsItem();
    })
  ], UpdatePadlockMessageDto.prototype, "groupName", 2);
  __decorateClass([
    Type(() => PadlockConfigDto),
    ValidateNested()
  ], UpdatePadlockMessageDto.prototype, "config", 2);

  // src/dto/syncPadlockMessageDto.ts
  var SyncPadlockMessageDto = class {
    settings;
    groupNames;
  };
  __decorateClass([
    Type(() => PadlockConfigDto),
    ValidateNested()
  ], SyncPadlockMessageDto.prototype, "settings", 2);
  __decorateClass([
    IsArray(),
    ValidateWith((obj) => {
      return obj.groupNames.every((name) => {
        const g = AssetGroupGet("Female3DCG", name);
        return !!g && g.IsItem();
      });
    })
  ], SyncPadlockMessageDto.prototype, "groupNames", 2);

  // src/constants.ts
  var GITHUB_REPO_URL = "https://github.com/FurryZoi/Devious-Obligate-Great-Stuff";
  var DEVIOUS_PADLOCK_MINIMUM_FIRST_TRIGGER_INTERVAL = 1e3 * 20;
  var DEVIOUS_PADLOCK_COOLDOWN_TIME = 1e3 * 60 * 2;

  // src/dto/removePadlockMessageDto.ts
  var RemovePadlockMessageDto = class {
    combination;
    groupName;
  };
  __decorateClass([
    IsString()
  ], RemovePadlockMessageDto.prototype, "combination", 2);
  __decorateClass([
    IsString(),
    ValidateWith((obj) => {
      const g = AssetGroupGet("Female3DCG", obj.groupName);
      return !!g && g.IsItem();
    })
  ], RemovePadlockMessageDto.prototype, "groupName", 2);

  // src/modules/deviousPadlock.ts
  var BasePadlock = /* @__PURE__ */ ((BasePadlock2) => {
    BasePadlock2["EXCLUSIVE"] = "ExclusivePadlock";
    BasePadlock2["LOVERS"] = "LoversPadlock";
    BasePadlock2["OWNER"] = "OwnerPadlock";
    return BasePadlock2;
  })(BasePadlock || {});
  var PutPadlockMinimumRole = /* @__PURE__ */ ((PutPadlockMinimumRole3) => {
    PutPadlockMinimumRole3[PutPadlockMinimumRole3["PUBLIC"] = 3] = "PUBLIC";
    PutPadlockMinimumRole3[PutPadlockMinimumRole3["FRIEND"] = 0] = "FRIEND";
    PutPadlockMinimumRole3[PutPadlockMinimumRole3["WHITELIST"] = 1] = "WHITELIST";
    PutPadlockMinimumRole3[PutPadlockMinimumRole3["LOVER"] = 2] = "LOVER";
    PutPadlockMinimumRole3[PutPadlockMinimumRole3["OWNER"] = 4] = "OWNER";
    return PutPadlockMinimumRole3;
  })(PutPadlockMinimumRole || {});
  var KeyHolderMinimumRole = /* @__PURE__ */ ((KeyHolderMinimumRole2) => {
    KeyHolderMinimumRole2[KeyHolderMinimumRole2["EVERYONE_EXCEPT_WEARER"] = 0] = "EVERYONE_EXCEPT_WEARER";
    KeyHolderMinimumRole2[KeyHolderMinimumRole2["FRIEND"] = 4] = "FRIEND";
    KeyHolderMinimumRole2[KeyHolderMinimumRole2["WHITELIST"] = 5] = "WHITELIST";
    KeyHolderMinimumRole2[KeyHolderMinimumRole2["FAMILY"] = 1] = "FAMILY";
    KeyHolderMinimumRole2[KeyHolderMinimumRole2["LOVER"] = 2] = "LOVER";
    KeyHolderMinimumRole2[KeyHolderMinimumRole2["OWNER"] = 3] = "OWNER";
    return KeyHolderMinimumRole2;
  })(KeyHolderMinimumRole || {});
  var deviousPadlockTriggerCooldown = {
    count: 0,
    firstTriggerTime: Date.now(),
    state: false
  };
  function isDeviousLock(item) {
    return item?.Property?.IsDeviousLock === true;
  }
  function getSavedItemData(item) {
    return cloneDeep_default({
      name: item.Asset.Name,
      color: item.Color,
      craft: item.Craft,
      property: ItemPropertiesCompress(item)
    });
  }
  function isFriend(a, b) {
    return a.IsPlayer() && a.HasOnFriendlist(b) || b.IsPlayer() && b.HasOnFriendlist(a);
  }
  function isInFamilyOfCharacter(a, b) {
    return a.IsInFamilyOfMemberNumber(b.MemberNumber ?? -1);
  }
  function canUseBasePadlock(target1, target2, padlockOwner, baseLock) {
    if (target1.MemberNumber !== padlockOwner) return false;
    if (baseLock === "ExclusivePadlock" /* EXCLUSIVE */) return true;
    if (baseLock === "LoversPadlock" /* LOVERS */) return target1.MemberNumber === target2.MemberNumber && target2.Lovership.length > 0 || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (baseLock === "OwnerPadlock" /* OWNER */) return target1.MemberNumber === target2.MemberNumber && target2.Ownership != null || target2.IsOwnedByCharacter(target1);
    return false;
  }
  function basePadlockMinimumRole(baseLock, currentMinimumRole) {
    if (baseLock === "LoversPadlock" /* LOVERS */) {
      if (currentMinimumRole === 3 /* OWNER */) return currentMinimumRole;
      return 2 /* LOVER */;
    }
    if (baseLock === "OwnerPadlock" /* OWNER */) return 3 /* OWNER */;
    return currentMinimumRole ?? 0 /* EVERYONE_EXCEPT_WEARER */;
  }
  function hasKeyToPadlock(groupName, target1, target2) {
    if (!target1.CanInteract()) return false;
    if (!target2.IsPlayer() && !target2.DOGS) return false;
    const settings = getPadlockSettings(target2, groupName);
    if (!settings) return false;
    const owner = settings.owner;
    const minimumRole = settings.minimumRole ?? 0 /* EVERYONE_EXCEPT_WEARER */;
    const memberNumbers = settings.memberNumbers ?? [];
    if (target1.MemberNumber === owner || target1.MemberNumber !== void 0 && memberNumbers.includes(target1.MemberNumber)) return true;
    if (minimumRole === 0 /* EVERYONE_EXCEPT_WEARER */) return target1.MemberNumber !== target2.MemberNumber;
    if (minimumRole === 4 /* FRIEND */) return isFriend(target1, target2) || target2.HasOnWhitelist(target1) || isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 5 /* WHITELIST */) return target2.HasOnWhitelist(target1) || isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 1 /* FAMILY */) return isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 2 /* LOVER */) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 3 /* OWNER */) return target2.IsOwnedByCharacter(target1);
    return true;
  }
  function canSetKeyHolderMinimumRole(target1, target2, minimumRole) {
    if (target1.MemberNumber === target2.MemberNumber) return true;
    if (minimumRole === 0 /* EVERYONE_EXCEPT_WEARER */) return true;
    if (minimumRole === 4 /* FRIEND */) return isFriend(target1, target2) || target2.HasOnWhitelist(target1) || isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 5 /* WHITELIST */) return target2.HasOnWhitelist(target1) || isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 1 /* FAMILY */) return isInFamilyOfCharacter(target1, target2) || target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 2 /* LOVER */) return target1.IsLoverOfCharacter(target2) || target2.IsOwnedByCharacter(target1);
    if (minimumRole === 3 /* OWNER */) return target2.IsOwnedByCharacter(target1);
    return false;
  }
  function getPadlockSettings(target, groupName) {
    if (target.IsPlayer()) {
      modStorage.deviousPadlock.itemGroups ??= {};
      if (!modStorage.deviousPadlock.itemGroups[groupName]) return null;
      if (isItemGroupSynced2(target, groupName)) {
        return {
          ...getSyncConfigOfItemGroup(target, groupName),
          item: modStorage.deviousPadlock.itemGroups[groupName].item,
          owner: modStorage.deviousPadlock.itemGroups[groupName].owner
        };
      }
      return modStorage.deviousPadlock.itemGroups[groupName];
    }
    if (!target.DOGS?.deviousPadlock?.itemGroups?.[groupName]) return null;
    if (isItemGroupSynced2(target, groupName)) {
      return {
        ...getSyncConfigOfItemGroup(target, groupName),
        item: target.DOGS.deviousPadlock.itemGroups[groupName].item,
        owner: target.DOGS.deviousPadlock.itemGroups[groupName].owner
      };
    }
    return target.DOGS.deviousPadlock.itemGroups[groupName];
  }
  function getPadlocksAmount(target) {
    return target.Appearance.reduce((count, item) => {
      if (isDeviousLock(item)) return count + 1;
      return count;
    }, 0);
  }
  async function validatePadlockSettingsUpdate(from, settings, padlockGroupName) {
    if (!modStorage.deviousPadlock?.itemGroups?.[padlockGroupName]) return { valid: false };
    if (typeof modStorage.deviousPadlock.itemGroups[padlockGroupName].combination?.hash === "string" && typeof settings.combinationToUnlock === "string") {
      if (!hasKeyToPadlock(padlockGroupName, from, Player) && await hashCombination(settings.combinationToUnlock) !== modStorage.deviousPadlock.itemGroups[padlockGroupName].combination?.hash) return { valid: false };
    } else {
      if (!hasKeyToPadlock(padlockGroupName, from, Player)) return { valid: false };
    }
    const data = {};
    if (settings.combinationToLock !== void 0) {
      if (settings.combinationToLock.type === "PIN-Code" && settings.combinationToLock.value.length === 6 && Number.isInteger(parseInt(settings.combinationToLock.value)) || settings.combinationToLock.type === "password" && settings.combinationToLock.value.trim() !== "" && settings.combinationToLock.value.length <= 25) {
        data.combinationToLock = settings.combinationToLock;
      }
    }
    if (settings.minimumRole !== void 0 && canSetKeyHolderMinimumRole(from, Player, settings.minimumRole)) {
      data.minimumRole = settings.minimumRole;
    }
    if (settings.memberNumbers !== void 0) {
      data.memberNumbers = settings.memberNumbers;
    }
    if (settings.unlockTime !== void 0) {
      data.unlockTime = settings.unlockTime.trim();
    }
    if (settings.baseLock !== void 0 && canUseBasePadlock(from, Player, modStorage.deviousPadlock.itemGroups[padlockGroupName].owner, settings.baseLock)) {
      if (!(settings.baseLock === "LoversPadlock" /* LOVERS */ && Player.IsOwnedByCharacter(from) && LogQuery("BlockLoverLockOwner", "LoverRule")) && !(Player.MemberNumber === from.MemberNumber && (settings.baseLock === "OwnerPadlock" /* OWNER */ && LogQuery("BlockOwnerLockSelf", "OwnerRule") || settings.baseLock === "LoversPadlock" /* LOVERS */ && LogQuery("BlockLoverLockSelf", "LoverRule")))) data.baseLock = settings.baseLock;
    }
    if (settings.note !== void 0) {
      data.note = settings.note;
    }
    if (settings.preventCheatCommands !== void 0) {
      data.preventCheatCommands = settings.preventCheatCommands;
    }
    const currentPadlockSettings = getPadlockSettings(Player, padlockGroupName);
    const baseLock = data.baseLock ?? currentPadlockSettings?.baseLock ?? "ExclusivePadlock" /* EXCLUSIVE */;
    if (data.baseLock !== void 0 || data.minimumRole !== void 0) {
      data.minimumRole = basePadlockMinimumRole(baseLock, data.minimumRole ?? currentPadlockSettings?.minimumRole);
    }
    if (baseLock !== "ExclusivePadlock" /* EXCLUSIVE */ && (data.baseLock !== void 0 || settings.memberNumbers !== void 0)) {
      data.memberNumbers = [];
    }
    return { valid: true, data };
  }
  async function changePadlockSettings(groupName, config) {
    if (!modStorage.deviousPadlock.itemGroups?.[groupName]) return;
    if (config.unlockTime !== void 0) {
      if (config.unlockTime === "") delete modStorage.deviousPadlock.itemGroups[groupName].unlockTime;
      else modStorage.deviousPadlock.itemGroups[groupName].unlockTime = config.unlockTime;
    }
    if (config.combinationToLock !== void 0) {
      if (config?.combinationToLock?.value.trim() === "") {
        delete modStorage.deviousPadlock.itemGroups[groupName].combination;
      } else {
        modStorage.deviousPadlock.itemGroups[groupName].combination = {
          type: config.combinationToLock.type,
          hash: await hashCombination(config.combinationToLock.value)
        };
      }
    }
    if (config.baseLock !== void 0) {
      const item = InventoryGet(Player, groupName);
      modStorage.deviousPadlock.itemGroups[groupName].baseLock = config.baseLock;
      if (item) {
        item.Property ??= {};
        item.Property.IsDeviousLock = true;
        const previousLockedBy = item.Property.LockedBy;
        const previousLockMemberNumber = item.Property.LockMemberNumber;
        item.Property.LockedBy = config.baseLock;
        item.Property.LockMemberNumber = modStorage.deviousPadlock.itemGroups[groupName].owner;
        const changed = ValidationSanitizeLock(Player, item);
        if (changed) {
          logger.warn("Sanitized lock properties when changing BaseLock");
        }
        modStorage.deviousPadlock.itemGroups[groupName].item = getSavedItemData(item);
        if (previousLockedBy !== item.Property.LockedBy || previousLockMemberNumber !== item.Property.LockMemberNumber) {
          ChatRoomCharacterUpdate(Player);
        }
      }
    }
    if (config.note !== void 0) {
      modStorage.deviousPadlock.itemGroups[groupName].note = config.note;
    }
    if (config.preventCheatCommands !== void 0) {
      modStorage.deviousPadlock.itemGroups[groupName].preventCheatCommands = config.preventCheatCommands;
    }
    if (config.memberNumbers !== void 0) modStorage.deviousPadlock.itemGroups[groupName].memberNumbers = config.memberNumbers;
    if (config.minimumRole !== void 0) modStorage.deviousPadlock.itemGroups[groupName].minimumRole = config.minimumRole;
    unsyncItemGroups([groupName], false);
    syncStorage();
  }
  async function hashCombination(combination) {
    const data = new TextEncoder().encode(combination);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  }
  function applyEffectiveBaseLockToPadlock(groupName) {
    const item = InventoryGet(Player, groupName);
    if (!item) return false;
    const isLegacyPadlockState = Object.values(BasePadlock).includes(item.Property?.LockedBy);
    if (!isDeviousLock(item) && !isLegacyPadlockState) return false;
    const padlockSettings = getPadlockSettings(Player, groupName);
    if (!padlockSettings) return false;
    item.Property ??= {};
    item.Property.IsDeviousLock = true;
    const baseLock = padlockSettings.baseLock ?? "ExclusivePadlock" /* EXCLUSIVE */;
    let changed = false;
    if (item.Property.LockedBy !== baseLock) {
      item.Property.LockedBy = baseLock;
      changed = true;
    }
    if (item.Property.LockMemberNumber !== padlockSettings.owner) {
      item.Property.LockMemberNumber = padlockSettings.owner;
      changed = true;
    }
    if (changed) {
      const sanitized = ValidationSanitizeLock(Player, item);
      if (sanitized) {
        logger.warn("Sanitized lock properties when syncing BaseLock");
      }
      modStorage.deviousPadlock.itemGroups[groupName].item = getSavedItemData(item);
    }
    return changed;
  }
  function syncPadlockConfigurationWithItemGroups(groupNames, config, push = true) {
    const uniqueGroupNames = [...new Set(groupNames)];
    unsyncItemGroups(uniqueGroupNames, false);
    modStorage.deviousPadlock.synced ??= [];
    const sameConfig = modStorage.deviousPadlock.synced.find(({ groupNames: groupNames2, ...rest }) => isEqual_default(rest, config));
    if (sameConfig) {
      sameConfig.groupNames = [.../* @__PURE__ */ new Set([...sameConfig.groupNames, ...uniqueGroupNames])];
    } else {
      modStorage.deviousPadlock.synced.push({
        ...config,
        groupNames: uniqueGroupNames
      });
    }
    let shouldPushChatRoomUpdate = false;
    for (const groupName of uniqueGroupNames) {
      if (applyEffectiveBaseLockToPadlock(groupName)) {
        shouldPushChatRoomUpdate = true;
      }
    }
    if (shouldPushChatRoomUpdate && ServerPlayerIsInChatRoom()) {
      ChatRoomCharacterUpdate(Player);
    }
    if (push) syncStorage();
  }
  function unsyncItemGroups(groupNames, push = true) {
    if (!modStorage.deviousPadlock.synced) return;
    modStorage.deviousPadlock.synced = modStorage.deviousPadlock.synced.map((config) => {
      config.groupNames ??= [];
      config.groupNames = config.groupNames.filter((g) => !groupNames.includes(g));
      return config;
    }).filter((config) => config.groupNames.length > 0);
    if (push) syncStorage();
  }
  function isItemGroupSynced2(target, groupName) {
    if (target.IsPlayer()) {
      if (!modStorage.deviousPadlock.synced) return false;
      return modStorage.deviousPadlock.synced.some((config) => config.groupNames?.includes(groupName));
    }
    if (!target.DOGS?.deviousPadlock?.synced) return false;
    return target.DOGS.deviousPadlock.synced.some((config) => config.groupNames?.includes(groupName));
  }
  function getSyncConfigOfItemGroup(target, groupName) {
    if (target.IsPlayer()) {
      if (!modStorage.deviousPadlock.synced) return null;
      const config2 = modStorage.deviousPadlock.synced.find((c) => c.groupNames.includes(groupName));
      if (!config2) return null;
      const { groupNames: groupNames2, ...syncConfig2 } = config2;
      return syncConfig2;
    }
    if (!target.DOGS?.deviousPadlock?.synced) return null;
    const config = target.DOGS.deviousPadlock.synced.find((c) => c.groupNames.includes(groupName));
    if (!config) return null;
    const { groupNames, ...syncConfig } = config;
    return syncConfig;
  }
  function isItemGroupSyncedWithConfig(target, groupName, config) {
    if (target.IsPlayer()) {
      if (!modStorage.deviousPadlock.synced) return false;
      return modStorage.deviousPadlock.synced.some((c) => {
        const { groupNames, ..._c } = c;
        return groupNames?.includes(groupName) && isEqual_default(_c, config);
      });
    }
    if (!target.DOGS?.deviousPadlock?.synced) return false;
    return target.DOGS.deviousPadlock.synced.some((c) => {
      const { groupNames, ..._c } = c;
      return groupNames?.includes(groupName) && isEqual_default(_c, config);
    });
  }

  // src/modules/storage.ts
  var modStorage;
  var VALID_MINIMUM_ROLES = new Set(
    Object.values(KeyHolderMinimumRole).filter((value) => typeof value === "number")
  );
  function normalizeBasePadlock(value) {
    if (typeof value !== "string") return void 0;
    if (Object.values(BasePadlock).includes(value)) {
      return value;
    }
    const normalizedValue = value.toLowerCase();
    if (normalizedValue.includes("owner")) return "OwnerPadlock" /* OWNER */;
    if (normalizedValue.includes("lover")) return "LoversPadlock" /* LOVERS */;
    if (normalizedValue.includes("exclusive")) return "ExclusivePadlock" /* EXCLUSIVE */;
    return void 0;
  }
  function normalizeMinimumRole(baseLock, value) {
    const numericValue = typeof value === "number" ? value : typeof value === "string" ? Number(value) : void 0;
    const currentMinimumRole = numericValue !== void 0 && Number.isInteger(numericValue) && VALID_MINIMUM_ROLES.has(numericValue) ? numericValue : void 0;
    if (baseLock === "LoversPadlock" /* LOVERS */) {
      if (currentMinimumRole === 3 /* OWNER */) return currentMinimumRole;
      return 2 /* LOVER */;
    }
    if (baseLock === "OwnerPadlock" /* OWNER */) return 3 /* OWNER */;
    return currentMinimumRole ?? 0 /* EVERYONE_EXCEPT_WEARER */;
  }
  function migrateLegacyPadlockConfig(config, withItemData = false) {
    const baseLock = normalizeBasePadlock(
      config.baseLock ?? config.lockedBy ?? config.basePadlock ?? config.item?.property?.LockedBy
    ) ?? "ExclusivePadlock" /* EXCLUSIVE */;
    config.baseLock = baseLock;
    config.minimumRole = normalizeMinimumRole(baseLock, config.minimumRole);
    if (baseLock !== "ExclusivePadlock" /* EXCLUSIVE */) {
      config.memberNumbers = [];
    }
    if (withItemData && config.item && typeof config.item === "object") {
      config.item.property ??= {};
      config.item.property.LockedBy = baseLock;
      if (typeof config.owner === "number") {
        config.item.property.LockMemberNumber = config.owner;
      }
    }
  }
  function initStorage() {
    const defaults = {
      remoteControl: {},
      deviousPadlock: {},
      misc: {},
      version: MOD_DATA.version
    };
    try {
      if (typeof Player.ExtensionSettings.DOGS === "string") {
        const data = LZString.decompressFromBase64(Player.ExtensionSettings.DOGS);
        if (data) modStorage = JSON.parse(data);
      }
    } catch (error) {
      logger.error("Failed to initialize storage:", error);
    } finally {
      modStorage ??= defaults;
    }
    for (const key in defaults) {
      modStorage[key] ??= defaults[key];
    }
    migrateModStorage();
    messagesManager.sendPacket("syncStorage", {
      storage: modStorage
    });
    messagesManager.onPacket("syncStorage", (data, sender) => {
      if (!sender.DOGS) {
        messagesManager.sendPacket("syncStorage", {
          storage: modStorage
        }, sender.MemberNumber);
      }
      sender.DOGS = data.storage;
    });
    hookFunction("ChatRoomSync", HookPriority.OBSERVE, (args, next) => {
      const ret = next(args);
      messagesManager.sendPacket("syncStorage", {
        storage: modStorage
      });
      return ret;
    });
  }
  function migrateModStorage() {
    if (typeof modStorage.deviousPadlock.itemGroups === "object") {
      Object.values(modStorage.deviousPadlock.itemGroups).forEach((d) => {
        if (d.item.Name) {
          d.item.name = d.item.Name;
          delete d.item.Name;
        }
        if (d.item.Color) {
          d.item.color = d.item.Color;
          delete d.item.Color;
        }
        if (d.item.Craft) {
          d.item.craft = d.item.Craft;
          delete d.item.Craft;
        }
        if (d.item.Property) {
          d.item.property = d.item.Property;
          delete d.item.Property;
        }
        if (d.accessPermission !== void 0) {
          d.minimumRole = d.accessPermission;
          delete d.accessPermission;
        }
        if (Array.isArray(d.blockedCommands)) {
          delete d.blockedCommands;
        }
        migrateLegacyPadlockConfig(d, true);
        delete d.item.Difficulty;
        delete d.item.Group;
      });
    }
    if (Array.isArray(modStorage.deviousPadlock.profiles)) {
      modStorage.deviousPadlock.profiles.forEach((profile) => {
        const legacyBlockedCommands = profile.blockedCommands;
        if (Array.isArray(legacyBlockedCommands)) {
          delete profile.blockedCommands;
        }
        migrateLegacyPadlockConfig(profile);
      });
    }
    if (Array.isArray(modStorage.deviousPadlock.synced)) {
      modStorage.deviousPadlock.synced.forEach((config) => {
        const legacyBlockedCommands = config.blockedCommands;
        if (Array.isArray(legacyBlockedCommands)) {
          delete config.blockedCommands;
        }
        config.groupNames = [...new Set(config.groupNames ?? [])];
        migrateLegacyPadlockConfig(config);
      });
    }
    if (typeof modStorage.remoteControl.permission === "number") {
      modStorage.remoteControl.connectMinimumRole = modStorage.remoteControl.permission;
      delete modStorage.remoteControl.permission;
    }
    if (typeof modStorage.deviousPadlock.permission === "number") {
      modStorage.deviousPadlock.putMinimumRole = modStorage.deviousPadlock.permission;
      delete modStorage.deviousPadlock.permission;
    }
    syncStorage();
  }
  function syncStorage() {
    if (typeof modStorage !== "object") return;
    Player.ExtensionSettings.DOGS = LZString.compressToBase64(JSON.stringify(modStorage));
    ServerPlayerExtensionSettingsSync("DOGS");
    messagesManager.sendPacket("syncStorage", {
      storage: modStorage
    });
  }

  // src/images/slavery.png
  var slavery_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADx4AAA8eAfrsfUQAABGLSURBVHhe7dwFsCxdcQfwh0NwSXB3Egr34BAguBPcXYOEBAKFexKsgia4uxXubgnuTgz3JEigf/fu/6vzTWZnzu7d9777Hvdf9a/ZnR07ffr06e7Ts/v2sIc97GEPe/h9x1EW2yMC7n264rGKP7ejcJrilYunL367+KviKjhZ8bKL7b8X/6/4R8ULFf+g+L3i7xWuVvx68bdFwnh/8XHFXy724X8UL1nswZGLDyz+bzHnf774hMG+DxbPWDwkcaTiOYtnK2rkNYu/KabxU/xR8dTFOdyrOHb+GL9aPFFR57Q4ZfF8RZp/UOA8xasUj1Y8dvH5RUP2hkUaGyEzDbTwzYvv6PdbFXWGoW/fPxSn4B4/LTr2E8V7FJ+x+I4/KV6/eMviDxb7aPlzi/9cdPx9i78u+u27Rc+/q3GHIlPw4+I/FX9R9PA3LsIjixHA+e0onLgY4b/ajgVuWrTvQ1vfluMCRccRFNsMJy3mPk+1Y4HcXyeeoXiLoufNsaHnNk9sDMPhsxMwEX+92D6seNsigcOHF9uPL7bwX4vt94tf3v542Ba+uNjqhCkQCtDSXNO+TKSfXWzh3IutOYEJeVbxP4uEe+fiM4tggr7u9sfNYJOC5kXQJDhBkYZF0IY3aFBAY+9ZfHzx6HYULlFkal5Y/Cs7Cs7hOSzDyYvpjDcW31p8eTGCvkbxacVHFc0TEM2nFIRq+4IiUxZow67EHxYz9DQK4llceuvbvn03KeaYVfiZIps/xPWKvRNry48WgXJwLe0zURN6TAkF2Bg2qdHHW2zBw0L2HX+xjWbDl4pfK36nyLvQ4P9pmO9wjiL/eoj7F7WBYEx6RtAPFzTxufY3i/9SfE0xZoYGZ3uM7Y9bGux+GQnZvxFsUtBsZOChXTuCjcvUauVdiiYkw/gkRecct6HvXDsmCC662AbHLJ5p++O+5xW5bCZW10IjzLVPWzxv8TrFmJi0m8lK0OYZ02GQIGoj2KSgBRg0E0wkLy3G9mosEGCg4aBxBECgQ/6smNEx9Kc9e56f9roGOj507YB7l/ufomi0XXzr2zbY+j8r6iz418V2V+IpRY0bkraLytrIjyBoIrOwDEaA4ez41vUDnRj/mfewDK5x92J7b6S5OrPdFzI37PWuxd8WPahG0cZ3F/97sS+kdTQ/3wn8bcU/Lg7BhibI4Em0aH8TfAzBxvLruYy5l2f5VPMdPeuji58rpuN4LrsaCYVbsyFSfFGRD/2qouFphhfFtQ3mA4+Fv4aw30VxQ8QHHvttOLrY3GsXdcAdi88pyoV4vkAE6dg3bH3bxbhZ0YMKrzOzL4OOuHVRo5gVEdyYoI0K15R0GsJ9/DbmipkAP1n8VvHZxTMX5+Aerjc2QnYVLlb0oMxBqyk7wUeKrnmfrW+HR8zCg7e+jWOuwwMdr1NcjwncKDbpdQBzYOLTuLvasUN4vuQc+MRDJOSeyqsTXA9uVzzV9setOWPXQ/iscSY9WbidgJ8cN+2KdgwgN+G3l2x9Wx9GXxJgJstNK+B+gXxCHpp2y5CtC5Gf6/BgWh88EIL7navGN14HZy+KAVyHu2eF5qDB1Yvxf2mkiW4sVzEFkZ7MnmtIb46BXY2dfn2x1x4HFiSYH+ejjj3oYBkqgkLJ+FXAZXOedOnUqocJ2Mhx7I3s6IRotRUyM7RqR+0anKsowaMhNFsatAc6yfF83x7v5fZF9+A1yIH0QEo1Qn5T8ajFgxp/UUyDhNw9eFnR8Za1ekATX1l0jjz3HKwPZpKVRUx28aAG1+sLRY1KHngOny6+d/tjN0yGRkCPiRLMeB68kh37GwfCjeHmxf36t8V2Dt8ofmD7YzesAwr9e5JBfHJC5mXMrUluBOsaf1qKHnZZkYt8sJyzPLKhyu0zsREiJMgYbtlKE5VrSxrJZ1gpl7uQ9Glh6czCr7VAaU/5bYJW08Ej4enIbdhqK8VyfZ8lsUyiRo+VIGbN4oD7jsF5zvd70rGus+z4lfEnRet4hn1yB7JvGo1WSazJnaUYGMYJZzdF9z5OMeCatV7NJjjMp2i7tlEQqzfay2c3wSuhoAgfK161OIk5jXYjQ7ht4DJ4AKVXtOlJxTsVgblwn4wCiGYgzaAhhrGttCVNQ6PFyMhKivqLrEe+rpjlLbUYyS2DawaZ9KDd75nYdFthvpHgOB1ojZKHZCT1LGl5bovAnmktSLa7uUYoGZBJM0nZhh7KMZgaCnbPd+lRDenhMmhobCpvBHQUIdkn5O+91jJYvUk0G09HO31Hk7k2KVN4e5FAZfh4OjnPiFsL/NGsSjzCjiVgu9RIOI6tM/xose86QknB5Ys9mrEMOtn1ssrC/kaDH27HmjBSJZPkpZP0J8S/LKYj31Wc6jwj13Fk1S4+d0MvuwBKiE8hk8gUd5LzYL5cI6ssGp5o8AF2rAkjsH3GMT6xOIVrFR3neSjAKKbcO4kcF4As+y+DiQ/YqpwDzIoIjG3tDVbGkGtmhbo1ERq4LjxTUq2Byc1KUNpk4uuB56DVayHLSJZ9eBIyaHqt7SAN5r867qFFblaybibTnULZQdYG26RPgiDzgCHLNHm2uHVMGpqAPe+y4e8YCSxeVbsylDo9bVoG90xOpi13+39YdvPAGhshtsfRbu6d1KLVYstQbLiVEClGtk6n6CTnxvvQGMtJyE+2vJ96DkkjAnEfD4/mCEITHus8o0XuxCgBQn/I9sethsZ7CX0Pfadtnp2bpuM8P1qIlSp9TFElVYIr3g7hew6RpM6UgxEXUKDUkCR9e5viqomzw4EPrSEmB5OcxLghZ70vArtckWa0YOP/pqh2gh+qc5gjjXa9VUhAJtUWOkHGLbZ6Gd3P+UxAIk7P//SifLa3DARTtkMIiNQAmqMolJiB756JOLQmOam0cxoN3KcbFLkyDP86+Psiu8c90iFm+2iqz7QGDXmazW+mXY8t6qD3FMeWssCIUBtiFIge5S5obzTYttX2QEpV2P6OrW/98Hw6mb+d8F25Qooy14bgQ6/xFzVqHdAg2tMLHZqy3V6o1ie4XnDrYnrWgREQjZamncSU1xEwFSBy4j0wE7RvFbB3KentAZPE9PQ8X0DQRkfPKAUjIMXwvXDtPy8aoQ+yo2C0yGfvCBqbPG9LOVzC6IXV8VWW8IXZ7sP+94K/y3b2ClqxT1y4XqifHsqCoNWmeMNsLbChvIrhhcPeXtRwQ3qsAGYZvJbhHhfe+tYHobFzaGoP8t7K1DJZC/mQTII8KyVk7cRuolyaE5oamkoFaLQslRqNCxa5bVw24Mr19KLJj2u0SnjaVn32QGfGZ1/FrJnYeu+hQtbxoPSBS8i94yiQEVl4IWoUU4LOsOUtGJb8ZH5n3pJyUxmrOTiO1qwigHRKr+mgSZmoV11tT9HMHORrgA/OewIu44sXhKXPOyXo2K+hf6l6PqFmbj4FQqPVq2oa9AraOy4RcM6dg+EOPZO0a0oBQ6LlFnlJVFJtFFOClrVywWEYrfQ1/uOlinNLR9G0XgFAJrSpl4RaWMEJhkJYhvjUKTyfgog05kwuZAjRruuZJ0Yxp9ES31yzoZHPBZmEuRKCdQSd5TE2sAet5u8PQVOoYLiWSSmYH5HjUi9mStDgfUHDfujKtdHURRbbZYige90uiGnqEQK0mt8r6HRmTxCW2hLnvHP742FgEkWKk6W+c4K2yiDNaei0EMTwH2EsR9AiQy7H92BVjW6PSyfNIcdJA8whI0auRkqghY6Vb5kstJwTtIt4/0NCKeAOeUM255qFp5CGrCLoCKFH2+CEiy2sKugowhSSZxFbeHe8dWuZRNnLybz1nKDBZMd9sRpMuwUxoirgwMvuTSENaRM6c4gQ3LvHtqdDKMaqgl4aZDRIBpO8BF5fKXJ3Ze3YZXLZMbhNsmdu1JKT3uNH037Hr/K6wj8WncPDYf/mkDSBIdw7FwhAnNObvfPGgeOH9Grz7D17NJq99IqxtGLSncAUvG/74ySi0bS/F9KbIJzuCUCilassa62i0ZD32kH69uZF0bJokMA3DhU+6c1X2FGY6jArzI5t/85hDmxe7tETIutwx6rv6NVoeWvnyFksg/lFYVDMp+OtW/ZMoIdDj0YPYSkpviTToRRA2ZYk09gaYcLpeBI9iEZDz4SYxJDzCKMH0eixpFImOAu31ia1L3+W8uRiFom7sY6gwWIA0B5/TCKo8f6gOo78VUMQQfdOUrCqoHOP9rw5tIIejgIrJrJ7SRvQYMeZ0M0HK2MdQQte2vf6xP7sNpvNzbKa0q4frqPRrTvZM0xzD6tAvWhtdCtoo5JLC7RZPYoKKe2j6TyMVXLxa8NEYHjK5Fklz0PGFmP7TqBZ3T4RVevvTkHjci33mEOKHYfh8TKYZNvnbRNe3oXJ/vzPCHiFI6Vpy96p2ShorJsNK4SEyyYjv9HIvKna/o8Sn/MyxTnkbSvsqeBPsU/PO9zC6fb1aAmyjOxUHeFYwSKT4jcLE/sddyu6mUlwaHrUNuRBJZ5oOzonE5Uh6IGnVkJUieY63tueguszS45VmrYM3MT7FXMsd1NuPX4680MR/MasjP0JgBc9/e7/l/Y7DP8MVa+5tWDDFJ34bfi7hdAUQyKtGvNSQKFKjru3HRMgQJOUY1UtjYGLJruWa/Imhq9UqBvJ72OFMHxmSsLj6E127Rhx0kWMQ8jmpeHD0JQHkfIxpOUqN4cjQwV/jslq8zLEG3Bs/uUrcF2VUqkMRW5o/rwqMCpSYmY9cGzBIdHnXMdvHGrS9PDYm6ZZhVhWZ6Gmom08M9PO5BZC85vJdwoSPRF03E4grHZiEzUqchnztHgezIXjxtw3+Wb38Jw9uZeNghaoV2tfULePTU3DsxIzBjbQ+yMRhBDX+yiuwTxlv+qjKRjGOtyx6RS1F5mYkcnKUtQYuKN5udPE2npToDhdIqk3bbtxeBhVOoIWy0kSLGmcyWbsn71aCG0lkCIolNcVdmfS4uVMgebmfB0vH9NeT+hM6+cg/ZlzUMZOaZpzmZ9hIHbAofaibVgoP8v3DAj1CkVL9cMgxKTZaqCQN4Kei8TkhnNehj/STP8m2cLEyYVLrVxWwJkT7lzObWl0inp3BWSymBArMiqSFJN4SMISZamBMPTy8FYp7G/tHS3mB+eY8C3FKbj28BwrQEP3jFBbjwh5EIISlbHZx5wxYSZto2uVmsEDjj8tRrtoO8GmIS15AOqmA5plUaEtxU0NxTK0b8G6lyyh0dOCG5nOR3nujEKuagIedvoINxGrQmI9bywh4XH07U9ggDR9OFFx7zJRzk2GJijpAAIb0z6VRBEkvrYoRy5CbZ/P/dp3JQ8q5K+JaY8/tgqUmsUFRJ3A/LQQsQmXx9yxIUSZwwIdE7U0QTt/6LTWXCkwz+/mj4MWnHuNGC7Rg5A3yXQ06dD2TSGpAiRM4XfrsgV5tW7sz7EOGvgvf40wrM9qxwAabk0xfjcb2VsNOgWRX/7Y0LYdTS1MkPGfd/r/T0couFMmMw2RYjRxjeHvio7Bob1mOqKJwm0hPlsvOFF8SROH/2nXZv+yYj+EermUJcuDHPCIb9MQ5SXrxbceq7JvXwht//LdiOAtWJvkTbRhe0s2vn2/hq+e33TiEDQ+XoiyAStEhwRopRSq9/gU3LTCToIK/eYfa7wmIVvGReQa0lgJKb4xjRYi+4sKb31lxMirCKW5cvkHG2SW2nwMzeXv8/GNik2Yql0HjRLOCkLYRwLIe+NDxhuYC1iEyTnHpNt6GaFOSP2cSdH//k/lPg4Z0Kr8LT3SdOEyl28oKH72FNja9nh0DVEglzHpT5otrSv/MgxoDmnQaJk+AUWKWEx6NE8Y3+aH28XeIZiSCNjkKNPWFmWaQPnLQv4UjB9wjPmVuwUS/lmXtJCad60JHWmt5/dP58yAbKHq/bmiyz0MIBzOOmMPJ8tm9zANlVA0dEywIa/EygoTsWuxm01HwH7LazMX3D0gYJ8FQV4uNdHtYQ972MMe9rCH3Yt9+34HJSe0urEO7nMAAAAASUVORK5CYII=";

  // src/subscreens/deviousPadlockSubscreen.ts
  var putPadlockMinimumRolesNames = {
    [3 /* PUBLIC */]: () => getText("common.minimum_roles.public"),
    [0 /* FRIEND */]: () => getText("common.minimum_roles.friend"),
    [1 /* WHITELIST */]: () => getText("common.minimum_roles.whitelist"),
    [2 /* LOVER */]: () => getText("common.minimum_roles.lover"),
    [4 /* OWNER */]: () => getText("common.minimum_roles.owner")
  };
  var DeviousPadlockSubscreen = class extends BaseSubscreen {
    get name() {
      return getText("common.devious_padlock");
    }
    get buttonText() {
      return getText("common.devious_padlock");
    }
    get buttonIcon() {
      return createElement(LockKeyhole);
    }
    onLoad() {
      this.createCheckbox({
        text: getText("settings.enabled"),
        x: 100,
        y: 300,
        isChecked: !!modStorage.deviousPadlock.state,
        onChange() {
          modStorage.deviousPadlock.state = !modStorage.deviousPadlock.state;
        }
      });
      this.createText({
        text: getText("settings.devious_padlock.minimum_role_to_put_padlock"),
        x: 100,
        y: 420,
        width: 600,
        height: 50
      }).style.textAlign = "center";
      this.createBackNextButton({
        x: 100,
        y: 485,
        width: 600,
        height: 80,
        currentIndex: Object.values(PutPadlockMinimumRole).slice(Object.values(PutPadlockMinimumRole).length / 2).indexOf(modStorage.deviousPadlock.putMinimumRole ?? 3 /* PUBLIC */),
        items: Object.values(PutPadlockMinimumRole).slice(Object.values(PutPadlockMinimumRole).length / 2).map((r) => {
          return [putPadlockMinimumRolesNames[r](), r];
        }),
        onChange(value) {
          modStorage.deviousPadlock.putMinimumRole = value;
        }
      });
      this.createText({
        text: getText("settings.devious_padlock.description"),
        x: 900,
        y: 250,
        width: 800,
        withBackground: true,
        padding: 2
      });
      this.createText({
        text: getText("settings.devious_padlock.escape_tip"),
        x: 900,
        y: 700,
        width: 800,
        fontSize: 2.5,
        padding: 2
      });
    }
  };

  // src/subscreens/remoteControlSubscreen.ts
  var remoteConnectMinimumRolesNames = {
    [0 /* FRIEND */]: () => getText("common.minimum_roles.friend"),
    [1 /* WHITELIST */]: () => getText("common.minimum_roles.whitelist"),
    [2 /* LOVER */]: () => getText("common.minimum_roles.lover"),
    [3 /* OWNER */]: () => getText("common.minimum_roles.owner")
  };
  var RemoteControlSubscreen = class extends BaseSubscreen {
    get name() {
      return getText("settings.remote_control.name");
    }
    get buttonText() {
      return getText("settings.remote_control.name");
    }
    get buttonIcon() {
      return createElement(Radio);
    }
    onLoad() {
      this.createCheckbox({
        text: getText("settings.enabled"),
        x: 100,
        y: 300,
        isChecked: !!modStorage.remoteControl.state,
        onChange() {
          modStorage.remoteControl.state = !modStorage.remoteControl.state;
        }
      });
      this.createCheckbox({
        text: getText("settings.remote_control.notify_others"),
        x: 100,
        y: 400,
        isChecked: modStorage.remoteControl.notifyOthers ?? true,
        onChange() {
          modStorage.remoteControl.notifyOthers = !(modStorage.remoteControl.notifyOthers ?? true);
        }
      });
      this.createText({
        text: getText("settings.remote_control.minimum_role_to_connect_remotely"),
        x: 100,
        y: 520,
        width: 750,
        height: 50
      }).style.textAlign = "center";
      this.createBackNextButton({
        x: 100,
        y: 585,
        width: 750,
        height: 80,
        currentIndex: modStorage.remoteControl.connectMinimumRole ?? 0 /* FRIEND */,
        items: Object.values(RemoteConnectMinimumRole).slice(Object.values(RemoteConnectMinimumRole).length / 2).map((r) => {
          return [remoteConnectMinimumRolesNames[r](), r];
        }),
        onChange(value) {
          modStorage.remoteControl.connectMinimumRole = value;
        }
      });
      this.createText({
        text: getText("settings.remote_control.description"),
        x: 925,
        y: 250,
        width: 800,
        withBackground: true,
        padding: 2
      });
    }
  };

  // src/subscreens/profilesSubscreen.ts
  var ProfilesSubscreen = class extends BaseSubscreen {
    get name() {
      return getText("settings.profiles.name");
    }
    get buttonText() {
      return getText("settings.profiles.name");
    }
    get buttonIcon() {
      return createElement(Save);
    }
    onLoad() {
      if (!modStorage.deviousPadlock?.profiles || modStorage.deviousPadlock.profiles.length === 0) {
        this.createText({
          text: getText("settings.profiles.profiles_empty"),
          width: 900,
          fontSize: 5,
          modules: {
            base: [
              new CenterModule(),
              new StyleModule({
                textAlign: "center"
              })
            ]
          }
        });
        return;
      }
      const container = this.createContainer({
        x: 200,
        y: 220,
        width: 600,
        height: 600,
        scroll: "y",
        modules: {
          content: [
            new StyleModule({
              display: "flex",
              flexDirection: "column",
              rowGap: "0.5em"
            })
          ]
        }
      });
      modStorage.deviousPadlock?.profiles?.forEach((config) => {
        const row = this.createContainer({
          parent: container,
          modules: {
            content: [
              new StyleModule({
                display: "flex",
                alignItems: "center",
                columnGap: "0.5em"
              })
            ]
          }
        });
        this.createButton({
          text: config.name,
          parent: row,
          width: 500,
          height: 80,
          padding: 1,
          onClick: () => {
            this.setSubscreen(
              new DeviousPadlockSettingsSubscreen({
                mode: "edit-sync-config",
                syncConfig: config
              })
            );
          }
        });
        this.createButton({
          icon: "Icons/Trash.png",
          parent: row,
          width: 80,
          height: 80,
          onClick: async () => {
            const result = await dialogsManager.confirm({
              message: getText("dialogs.confirm_config_deleting")
            });
            if (result) {
              modStorage.deviousPadlock.profiles = modStorage.deviousPadlock.profiles?.filter((c) => c.name !== config.name);
              row.remove();
              if (modStorage.deviousPadlock.profiles?.length === 0) this.exit();
            }
          }
        });
      });
    }
    exit() {
      super.exit?.();
      this.setSubscreen(new MainSubscreen2());
      syncStorage();
    }
  };

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/assets/icons/hand.svg
  var hand_default = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="hand"><path fill="%23FFD7C2" d="M25.1562 7.26562C23.875 7.26562 23.2109 8.125 23.2109 8.125V6.20312C23.2109 5.16489 22.2101 4.23438 21.1719 4.23438C19.2188 4.23438 18.8906 5.39062 18.8906 5.39062C18.8906 5.39062 18.875 4.48438 18.7344 3.70312C18.5938 2.92188 17.6007 1.96875 16.5625 1.96875C14.6192 1.96875 13.8828 3.50781 14.0078 5.1875C14.0078 5.1875 13.3594 4.125 11.9531 4.125C10.9149 4.125 9.46094 5.10938 9.63281 7.02344L9.99219 14.5781C9.99219 14.5781 8.95545 13.0114 8.07804 12.5C7.20063 11.9886 5.88786 12.0115 5.17184 12.7812C4.33003 13.6861 4.17703 15.1042 4.78114 15.9688C6.59363 18.5625 9.16622 21.9511 9.65619 23.5312C10.9062 27.5625 14.5625 29.9821 17.9688 29.9821C22.0781 29.9821 26.3919 26.8841 26.7344 22.1094L27.4453 9.98438C27.5234 8.9375 26.7109 7.26562 25.1562 7.26562Z"></path><path fill="%23F3C07B" d="M14.9797 4.67252C14.97 4.16039 14.9583 3.54618 15.088 3.00046 15.1665 2.67019 15.2863 2.42235 15.4463 2.26064 15.5118 2.19443 15.5912 2.1352 15.6917 2.09001 14.3982 2.48447 13.9036 3.78714 14.0078 5.18756 14.0078 5.18756 14.0016 5.17741 13.9891 5.15911L14.2973 12.8014C14.3084 13.0774 14.5411 13.292 14.817 13.2809 15.093 13.2698 15.3076 13.0371 15.2965 12.7612L14.9844 5.02107C14.9842 4.91233 14.982 4.79536 14.9797 4.67252ZM16.1719 2.00006C16.1425 2.00006 16.1141 2.00079 16.0867 2.00222 16.1148 1.99809 16.1432 1.99434 16.1719 1.99097V2.00006ZM18.8902 5.3695C18.8597 5.55531 18.8444 5.74233 18.8438 5.92602L18.563 12.2435C18.5507 12.5194 18.7644 12.7529 19.0403 12.7652 19.3162 12.7775 19.5498 12.5638 19.562 12.2879L19.8438 5.94867V5.93756C19.8438 5.47395 19.974 5.01162 20.2044 4.67982 20.3368 4.48923 20.498 4.34513 20.6908 4.25998 19.1633 4.42995 18.8906 5.39069 18.8906 5.39069L18.8902 5.3695ZM23.2628 8.06491C23.1412 8.48903 23.061 8.9973 23.0318 9.60094L23.0317 9.60415 22.8598 13.7135C22.8483 13.9894 23.0626 14.2224 23.3385 14.234 23.6144 14.2455 23.8474 14.0312 23.8589 13.7553L24.0308 9.64758C24.0831 8.56683 24.3107 7.96243 24.537 7.64192 24.7526 7.33647 24.9686 7.2813 25.0938 7.2813V7.26636C24.0573 7.28913 23.4383 7.87343 23.2628 8.06491ZM10.5571 16.5626C10.3772 16.5661 10.2015 16.4721 10.1088 16.3035 9.61261 15.4014 8.45401 13.3139 7.84583 12.3815 7.92596 12.4171 8.00359 12.4566 8.07807 12.5001 8.95419 13.0107 9.98916 14.5736 9.99222 14.5782L9.63284 7.02351C9.49487 5.48702 10.4046 4.54961 11.3059 4.23956 11.109 4.36388 10.9571 4.55567 10.8397 4.81303 10.6243 5.28525 10.5406 5.96098 10.5926 6.74838L10.5931 6.7561 11.0618 16.0374C11.0757 16.3131 10.8635 16.548 10.5877 16.5619 10.5774 16.5625 10.5672 16.5627 10.5571 16.5626Z"></path></svg>';

  // node_modules/.pnpm/zois-core@2.2.1/node_modules/zois-core/dist/changelogs.js
  var TAGS = {
    fix: {
      name: "Fix",
      coloring: {
        text: "#771515",
        background: "#f9b4b4",
        border: "#ca6565"
      }
    },
    chore: {
      name: "Chore",
      coloring: {
        text: "#464646",
        background: "#f2f2f2",
        border: "#e2e2e2"
      }
    },
    feature: {
      name: "Feature",
      coloring: {
        text: "#147914",
        background: "#cbffcbc7",
        border: "#4eea4e"
      }
    },
    localization: {
      name: "Localization",
      coloring: {
        text: "#09093e",
        background: "#a1e0f4",
        border: "#66adec"
      }
    }
  };
  function showChangelogModal() {
    const changelog = MOD_DATA.changelog;
    const { data } = changelog;
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        font-family: ${CommonGetFontName()};
    `;
    const modal = document.createElement("div");
    modal.style.cssText = `
        background: #ffffff;
        color: #1f2937;
        width: 90%;
        max-width: 720px;
        max-height: 85vh;
        border-radius: 12px;
        box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;
    const header = document.createElement("div");
    header.style.cssText = `
        padding: 0.65em;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    const title = document.createElement("h2");
    title.textContent = `Changelog \xB7 ${MOD_DATA.name} v${MOD_DATA.version}`;
    title.style.cssText = "margin: 0; font-size: 1.5rem; font-weight: 600;";
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "\u2715";
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        padding: 4px 8px;
        border-radius: 6px;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = "#1f2937";
    closeBtn.onmouseout = () => closeBtn.style.color = "#6b7280";
    header.appendChild(title);
    header.appendChild(closeBtn);
    const content = document.createElement("div");
    content.style.cssText = `
        padding: 16px 24px;
        overflow-y: auto;
        flex: 1;
    `;
    const contributorsTitle = document.createElement("p");
    contributorsTitle.style.cssText = `
        font-size: 22px;
        margin: 0;
    `;
    contributorsTitle.textContent = "Contributors";
    const contributorsList = document.createElement("div");
    contributorsList.style.display = "flex";
    contributorsList.style.justifyContent = "center";
    contributorsList.style.flexWrap = "wrap";
    contributorsList.style.gap = "16px";
    contributorsList.style.padding = "16px";
    for (const contributor of data.contributors) {
      const container = document.createElement("div");
      container.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;  
        `;
      const imageContainer = document.createElement("div");
      imageContainer.style.cssText = `
            position: relative;
            width: 100px;
            height: 100px;
            border: 1px solid black;
            border-radius: 50%;
            overflow: hidden;
        `;
      const handGrabIcon = document.createElement("img");
      handGrabIcon.src = hand_default;
      handGrabIcon.style.cssText = `
            position: absolute;
            top: 0;
            left: 35%;
            width: 40px;
            height: 40px;
            line-height: 1;
            pointer-events: none;
            filter: drop-shadow(0 3px 4px rgba(0,0,0,0.45));
            z-index: 10;
            transform-origin: center bottom;
            animation: zcStrokeUD 1.3s ease-in-out infinite;
        `;
      const hearts = [
        { left: "18%", top: "35%", duration: "2.5s", size: "16px" },
        { left: "25%", top: "10%", duration: "2s", size: "10px" },
        { left: "40%", top: "40%", duration: "1.0s", size: "12px" },
        { left: "55%", top: "28%", duration: "4.5s", size: "14px" },
        { left: "35%", top: "48%", duration: "1.0s", size: "15px" },
        { left: "65%", top: "42%", duration: "1.5s", size: "13px" }
      ];
      hearts.forEach((h) => {
        const heart = createElement(Heart, { fill: "#ff4d6d", stroke: "#ff4d6d" });
        heart.style.cssText = `
                position: absolute;
                pointer-events: none;
                z-index: 5;
                animation: zcFloatHeart ${h.duration} ease-out infinite;
                left: ${h.left};
                top: ${h.top};
                width: ${h.size};
                height: ${h.size};
            `;
        imageContainer.append(heart);
      });
      const image = document.createElement("img");
      image.src = contributor.avatar_url;
      image.style.cssText = `
            width: 100%;
            height: 100%;
            border-radius: 50%;
        `;
      imageContainer.append(image, handGrabIcon);
      const name = document.createElement("span");
      name.textContent = contributor.name;
      name.style.textAlign = "center";
      container.append(imageContainer, name);
      if (contributor.is_owner) {
        const ownerLabelContainer = document.createElement("div");
        ownerLabelContainer.style.cssText = `
                display: flex;
                align-items: center;
                gap: 6px;
                border-radius: 6px;
                padding: 2px 4px;
                font-size: 10px;
                background: #fbfb142e;
                border: 1px solid #60600a;
            `;
        const crown = createElement(Crown, { width: "10px", height: "10px", fill: "#ffe300" });
        const label = document.createElement("span");
        label.textContent = "Project owner";
        ownerLabelContainer.append(crown, label);
        container.append(ownerLabelContainer);
      }
      contributorsList.append(container);
    }
    const changesTitle = document.createElement("p");
    changesTitle.style.cssText = `
        font-size: 22px;
        margin: 0;
    `;
    changesTitle.textContent = "Changes";
    const commitsList = document.createElement("div");
    commitsList.style.display = "flex";
    commitsList.style.flexDirection = "column";
    commitsList.style.gap = "16px";
    commitsList.style.marginTop = "16px";
    for (const commitData of data.changes) {
      const commitElement = createCommitElement(data, commitData.sha);
      if (commitElement) commitsList.append(commitElement);
    }
    content.append(contributorsTitle, contributorsList, changesTitle, commitsList);
    modal.append(header);
    modal.append(content);
    overlay.append(modal);
    document.body.append(overlay);
    const exitHandler = () => {
      document.removeEventListener("keydown", keyDownHandler, { capture: true });
      document.body.removeChild(overlay);
    };
    const keyDownHandler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        exitHandler();
      }
    };
    overlay.onclick = (e) => {
      if (e.target === overlay) exitHandler();
    };
    closeBtn.onclick = exitHandler;
    document.addEventListener("keydown", keyDownHandler, { capture: true });
  }
  function createCommitElement(changelogData, commitSha) {
    try {
      const commit = changelogData.changes.find((c) => c.sha === commitSha);
      if (!commit) {
        logger.warn(`Commit ${commitSha} is not exists in changelog bundle`);
        return;
      }
      const author = changelogData.contributors.find((c) => c.name === commit?.author);
      if (!author) {
        logger.warn(`Author ${commit.author} is not exists in changelog bundle`);
        return;
      }
      const commitWrapper = document.createElement("div");
      commitWrapper.style.cssText = `
            background: #e8e8f4;
            border-radius: 8px;
        `;
      const commitContainer = document.createElement("div");
      commitContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: white;
            transition: all 0.2s;
        `;
      commitWrapper.append(commitContainer);
      commitContainer.onmouseover = () => commitContainer.style.borderColor = "#3b82f6";
      commitContainer.onmouseout = () => commitContainer.style.borderColor = "#e5e7eb";
      const avatarAndInfo = document.createElement("div");
      avatarAndInfo.style.cssText = `
            display: flex;
            gap: 12px;
            align-items: center;
        `;
      commitContainer.append(avatarAndInfo);
      const avatar = document.createElement("img");
      avatar.src = author.avatar_url;
      avatar.style.cssText = `
            width: 48px;
            height: 48px;
            border-radius: 50%;
            flex-shrink: 0;
        `;
      avatarAndInfo.append(avatar);
      const info = document.createElement("div");
      info.style.flex = "1";
      info.style.position = "relative";
      avatarAndInfo.append(info);
      const authorName = document.createElement("div");
      authorName.textContent = author.name;
      authorName.style.fontWeight = "600";
      authorName.style.marginBottom = "4px";
      info.append(authorName);
      const message = document.createElement("div");
      message.textContent = commit.message;
      message.style.cssText = "color: #374151; line-height: 1.4;";
      info.append(message);
      if (commit.note) {
        const note = document.createElement("div");
        note.textContent = commit.note ?? "";
        note.style.cssText = "color: rgb(69, 75, 83); line-height: 1; font-size: 0.8em; padding: 4px;";
        commitWrapper.append(note);
      }
      const tags = document.createElement("div");
      tags.style.cssText = "display: flex; gap: 4px; position: absolute; right: 2px; top: 2px;";
      info.append(tags);
      for (const tag of commit.tags) {
        const tagEl = document.createElement("p");
        tagEl.textContent = TAGS[tag].name;
        addDynamicClass(tagEl, {
          base: {
            fontSize: "0.85em",
            padding: "2px 6px",
            margin: "0",
            borderRadius: "6px",
            background: TAGS[tag].coloring.background,
            color: TAGS[tag].coloring.text,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: TAGS[tag].coloring.border
          }
        });
        tags.append(tagEl);
      }
      commitContainer.style.cursor = "pointer";
      commitContainer.onclick = () => {
        window.open(commit.commit_url, "_blank");
      };
      return commitWrapper;
    } catch (err) {
      logger.error(`Failed to load commit ${commitSha}:`, err);
      return null;
    }
  }

  // src/subscreens/mainSubscreen.ts
  var MainSubscreen2 = class extends BaseSubscreen {
    get name() {
      return "Devious Obligate Good Stuff";
    }
    onLoad() {
      [
        new DeviousPadlockSubscreen(),
        new ProfilesSubscreen(),
        new RemoteControlSubscreen()
      ].forEach((s, i) => {
        const btn = this.createButton({
          text: s.buttonText,
          x: 220,
          y: 240 + i * 110,
          width: 700,
          padding: 2,
          height: 90,
          icon: s.buttonIcon,
          modules: {
            text: [
              new StyleModule({
                maxWidth: "75%"
              })
            ]
          }
        });
        btn.style.fontWeight = "bold";
        btn.addEventListener("click", () => {
          this.setSubscreen(s);
        });
      });
      this.createCard({
        name: getText("common.version"),
        value: MOD_DATA.version,
        anchor: "bottom-right",
        icon: createElement(GitPullRequest),
        x: 80,
        y: 65,
        width: 220,
        modules: {
          value: [
            new TypeModule({ duration: 850 })
          ]
        }
      });
      this.createButton({
        x: 80,
        y: 200,
        width: 90,
        height: 90,
        anchor: "bottom-right",
        icon: createElement(Bug),
        tooltip: {
          text: getText("tooltips.report_bug_or_suggest_feature"),
          position: "left"
        },
        href: GITHUB_REPO_URL + "/issues",
        modules: {
          base: [
            new StyleModule({
              zIndex: "10"
            })
          ]
        }
      });
      this.createButton({
        x: 80,
        y: 300,
        width: 90,
        height: 90,
        anchor: "bottom-right",
        icon: createElement(CodeXml),
        tooltip: {
          text: getText("tooltips.view_source_code_on_github"),
          position: "left"
        },
        href: GITHUB_REPO_URL,
        modules: {
          base: [
            new StyleModule({
              zIndex: "10"
            })
          ]
        }
      });
      this.createButton({
        x: 80,
        y: 400,
        width: 90,
        height: 90,
        anchor: "bottom-right",
        icon: createElement(SquarePen),
        variant: "filled",
        tooltip: {
          text: getText("tooltips.view_changelog"),
          position: "left"
        },
        onClick: showChangelogModal
      });
    }
    exit() {
      super.exit();
      syncStorage();
      this.setSubscreen(null);
      PreferenceSubscreenExtensionsClear();
    }
  };

  // src/modules/settingsMenu.ts
  function loadSettingsMenu() {
    PreferenceRegisterExtensionSetting({
      Identifier: "DOGS",
      ButtonText: "DOGS Settings",
      Image: slavery_default,
      click: () => {
        getCurrentSubscreen()?.click();
      },
      run: () => {
        getCurrentSubscreen()?.run();
      },
      resize: () => {
        getCurrentSubscreen()?.resize();
      },
      exit: () => false,
      load: () => {
        setSubscreen(new MainSubscreen2());
      }
    });
  }

  // package.json
  var version2 = "2.3.2";

  // src/modules/dialogs.ts
  function loadDialogs() {
    hookFunction("CharacterBuildDialog", HookPriority.OBSERVE, (args, next) => {
      if (args[0].AccountName !== "NPC_MagicSchoolLaboratory_Teacher") return next(args);
      next(args);
      const price = getPadlocksAmount(Player) * 750;
      args[0].Dialog.unshift(
        {
          Stage: "0",
          NextStage: `${MOD_DATA.name}_MagicSchoolLaboratoryTeacherRescue`,
          Option: "Can you help me with Devious Padlock?",
          Result: "(She giggles.) I see you are in trouble. I can remove this padlock using my magic at the rate of 1 padlock for 750 dollars. (She winks.)",
          Group: null,
          Prerequisite: `${MOD_DATA.name}_PlayerCanBeRescued`,
          Trait: null,
          Function: null
        },
        {
          Stage: `${MOD_DATA.name}_MagicSchoolLaboratoryTeacherRescue`,
          NextStage: "0",
          Option: `Pay ${price}$`,
          Result: "(She casts a spell and the devious padlocks disappears.) There you go! Be more careful next time, okay?",
          Group: null,
          Prerequisite: `${MOD_DATA.name}_PlayerHasMoney`,
          Trait: null,
          Function: `${MOD_DATA.name}_StartRescue`
        },
        {
          Stage: `${MOD_DATA.name}_MagicSchoolLaboratoryTeacherRescue`,
          NextStage: "0",
          Option: "I don't have that much money.",
          Result: "Not my problem, come back when you have enough money.",
          Group: null,
          Prerequisite: null,
          Trait: null,
          Function: null
        }
      );
    });
    hookFunction("DialogPrerequisite", HookPriority.OBSERVE, (args, next) => {
      if (!args[0]?.Prerequisite?.startsWith(`${MOD_DATA.name}_`)) return next(args);
      switch (args[0].Prerequisite.replace(`${MOD_DATA.name}_`, "")) {
        case "PlayerHasMoney":
          const price = getPadlocksAmount(Player) * 750;
          return Player.Money >= price;
        case "PlayerCanBeRescued":
          if (!modStorage.deviousPadlock.itemGroups) return false;
          return Object.values(modStorage.deviousPadlock.itemGroups).length > 0 && Player.GetDifficulty() < 2;
        default:
          return next(args);
      }
    });
    hookFunction("CommonDynamicFunctionParams", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (!args[0]?.startsWith(`${MOD_DATA.name}_`)) return next(args);
      if (CurrentCharacter?.ID !== MagicSchoolLaboratoryTeacher?.ID) return next(args);
      const price = getPadlocksAmount(Player) * 750;
      switch (args[0].replace(`${MOD_DATA.name}_`, "")) {
        case "StartRescue":
          delete modStorage.deviousPadlock.itemGroups;
          delete modStorage.deviousPadlock.synced;
          for (const item of Player.Appearance) {
            if (isDeviousLock(item)) {
              InventoryUnlock(Player, item);
            }
          }
          DialogChangeMoney(price * -1);
          ServerPlayerSync();
          ServerPlayerAppearanceSync();
          syncStorage();
      }
    });
    hookFunction("MagicSchoolLaboratoryLoad", HookPriority.OVERRIDE_BEHAVIOR, (args, next) => {
      if (MagicSchoolLaboratoryTeacher) {
        CharacterLoadCSVDialog(MagicSchoolLaboratoryTeacher);
      }
      return next(args);
    });
  }

  // changelog.json
  var changelog_default = {
    generated_at: "2026-10-28T09:35:36.059Z",
    contributors: [
      {
        name: "Zoi",
        avatar_url: "https://avatars.githubusercontent.com/u/170041826?v=4",
        is_owner: true
      }
    ],
    changes: [
      {
        message: "Disable padlock until I completely fix it",
        sha: "000692af943c75a9b692dd61b127cab1ec35b069",
        author: "Zoi",
        date: "2026-10-28T09:33:47Z",
        tags: [],
        commit_url: "https://github.com/FurryZoi/Devious-Obligate-Great-Stuff/commit/000692af943c75a9b692dd61b127cab1ec35b069"
      }
    ]
  };

  // src/index.ts
  var hasInitialized = false;
  bootstrap({
    name: "DOGS",
    fullName: "Devious Obligate Great Stuff",
    key: "DOGS",
    version: version2,
    repository: GITHUB_REPO_URL,
    fontFamily: CommonGetFontName(),
    subscreens: {
      DeviousPadlockSubscreen,
      ProfilesSubscreen,
      MainSubscreen: MainSubscreen2,
      RemoteControlSubscreen
    },
    localization: {
      locales: {
        default: "en",
        supported: ["en", "ru"]
      },
      translationsFolderPath: false ? `http://localhost:8000/localization` : "https://furryzoi.github.io/Devious-Obligate-Great-Stuff/localization"
    },
    changelog: {
      data: changelog_default
    },
    onReady: initializeDOGS
  });
  function initializeDOGS() {
    if (hasInitialized) return;
    hasInitialized = true;
    initStorage();
    loadSettingsMenu();
    loadDialogs();
    loadRemoteControl();
    logger.log(`Ready! v${version2}`);
    toastsManager.success({
      title: getText(`toasts.mod_loaded`, { name: "DOGS" }),
      message: `v${version2}`,
      duration: 4e3
    });
    if (isVersionNewer(MOD_DATA.version, modStorage.version)) {
      waitFor(() => !!document.getElementById("InputChat")).then(() => {
        modStorage.version = version2;
        syncStorage();
        const text = document.createElement("p");
        text.style.margin = "0";
        text.textContent = "DOGS was updated, click here to read changelog";
        text.onclick = showChangelogModal;
        messagesManager.sendLocal(text);
      });
    }
  }
})();
/*! Bundled license information:

reflect-metadata/Reflect.js:
  (*! *****************************************************************************
  Copyright (C) Microsoft. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0
  
  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.
  
  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** *)

lucide/dist/esm/defaultAttributes.mjs:
lucide/dist/esm/createElement.mjs:
lucide/dist/esm/icons/book-text.mjs:
lucide/dist/esm/icons/bug.mjs:
lucide/dist/esm/icons/check.mjs:
lucide/dist/esm/icons/chevron-down.mjs:
lucide/dist/esm/icons/circle-alert.mjs:
lucide/dist/esm/icons/circle-check.mjs:
lucide/dist/esm/icons/circle-x.mjs:
lucide/dist/esm/icons/code-xml.mjs:
lucide/dist/esm/icons/crown.mjs:
lucide/dist/esm/icons/external-link.mjs:
lucide/dist/esm/icons/git-pull-request.mjs:
lucide/dist/esm/icons/heart.mjs:
lucide/dist/esm/icons/info.mjs:
lucide/dist/esm/icons/lock-keyhole.mjs:
lucide/dist/esm/icons/radio.mjs:
lucide/dist/esm/icons/rotate-ccw.mjs:
lucide/dist/esm/icons/save.mjs:
lucide/dist/esm/icons/square-pen.mjs:
lucide/dist/esm/icons/terminal.mjs:
lucide/dist/esm/icons/trash-2.mjs:
lucide/dist/esm/lucide.mjs:
  (**
   * @license lucide v1.29.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" --repo lodash/lodash#4.18.1 -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
//# sourceMappingURL=bundle.js.map
