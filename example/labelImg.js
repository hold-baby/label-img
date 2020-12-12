(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.LabelImg = factory());
}(this, (function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    }
    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var tslib_es6 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        __extends: __extends,
        get __assign () { return __assign; },
        __rest: __rest,
        __decorate: __decorate,
        __param: __param,
        __metadata: __metadata,
        __awaiter: __awaiter,
        __generator: __generator,
        __createBinding: __createBinding,
        __exportStar: __exportStar,
        __values: __values,
        __read: __read,
        __spread: __spread,
        __spreadArrays: __spreadArrays,
        __await: __await,
        __asyncGenerator: __asyncGenerator,
        __asyncDelegator: __asyncDelegator,
        __asyncValues: __asyncValues,
        __makeTemplateObject: __makeTemplateObject,
        __importStar: __importStar,
        __importDefault: __importDefault,
        __classPrivateFieldGet: __classPrivateFieldGet,
        __classPrivateFieldSet: __classPrivateFieldSet
    });

    var name = "label-img";
    var version = "0.0.33";
    var description = "image annotation tool with javascript";
    var main = "dist/labelImg.js";
    var build = "dist/labelImg.min.js";
    var eg = "example/labelImg.js";
    var scripts = {
    	build: "rollup -c rollup.config.build.js",
    	dev: "rollup -c"
    };
    var repository = {
    	type: "git",
    	url: "git+https://github.com/hold-baby/label-img.git"
    };
    var keywords = [
    	"labelme",
    	"annotate",
    	"deep-learning",
    	"image-annotation",
    	"label-image"
    ];
    var author = "hold-baby";
    var license = "MIT";
    var bugs = {
    	url: "https://github.com/hold-baby/label-img/issues"
    };
    var homepage = "https://github.com/hold-baby/label-img#readme";
    var devDependencies = {
    	"@rollup/plugin-commonjs": "17.0.0",
    	"@rollup/plugin-json": "4.1.0",
    	"@rollup/plugin-node-resolve": "7.1.3",
    	"@rollup/plugin-typescript": "6.1.0",
    	"@types/lodash": "4.14.165",
    	dayjs: "1.9.7",
    	rollup: "2.34.2",
    	"rollup-plugin-banner2": "1.0.1",
    	"rollup-plugin-terser": "7.0.2",
    	tslib: "2.0.3",
    	typescript: "4.1.2"
    };
    var dependencies = {
    	lodash: "4.17.20"
    };
    var require$$0 = {
    	name: name,
    	version: version,
    	description: description,
    	main: main,
    	build: build,
    	eg: eg,
    	scripts: scripts,
    	repository: repository,
    	keywords: keywords,
    	author: author,
    	license: license,
    	bugs: bugs,
    	homepage: homepage,
    	devDependencies: devDependencies,
    	dependencies: dependencies
    };

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function getAugmentedNamespace(n) {
    	if (n.__esModule) return n;
    	var a = Object.defineProperty({}, '__esModule', {value: true});
    	Object.keys(n).forEach(function (k) {
    		var d = Object.getOwnPropertyDescriptor(n, k);
    		Object.defineProperty(a, k, d.get ? d : {
    			enumerable: true,
    			get: function () {
    				return n[k];
    			}
    		});
    	});
    	return a;
    }

    function createCommonjsModule(fn) {
      var module = { exports: {} };
    	return fn(module, module.exports), module.exports;
    }

    var EventReceiver_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.antLvs = exports.AntLv = exports.antMouseEvents = exports.EAntMouseEvents = void 0;
    var EAntMouseEvents;
    (function (EAntMouseEvents) {
        EAntMouseEvents["mousedown"] = "mousedown";
        EAntMouseEvents["mouseenter"] = "mouseenter";
        EAntMouseEvents["mouseleave"] = "mouseleave";
        EAntMouseEvents["mousemove"] = "mousemove";
        EAntMouseEvents["mouseout"] = "mouseout";
        EAntMouseEvents["mouseover"] = "mouseover";
        EAntMouseEvents["mouseup"] = "mouseup";
        EAntMouseEvents["dblclick"] = "dblclick";
        EAntMouseEvents["click"] = "click";
        EAntMouseEvents["auxclick"] = "auxclick";
        EAntMouseEvents["contextmenu"] = "contextmenu";
        EAntMouseEvents["wheel"] = "wheel";
    })(EAntMouseEvents = exports.EAntMouseEvents || (exports.EAntMouseEvents = {}));
    exports.antMouseEvents = Object.keys(EAntMouseEvents);
    var AntLv;
    (function (AntLv) {
        AntLv["top"] = "top";
        AntLv["mid"] = "mid";
        AntLv["bot"] = " bot";
    })(AntLv = exports.AntLv || (exports.AntLv = {}));
    exports.antLvs = Object.keys(AntLv);
    var EventReceiver = /** @class */ (function () {
        function EventReceiver() {
            this.eventMap = {};
        }
        EventReceiver.prototype.on = function (eventLv, callback) {
            var _a = eventLv.split("."), type = _a[0], _b = _a[1], lv = _b === void 0 ? "mid" : _b;
            var kType = type + "." + lv;
            var antEvent = {
                lv: lv,
                type: type,
                callback: callback,
                target: this
            };
            var eMap = this.eventMap;
            if (eMap[kType]) {
                eMap[kType].push(antEvent);
            }
            else {
                eMap[kType] = [antEvent];
            }
        };
        EventReceiver.prototype.getEventsByType = function (type, level) {
            var lv = level || "mid";
            var eMap = this.eventMap[type + "." + lv];
            return eMap || [];
        };
        return EventReceiver;
    }());
    exports.default = EventReceiver;

    });

    var tslib_1 = /*@__PURE__*/getAugmentedNamespace(tslib_es6);

    var EventReceiver_1$1 = tslib_1.__importDefault(EventReceiver_1);
    var dfOrigin = [0, 0];
    var Image = /** @class */ (function (_super) {
        tslib_1.__extends(Image, _super);
        function Image(origin) {
            var _this = _super.call(this) || this;
            _this.origin = origin || dfOrigin;
            _this.complate = false;
            _this.el = null;
            return _this;
        }
        Image.prototype.load = function (source) {
            var _this = this;
            this.origin = dfOrigin;
            return new Promise(function (resolve, reject) {
                _this.complate = false;
                var img = document.createElement("img");
                new Promise(function (resolve, reject) {
                    var src = source;
                    if (source instanceof File) {
                        var reader = new FileReader();
                        reader.readAsDataURL(source);
                        reader.onload = function (e) {
                            var _a;
                            src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                            resolve(src);
                        };
                        reader.onerror = function () {
                            reject();
                            throw "图片加载错误";
                        };
                    }
                    else if (typeof source === "string") {
                        resolve(src);
                    }
                }).then(function (src) {
                    img.src = src;
                    img.onload = function () {
                        _this.complate = true;
                        _this.el = img;
                        resolve(img);
                    };
                    img.onerror = function () {
                        reject();
                        throw "图片加载错误";
                    };
                });
            });
        };
        Image.prototype.getEl = function () {
            return this.el;
        };
        Image.prototype.getSize = function () {
            if (this.el) {
                var _a = this.el, width = _a.width, height = _a.height;
                return [width, height];
            }
            return dfOrigin;
        };
        Image.prototype.getOrigin = function () {
            return this.origin;
        };
        Image.prototype.getPosition = function (scale) {
            if (scale === void 0) { scale = 1; }
            var _a = this.getSize(), w = _a[0], h = _a[1];
            var sw = w * scale;
            var sh = h * scale;
            var _b = this.origin, x = _b[0], y = _b[1];
            var postion = [
                this.origin,
                [x + sw, y],
                [x + sw, y + sh],
                [x, y + sh]
            ];
            return postion;
        };
        Image.prototype.getRelative = function (offset, scale) {
            var px = offset[0], py = offset[1];
            var _a = this.origin, ox = _a[0], oy = _a[1];
            var point = [
                (px - ox) / scale,
                (py - oy) / scale
            ];
            return point;
        };
        // shape相对于图片的坐标转换成相对于画布的坐标
        Image.prototype.getRelativePositions = function (positions, scale) {
            var orgin = this.getOrigin();
            var ox = orgin[0], oy = orgin[1];
            var rp = positions.map(function (_a) {
                var sx = _a[0], sy = _a[1];
                var cx = ox + sx * scale;
                var cy = oy + sy * scale;
                return [cx, cy];
            });
            return rp;
        };
        Image.prototype.setOrigin = function (origin) {
            this.origin = origin;
        };
        return Image;
    }(EventReceiver_1$1.default));
    var _default = Image;


    var Image_1 = /*#__PURE__*/Object.defineProperty({
    	default: _default
    }, '__esModule', {value: true});

    var utils = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isInCircle = exports.getDistance = exports.getRectPoints = exports.isInSide = void 0;
    var isInSide = function (point, vs) {
        var x = point[0], y = point[1];
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect)
                inside = !inside;
        }
        return inside;
    };
    exports.isInSide = isInSide;
    var getRectPoints = function (start, end) {
        var p0 = start;
        var p1 = [end[0], start[1]];
        var p2 = end;
        var p3 = [start[0], end[1]];
        var ps = [p0, p1, p2, p3];
        return ps;
    };
    exports.getRectPoints = getRectPoints;
    var getDistance = function (p1, p2) {
        var x = p2[0] - p1[0];
        var y = p2[1] - p1[1];
        var x2 = Math.pow(x, 2);
        var y2 = Math.pow(y, 2);
        var cr = Math.abs(Math.sqrt(x2 + y2));
        return cr;
    };
    exports.getDistance = getDistance;
    // 判断是否在圆内
    var isInCircle = function (p1, p2, r) {
        return exports.getDistance(p1, p2) < r;
    };
    exports.isInCircle = isInCircle;
    exports.default = { isInSide: exports.isInSide, getRectPoints: exports.getRectPoints, getDistance: exports.getDistance, isInCircle: exports.isInCircle };

    });

    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }

    var _listCacheClear = listCacheClear;

    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }

    var eq_1 = eq;

    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq_1(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }

    var _assocIndexOf = assocIndexOf;

    /** Used for built-in method references. */
    var arrayProto = Array.prototype;

    /** Built-in value references. */
    var splice = arrayProto.splice;

    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

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

    var _listCacheDelete = listCacheDelete;

    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      return index < 0 ? undefined : data[index][1];
    }

    var _listCacheGet = listCacheGet;

    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
      return _assocIndexOf(this.__data__, key) > -1;
    }

    var _listCacheHas = listCacheHas;

    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
      var data = this.__data__,
          index = _assocIndexOf(data, key);

      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }

    var _listCacheSet = listCacheSet;

    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `ListCache`.
    ListCache.prototype.clear = _listCacheClear;
    ListCache.prototype['delete'] = _listCacheDelete;
    ListCache.prototype.get = _listCacheGet;
    ListCache.prototype.has = _listCacheHas;
    ListCache.prototype.set = _listCacheSet;

    var _ListCache = ListCache;

    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
      this.__data__ = new _ListCache;
      this.size = 0;
    }

    var _stackClear = stackClear;

    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
      var data = this.__data__,
          result = data['delete'](key);

      this.size = data.size;
      return result;
    }

    var _stackDelete = stackDelete;

    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
      return this.__data__.get(key);
    }

    var _stackGet = stackGet;

    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
      return this.__data__.has(key);
    }

    var _stackHas = stackHas;

    /** Detect free variable `global` from Node.js. */

    var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

    var _freeGlobal = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = _freeGlobal || freeSelf || Function('return this')();

    var _root = root;

    /** Built-in value references. */
    var Symbol$1 = _root.Symbol;

    var _Symbol = Symbol$1;

    /** Used for built-in method references. */
    var objectProto = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto.toString;

    /** Built-in value references. */
    var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag),
          tag = value[symToStringTag];

      try {
        value[symToStringTag] = undefined;
        var unmasked = true;
      } catch (e) {}

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

    var _getRawTag = getRawTag;

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString$1.call(value);
    }

    var _objectToString = objectToString;

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
    }

    var _baseGetTag = baseGetTag;

    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    var isObject_1 = isObject;

    /** `Object#toString` result references. */
    var asyncTag = '[object AsyncFunction]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        proxyTag = '[object Proxy]';

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      if (!isObject_1(value)) {
        return false;
      }
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in Safari 9 which returns 'object' for typed arrays and other constructors.
      var tag = _baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }

    var isFunction_1 = isFunction;

    /** Used to detect overreaching core-js shims. */
    var coreJsData = _root['__core-js_shared__'];

    var _coreJsData = coreJsData;

    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function() {
      var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
      return uid ? ('Symbol(src)_1.' + uid) : '';
    }());

    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
      return !!maskSrcKey && (maskSrcKey in func);
    }

    var _isMasked = isMasked;

    /** Used for built-in method references. */
    var funcProto = Function.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to convert.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }

    var _toSource = toSource;

    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;

    /** Used for built-in method references. */
    var funcProto$1 = Function.prototype,
        objectProto$2 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$1 = funcProto$1.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
      if (!isObject_1(value) || _isMasked(value)) {
        return false;
      }
      var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
      return pattern.test(_toSource(value));
    }

    var _baseIsNative = baseIsNative;

    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
      return object == null ? undefined : object[key];
    }

    var _getValue = getValue;

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = _getValue(object, key);
      return _baseIsNative(value) ? value : undefined;
    }

    var _getNative = getNative;

    /* Built-in method references that are verified to be native. */
    var Map = _getNative(_root, 'Map');

    var _Map = Map;

    /* Built-in method references that are verified to be native. */
    var nativeCreate = _getNative(Object, 'create');

    var _nativeCreate = nativeCreate;

    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
      this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
      this.size = 0;
    }

    var _hashClear = hashClear;

    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }

    var _hashDelete = hashDelete;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';

    /** Used for built-in method references. */
    var objectProto$3 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
      var data = this.__data__;
      if (_nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
      }
      return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
    }

    var _hashGet = hashGet;

    /** Used for built-in method references. */
    var objectProto$4 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
      var data = this.__data__;
      return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
    }

    var _hashHas = hashHas;

    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
      return this;
    }

    var _hashSet = hashSet;

    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `Hash`.
    Hash.prototype.clear = _hashClear;
    Hash.prototype['delete'] = _hashDelete;
    Hash.prototype.get = _hashGet;
    Hash.prototype.has = _hashHas;
    Hash.prototype.set = _hashSet;

    var _Hash = Hash;

    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        'hash': new _Hash,
        'map': new (_Map || _ListCache),
        'string': new _Hash
      };
    }

    var _mapCacheClear = mapCacheClear;

    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
      var type = typeof value;
      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
    }

    var _isKeyable = isKeyable;

    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
      var data = map.__data__;
      return _isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
    }

    var _getMapData = getMapData;

    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
      var result = _getMapData(this, key)['delete'](key);
      this.size -= result ? 1 : 0;
      return result;
    }

    var _mapCacheDelete = mapCacheDelete;

    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
      return _getMapData(this, key).get(key);
    }

    var _mapCacheGet = mapCacheGet;

    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
      return _getMapData(this, key).has(key);
    }

    var _mapCacheHas = mapCacheHas;

    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
      var data = _getMapData(this, key),
          size = data.size;

      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }

    var _mapCacheSet = mapCacheSet;

    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
      var index = -1,
          length = entries == null ? 0 : entries.length;

      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }

    // Add methods to `MapCache`.
    MapCache.prototype.clear = _mapCacheClear;
    MapCache.prototype['delete'] = _mapCacheDelete;
    MapCache.prototype.get = _mapCacheGet;
    MapCache.prototype.has = _mapCacheHas;
    MapCache.prototype.set = _mapCacheSet;

    var _MapCache = MapCache;

    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;

    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof _ListCache) {
        var pairs = data.__data__;
        if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new _MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }

    var _stackSet = stackSet;

    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
      var data = this.__data__ = new _ListCache(entries);
      this.size = data.size;
    }

    // Add methods to `Stack`.
    Stack.prototype.clear = _stackClear;
    Stack.prototype['delete'] = _stackDelete;
    Stack.prototype.get = _stackGet;
    Stack.prototype.has = _stackHas;
    Stack.prototype.set = _stackSet;

    var _Stack = Stack;

    var defineProperty = (function() {
      try {
        var func = _getNative(Object, 'defineProperty');
        func({}, '', {});
        return func;
      } catch (e) {}
    }());

    var _defineProperty = defineProperty;

    /**
     * The base implementation of `assignValue` and `assignMergeValue` without
     * value checks.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function baseAssignValue(object, key, value) {
      if (key == '__proto__' && _defineProperty) {
        _defineProperty(object, key, {
          'configurable': true,
          'enumerable': true,
          'value': value,
          'writable': true
        });
      } else {
        object[key] = value;
      }
    }

    var _baseAssignValue = baseAssignValue;

    /**
     * This function is like `assignValue` except that it doesn't assign
     * `undefined` values.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignMergeValue(object, key, value) {
      if ((value !== undefined && !eq_1(object[key], value)) ||
          (value === undefined && !(key in object))) {
        _baseAssignValue(object, key, value);
      }
    }

    var _assignMergeValue = assignMergeValue;

    /**
     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;

        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    var _createBaseFor = createBaseFor;

    /**
     * The base implementation of `baseForOwn` which iterates over `object`
     * properties returned by `keysFunc` and invokes `iteratee` for each property.
     * Iteratee functions may exit iteration early by explicitly returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = _createBaseFor();

    var _baseFor = baseFor;

    var _cloneBuffer = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined,
        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length,
          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

      buffer.copy(result);
      return result;
    }

    module.exports = cloneBuffer;
    });

    /** Built-in value references. */
    var Uint8Array = _root.Uint8Array;

    var _Uint8Array = Uint8Array;

    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
      new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
      return result;
    }

    var _cloneArrayBuffer = cloneArrayBuffer;

    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
      var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }

    var _cloneTypedArray = cloneTypedArray;

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    var _copyArray = copyArray;

    /** Built-in value references. */
    var objectCreate = Object.create;

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} proto The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject_1(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());

    var _baseCreate = baseCreate;

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    var _overArg = overArg;

    /** Built-in value references. */
    var getPrototype = _overArg(Object.getPrototypeOf, Object);

    var _getPrototype = getPrototype;

    /** Used for built-in method references. */
    var objectProto$5 = Object.prototype;

    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
      var Ctor = value && value.constructor,
          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$5;

      return value === proto;
    }

    var _isPrototype = isPrototype;

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      return (typeof object.constructor == 'function' && !_isPrototype(object))
        ? _baseCreate(_getPrototype(object))
        : {};
    }

    var _initCloneObject = initCloneObject;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    var isObjectLike_1 = isObjectLike;

    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]';

    /**
     * The base implementation of `_.isArguments`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     */
    function baseIsArguments(value) {
      return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
    }

    var _baseIsArguments = baseIsArguments;

    /** Used for built-in method references. */
    var objectProto$6 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

    /** Built-in value references. */
    var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
      return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
    };

    var isArguments_1 = isArguments;

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;

    var isArray_1 = isArray;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
      return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    var isLength_1 = isLength;

    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
      return value != null && isLength_1(value.length) && !isFunction_1(value);
    }

    var isArrayLike_1 = isArrayLike;

    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
      return isObjectLike_1(value) && isArrayLike_1(value);
    }

    var isArrayLikeObject_1 = isArrayLikeObject;

    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
      return false;
    }

    var stubFalse_1 = stubFalse;

    var isBuffer_1 = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Built-in value references. */
    var Buffer = moduleExports ? _root.Buffer : undefined;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse_1;

    module.exports = isBuffer;
    });

    /** `Object#toString` result references. */
    var objectTag = '[object Object]';

    /** Used for built-in method references. */
    var funcProto$2 = Function.prototype,
        objectProto$7 = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString$2 = funcProto$2.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString$2.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = _getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty$5.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString$2.call(Ctor) == objectCtorString;
    }

    var isPlainObject_1 = isPlainObject;

    /** `Object#toString` result references. */
    var argsTag$1 = '[object Arguments]',
        arrayTag = '[object Array]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag$1 = '[object Function]',
        mapTag = '[object Map]',
        numberTag = '[object Number]',
        objectTag$1 = '[object Object]',
        regexpTag = '[object RegExp]',
        setTag = '[object Set]',
        stringTag = '[object String]',
        weakMapTag = '[object WeakMap]';

    var arrayBufferTag = '[object ArrayBuffer]',
        dataViewTag = '[object DataView]',
        float32Tag = '[object Float32Array]',
        float64Tag = '[object Float64Array]',
        int8Tag = '[object Int8Array]',
        int16Tag = '[object Int16Array]',
        int32Tag = '[object Int32Array]',
        uint8Tag = '[object Uint8Array]',
        uint8ClampedTag = '[object Uint8ClampedArray]',
        uint16Tag = '[object Uint16Array]',
        uint32Tag = '[object Uint32Array]';

    /** Used to identify `toStringTag` values of typed arrays. */
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
    typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
    typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
    typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
    typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
    typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
    typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
    typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
    typedArrayTags[mapTag] = typedArrayTags[numberTag] =
    typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
    typedArrayTags[setTag] = typedArrayTags[stringTag] =
    typedArrayTags[weakMapTag] = false;

    /**
     * The base implementation of `_.isTypedArray` without Node.js optimizations.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     */
    function baseIsTypedArray(value) {
      return isObjectLike_1(value) &&
        isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
    }

    var _baseIsTypedArray = baseIsTypedArray;

    /**
     * The base implementation of `_.unary` without support for storing metadata.
     *
     * @private
     * @param {Function} func The function to cap arguments for.
     * @returns {Function} Returns the new capped function.
     */
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }

    var _baseUnary = baseUnary;

    var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports =  exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && _freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    module.exports = nodeUtil;
    });

    /* Node.js helper references. */
    var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

    var isTypedArray_1 = isTypedArray;

    /**
     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }

      if (key == '__proto__') {
        return;
      }

      return object[key];
    }

    var _safeGet = safeGet;

    /** Used for built-in method references. */
    var objectProto$8 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty$6.call(object, key) && eq_1(objValue, value)) ||
          (value === undefined && !(key in object))) {
        _baseAssignValue(object, key, value);
      }
    }

    var _assignValue = assignValue;

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];

        var newValue = customizer
          ? customizer(object[key], source[key], key, object, source)
          : undefined;

        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          _baseAssignValue(object, key, newValue);
        } else {
          _assignValue(object, key, newValue);
        }
      }
      return object;
    }

    var _copyObject = copyObject;

    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
      var index = -1,
          result = Array(n);

      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }

    var _baseTimes = baseTimes;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$1 = 9007199254740991;

    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;

      return !!length &&
        (type == 'number' ||
          (type != 'symbol' && reIsUint.test(value))) &&
            (value > -1 && value % 1 == 0 && value < length);
    }

    var _isIndex = isIndex;

    /** Used for built-in method references. */
    var objectProto$9 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray_1(value),
          isArg = !isArr && isArguments_1(value),
          isBuff = !isArr && !isArg && isBuffer_1(value),
          isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
          skipIndexes = isArr || isArg || isBuff || isType,
          result = skipIndexes ? _baseTimes(value.length, String) : [],
          length = result.length;

      for (var key in value) {
        if ((inherited || hasOwnProperty$7.call(value, key)) &&
            !(skipIndexes && (
               // Safari 9 has enumerable `arguments.length` in strict mode.
               key == 'length' ||
               // Node.js 0.10 has enumerable non-index properties on buffers.
               (isBuff && (key == 'offset' || key == 'parent')) ||
               // PhantomJS 2 has enumerable non-index properties on typed arrays.
               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
               // Skip index properties.
               _isIndex(key, length)
            ))) {
          result.push(key);
        }
      }
      return result;
    }

    var _arrayLikeKeys = arrayLikeKeys;

    /**
     * This function is like
     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * except that it includes inherited enumerable properties.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }

    var _nativeKeysIn = nativeKeysIn;

    /** Used for built-in method references. */
    var objectProto$a = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

    /**
     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeysIn(object) {
      if (!isObject_1(object)) {
        return _nativeKeysIn(object);
      }
      var isProto = _isPrototype(object),
          result = [];

      for (var key in object) {
        if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    var _baseKeysIn = baseKeysIn;

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
    }

    var keysIn_1 = keysIn;

    /**
     * Converts `value` to a plain object flattening inherited enumerable string
     * keyed properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @since 3.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return _copyObject(value, keysIn_1(value));
    }

    var toPlainObject_1 = toPlainObject;

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
      var objValue = _safeGet(object, key),
          srcValue = _safeGet(source, key),
          stacked = stack.get(srcValue);

      if (stacked) {
        _assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
        : undefined;

      var isCommon = newValue === undefined;

      if (isCommon) {
        var isArr = isArray_1(srcValue),
            isBuff = !isArr && isBuffer_1(srcValue),
            isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray_1(objValue)) {
            newValue = objValue;
          }
          else if (isArrayLikeObject_1(objValue)) {
            newValue = _copyArray(objValue);
          }
          else if (isBuff) {
            isCommon = false;
            newValue = _cloneBuffer(srcValue, true);
          }
          else if (isTyped) {
            isCommon = false;
            newValue = _cloneTypedArray(srcValue, true);
          }
          else {
            newValue = [];
          }
        }
        else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
          newValue = objValue;
          if (isArguments_1(objValue)) {
            newValue = toPlainObject_1(objValue);
          }
          else if (!isObject_1(objValue) || isFunction_1(objValue)) {
            newValue = _initCloneObject(srcValue);
          }
        }
        else {
          isCommon = false;
        }
      }
      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      _assignMergeValue(object, key, newValue);
    }

    var _baseMergeDeep = baseMergeDeep;

    /**
     * The base implementation of `_.merge` without support for multiple sources.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {number} srcIndex The index of `source`.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Object} [stack] Tracks traversed source values and their merged
     *  counterparts.
     */
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      _baseFor(source, function(srcValue, key) {
        stack || (stack = new _Stack);
        if (isObject_1(srcValue)) {
          _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
        }
        else {
          var newValue = customizer
            ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
            : undefined;

          if (newValue === undefined) {
            newValue = srcValue;
          }
          _assignMergeValue(object, key, newValue);
        }
      }, keysIn_1);
    }

    var _baseMerge = baseMerge;

    /**
     * This method returns the first argument it receives.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Util
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'a': 1 };
     *
     * console.log(_.identity(object) === object);
     * // => true
     */
    function identity(value) {
      return value;
    }

    var identity_1 = identity;

    /**
     * A faster alternative to `Function#apply`, this function invokes `func`
     * with the `this` binding of `thisArg` and the arguments of `args`.
     *
     * @private
     * @param {Function} func The function to invoke.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} args The arguments to invoke `func` with.
     * @returns {*} Returns the result of `func`.
     */
    function apply(func, thisArg, args) {
      switch (args.length) {
        case 0: return func.call(thisArg);
        case 1: return func.call(thisArg, args[0]);
        case 2: return func.call(thisArg, args[0], args[1]);
        case 3: return func.call(thisArg, args[0], args[1], args[2]);
      }
      return func.apply(thisArg, args);
    }

    var _apply = apply;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeMax = Math.max;

    /**
     * A specialized version of `baseRest` which transforms the rest array.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @param {Function} transform The rest array transform.
     * @returns {Function} Returns the new function.
     */
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);

        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return _apply(func, this, otherArgs);
      };
    }

    var _overRest = overRest;

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @since 2.4.0
     * @category Util
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new constant function.
     * @example
     *
     * var objects = _.times(2, _.constant({ 'a': 1 }));
     *
     * console.log(objects);
     * // => [{ 'a': 1 }, { 'a': 1 }]
     *
     * console.log(objects[0] === objects[1]);
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    var constant_1 = constant;

    /**
     * The base implementation of `setToString` without support for hot loop shorting.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var baseSetToString = !_defineProperty ? identity_1 : function(func, string) {
      return _defineProperty(func, 'toString', {
        'configurable': true,
        'enumerable': false,
        'value': constant_1(string),
        'writable': true
      });
    };

    var _baseSetToString = baseSetToString;

    /** Used to detect hot functions by number of calls within a span of milliseconds. */
    var HOT_COUNT = 800,
        HOT_SPAN = 16;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeNow = Date.now;

    /**
     * Creates a function that'll short out and invoke `identity` instead
     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
     * milliseconds.
     *
     * @private
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new shortable function.
     */
    function shortOut(func) {
      var count = 0,
          lastCalled = 0;

      return function() {
        var stamp = nativeNow(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return arguments[0];
          }
        } else {
          count = 0;
        }
        return func.apply(undefined, arguments);
      };
    }

    var _shortOut = shortOut;

    /**
     * Sets the `toString` method of `func` to return `string`.
     *
     * @private
     * @param {Function} func The function to modify.
     * @param {Function} string The `toString` result.
     * @returns {Function} Returns `func`.
     */
    var setToString = _shortOut(_baseSetToString);

    var _setToString = setToString;

    /**
     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
     *
     * @private
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     */
    function baseRest(func, start) {
      return _setToString(_overRest(func, start, identity_1), func + '');
    }

    var _baseRest = baseRest;

    /**
     * Checks if the given arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
     *  else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject_1(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
            ? (isArrayLike_1(object) && _isIndex(index, object.length))
            : (type == 'string' && index in object)
          ) {
        return eq_1(object[index], value);
      }
      return false;
    }

    var _isIterateeCall = isIterateeCall;

    /**
     * Creates a function like `_.assign`.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return _baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined,
            guard = length > 2 ? sources[2] : undefined;

        customizer = (assigner.length > 3 && typeof customizer == 'function')
          ? (length--, customizer)
          : undefined;

        if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }

    var _createAssigner = createAssigner;

    /**
     * This method is like `_.assign` except that it recursively merges own and
     * inherited enumerable string keyed properties of source objects into the
     * destination object. Source properties that resolve to `undefined` are
     * skipped if a destination value exists. Array and plain object properties
     * are merged recursively. Other objects and value types are overridden by
     * assignment. Source objects are applied from left to right. Subsequent
     * sources overwrite property assignments of previous sources.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @since 0.5.0
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = {
     *   'a': [{ 'b': 2 }, { 'd': 4 }]
     * };
     *
     * var other = {
     *   'a': [{ 'c': 3 }, { 'e': 5 }]
     * };
     *
     * _.merge(object, other);
     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
     */
    var merge = _createAssigner(function(object, source, srcIndex) {
      _baseMerge(object, source, srcIndex);
    });

    var merge_1 = merge;

    /** Used as references for various `Number` constants. */
    var MAX_SAFE_INTEGER$2 = 9007199254740991;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeFloor = Math.floor;

    /**
     * The base implementation of `_.repeat` which doesn't coerce arguments.
     *
     * @private
     * @param {string} string The string to repeat.
     * @param {number} n The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     */
    function baseRepeat(string, n) {
      var result = '';
      if (!string || n < 1 || n > MAX_SAFE_INTEGER$2) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        if (n) {
          string += string;
        }
      } while (n);

      return result;
    }

    var _baseRepeat = baseRepeat;

    /**
     * A specialized version of `_.map` for arrays without support for iteratee
     * shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array == null ? 0 : array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    var _arrayMap = arrayMap;

    /** `Object#toString` result references. */
    var symbolTag = '[object Symbol]';

    /**
     * Checks if `value` is classified as a `Symbol` primitive or object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
     * @example
     *
     * _.isSymbol(Symbol.iterator);
     * // => true
     *
     * _.isSymbol('abc');
     * // => false
     */
    function isSymbol(value) {
      return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
    }

    var isSymbol_1 = isSymbol;

    /** Used as references for various `Number` constants. */
    var INFINITY = 1 / 0;

    /** Used to convert symbols to primitives and strings. */
    var symbolProto = _Symbol ? _Symbol.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;

    /**
     * The base implementation of `_.toString` which doesn't convert nullish
     * values to empty strings.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {string} Returns the string.
     */
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value == 'string') {
        return value;
      }
      if (isArray_1(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return _arrayMap(value, baseToString) + '';
      }
      if (isSymbol_1(value)) {
        return symbolToString ? symbolToString.call(value) : '';
      }
      var result = (value + '');
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
    }

    var _baseToString = baseToString;

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    var _baseSlice = baseSlice;

    /**
     * Casts `array` to a slice if it's needed.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {number} start The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the cast slice.
     */
    function castSlice(array, start, end) {
      var length = array.length;
      end = end === undefined ? length : end;
      return (!start && end >= length) ? array : _baseSlice(array, start, end);
    }

    var _castSlice = castSlice;

    /** Used to compose unicode character classes. */
    var rsAstralRange = '\\ud800-\\udfff',
        rsComboMarksRange = '\\u0300-\\u036f',
        reComboHalfMarksRange = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange = '\\u20d0-\\u20ff',
        rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
        rsVarRange = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsZWJ = '\\u200d';

    /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
    var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

    /**
     * Checks if `string` contains Unicode symbols.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {boolean} Returns `true` if a symbol is found, else `false`.
     */
    function hasUnicode(string) {
      return reHasUnicode.test(string);
    }

    var _hasUnicode = hasUnicode;

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new accessor function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    var _baseProperty = baseProperty;

    /**
     * Gets the size of an ASCII `string`.
     *
     * @private
     * @param {string} string The string inspect.
     * @returns {number} Returns the string size.
     */
    var asciiSize = _baseProperty('length');

    var _asciiSize = asciiSize;

    /** Used to compose unicode character classes. */
    var rsAstralRange$1 = '\\ud800-\\udfff',
        rsComboMarksRange$1 = '\\u0300-\\u036f',
        reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
        rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
        rsVarRange$1 = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsAstral = '[' + rsAstralRange$1 + ']',
        rsCombo = '[' + rsComboRange$1 + ']',
        rsFitz = '\\ud83c[\\udffb-\\udfff]',
        rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
        rsNonAstral = '[^' + rsAstralRange$1 + ']',
        rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsZWJ$1 = '\\u200d';

    /** Used to compose unicode regexes. */
    var reOptMod = rsModifier + '?',
        rsOptVar = '[' + rsVarRange$1 + ']?',
        rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
        rsSeq = rsOptVar + reOptMod + rsOptJoin,
        rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

    /**
     * Gets the size of a Unicode `string`.
     *
     * @private
     * @param {string} string The string inspect.
     * @returns {number} Returns the string size.
     */
    function unicodeSize(string) {
      var result = reUnicode.lastIndex = 0;
      while (reUnicode.test(string)) {
        ++result;
      }
      return result;
    }

    var _unicodeSize = unicodeSize;

    /**
     * Gets the number of symbols in `string`.
     *
     * @private
     * @param {string} string The string to inspect.
     * @returns {number} Returns the string size.
     */
    function stringSize(string) {
      return _hasUnicode(string)
        ? _unicodeSize(string)
        : _asciiSize(string);
    }

    var _stringSize = stringSize;

    /**
     * Converts an ASCII `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function asciiToArray(string) {
      return string.split('');
    }

    var _asciiToArray = asciiToArray;

    /** Used to compose unicode character classes. */
    var rsAstralRange$2 = '\\ud800-\\udfff',
        rsComboMarksRange$2 = '\\u0300-\\u036f',
        reComboHalfMarksRange$2 = '\\ufe20-\\ufe2f',
        rsComboSymbolsRange$2 = '\\u20d0-\\u20ff',
        rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
        rsVarRange$2 = '\\ufe0e\\ufe0f';

    /** Used to compose unicode capture groups. */
    var rsAstral$1 = '[' + rsAstralRange$2 + ']',
        rsCombo$1 = '[' + rsComboRange$2 + ']',
        rsFitz$1 = '\\ud83c[\\udffb-\\udfff]',
        rsModifier$1 = '(?:' + rsCombo$1 + '|' + rsFitz$1 + ')',
        rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
        rsRegional$1 = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        rsSurrPair$1 = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        rsZWJ$2 = '\\u200d';

    /** Used to compose unicode regexes. */
    var reOptMod$1 = rsModifier$1 + '?',
        rsOptVar$1 = '[' + rsVarRange$2 + ']?',
        rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
        rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
        rsSymbol$1 = '(?:' + [rsNonAstral$1 + rsCombo$1 + '?', rsCombo$1, rsRegional$1, rsSurrPair$1, rsAstral$1].join('|') + ')';

    /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
    var reUnicode$1 = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol$1 + rsSeq$1, 'g');

    /**
     * Converts a Unicode `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function unicodeToArray(string) {
      return string.match(reUnicode$1) || [];
    }

    var _unicodeToArray = unicodeToArray;

    /**
     * Converts `string` to an array.
     *
     * @private
     * @param {string} string The string to convert.
     * @returns {Array} Returns the converted array.
     */
    function stringToArray(string) {
      return _hasUnicode(string)
        ? _unicodeToArray(string)
        : _asciiToArray(string);
    }

    var _stringToArray = stringToArray;

    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil;

    /**
     * Creates the padding for `string` based on `length`. The `chars` string
     * is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {number} length The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padding for `string`.
     */
    function createPadding(length, chars) {
      chars = chars === undefined ? ' ' : _baseToString(chars);

      var charsLength = chars.length;
      if (charsLength < 2) {
        return charsLength ? _baseRepeat(chars, length) : chars;
      }
      var result = _baseRepeat(chars, nativeCeil(length / _stringSize(chars)));
      return _hasUnicode(chars)
        ? _castSlice(_stringToArray(result), 0, length).join('')
        : result.slice(0, length);
    }

    var _createPadding = createPadding;

    /** Used as references for various `Number` constants. */
    var NAN = 0 / 0;

    /** Used to match leading and trailing whitespace. */
    var reTrim = /^\s+|\s+$/g;

    /** Used to detect bad signed hexadecimal string values. */
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

    /** Used to detect binary string values. */
    var reIsBinary = /^0b[01]+$/i;

    /** Used to detect octal string values. */
    var reIsOctal = /^0o[0-7]+$/i;

    /** Built-in method references without a dependency on `root`. */
    var freeParseInt = parseInt;

    /**
     * Converts `value` to a number.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to process.
     * @returns {number} Returns the number.
     * @example
     *
     * _.toNumber(3.2);
     * // => 3.2
     *
     * _.toNumber(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toNumber(Infinity);
     * // => Infinity
     *
     * _.toNumber('3.2');
     * // => 3.2
     */
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol_1(value)) {
        return NAN;
      }
      if (isObject_1(value)) {
        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
        value = isObject_1(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value))
        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NAN : +value);
    }

    var toNumber_1 = toNumber;

    /** Used as references for various `Number` constants. */
    var INFINITY$1 = 1 / 0,
        MAX_INTEGER = 1.7976931348623157e+308;

    /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber_1(value);
      if (value === INFINITY$1 || value === -INFINITY$1) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

    var toFinite_1 = toFinite;

    /**
     * Converts `value` to an integer.
     *
     * **Note:** This method is loosely based on
     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.toInteger(3.2);
     * // => 3
     *
     * _.toInteger(Number.MIN_VALUE);
     * // => 0
     *
     * _.toInteger(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toInteger('3.2');
     * // => 3
     */
    function toInteger(value) {
      var result = toFinite_1(value),
          remainder = result % 1;

      return result === result ? (remainder ? result - remainder : result) : 0;
    }

    var toInteger_1 = toInteger;

    /**
     * Converts `value` to a string. An empty string is returned for `null`
     * and `undefined` values. The sign of `-0` is preserved.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     * @example
     *
     * _.toString(null);
     * // => ''
     *
     * _.toString(-0);
     * // => '-0'
     *
     * _.toString([1, 2, 3]);
     * // => '1,2,3'
     */
    function toString(value) {
      return value == null ? '' : _baseToString(value);
    }

    var toString_1 = toString;

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padStart('abc', 6);
     * // => '   abc'
     *
     * _.padStart('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padStart('abc', 3);
     * // => 'abc'
     */
    function padStart(string, length, chars) {
      string = toString_1(string);
      length = toInteger_1(length);

      var strLength = length ? _stringSize(string) : 0;
      return (length && strLength < length)
        ? (_createPadding(length - strLength, chars) + string)
        : string;
    }

    var padStart_1 = padStart;

    var IDGenerator_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IDG = void 0;

    var padStart_1$1 = tslib_1.__importDefault(padStart_1);
    var count = 0;
    var IDGenerator = /** @class */ (function () {
        function IDGenerator(props) {
            var _a = props || {}, _b = _a.len, len = _b === void 0 ? 8 : _b, _c = _a.start, start = _c === void 0 ? 0 : _c;
            count = start;
            this.len = len;
        }
        IDGenerator.prototype.getID = function () {
            var id = padStart_1$1.default(String(count), this.len, "0");
            count++;
            return id;
        };
        return IDGenerator;
    }());
    exports.default = IDGenerator;
    exports.IDG = new IDGenerator();

    });

    var Shape_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disabled = exports.active = exports.normal = exports.ShapeType = void 0;

    var EventReceiver_1$1 = tslib_1.__importDefault(EventReceiver_1);

    var merge_1$1 = tslib_1.__importDefault(merge_1);

    var ShapeType;
    (function (ShapeType) {
        ShapeType["Polygon"] = "Polygon";
        ShapeType["Rect"] = "Rect";
    })(ShapeType = exports.ShapeType || (exports.ShapeType = {}));
    var ShapeStatus;
    (function (ShapeStatus) {
        ShapeStatus["normal"] = "normal";
        ShapeStatus["active"] = "active";
        ShapeStatus["disabled"] = "disabled";
    })(ShapeStatus || (ShapeStatus = {}));
    exports.normal = {
        dotColor: "red",
        dotRadius: 3,
        lineColor: "#c30",
        lineWidth: 2,
        fillColor: "pink",
    };
    exports.active = {
        dotColor: "red",
        dotRadius: 3,
        lineColor: "transparent",
        lineWidth: 0,
        fillColor: "#c30",
    };
    exports.disabled = {
        dotColor: "#ccc",
        dotRadius: 3,
        lineColor: "transparent",
        lineWidth: 0,
        fillColor: "#666",
    };
    var defaultStyle = {
        normal: exports.normal,
        active: exports.active,
        disabled: exports.disabled
    };
    var Shape = /** @class */ (function (_super) {
        tslib_1.__extends(Shape, _super);
        function Shape(options) {
            var _this = _super.call(this) || this;
            var _a = options.id, id = _a === void 0 ? IDGenerator_1.IDG.getID() : _a, type = options.type, name = options.name, positions = options.positions, data = options.data, _b = options.active, active = _b === void 0 ? false : _b, _c = options.closed, closed = _c === void 0 ? true : _c, _d = options.disabled, disabled = _d === void 0 ? false : _d, _e = options.insert, insert = _e === void 0 ? false : _e, _f = options.visible, visible = _f === void 0 ? true : _f, _g = options.showTag, showTag = _g === void 0 ? true : _g, max = options.max, _h = options.tag, tag = _h === void 0 ? "" : _h, _j = options.style, style = _j === void 0 ? {} : _j;
            _this.id = id;
            _this.type = type;
            _this.name = name;
            _this.status = disabled ? "disabled" : active ? "active" : "normal";
            _this.positions = positions;
            _this.data = data || null;
            _this.style = merge_1$1.default(defaultStyle, style);
            _this.closed = closed;
            _this.visible = visible;
            _this.insert = insert;
            _this.showTag = showTag;
            _this.tag = tag;
            _this.max = max;
            if (_this.type === ShapeType.Rect) {
                _this.insert = false;
                if (positions.length === 2 && closed) {
                    _this.positions = utils.getRectPoints(positions[0], positions[1]);
                }
            }
            return _this;
        }
        Shape.prototype.getPositions = function () {
            return this.positions || [];
        };
        /**
         * 判断是否在点上
         * @param offset 相对图片的位置
         */
        Shape.prototype.isOnArc = function (offset) {
            var positions = this.getPositions();
            var style = this.getStyle();
            var dotRadius = style.dotRadius;
            var arcIndex = positions.findIndex(function (point) { return utils.isInCircle(offset, point, dotRadius); });
            return arcIndex;
        };
        /**
         * 判断是否在图形上
         * @param offset 相对图片的位置
         */
        Shape.prototype.isOnShape = function (offset) {
            return utils.isInSide(offset, this.getPositions());
        };
        /**
         * 判断是否在边上
         * @param offset 相对图片的位置
         */
        Shape.prototype.isOnLine = function (offset) {
            var ox1 = offset[0], oy1 = offset[1];
            var positions = this.getPositions();
            var start = positions[0]; // 获取第一个坐标点
            positions.push(start); // 形成闭合
            var pre = null;
            var ps = [];
            positions.forEach(function (point, idx) {
                var lp = {
                    idx: idx,
                    position: point
                };
                if (!pre) {
                    pre = lp;
                    return;
                }
                ps.push([pre, lp]);
                pre = lp;
            });
            // 1.filter 筛选出在两个坐标点范围内的点
            // 2.map 计算出边上的点位
            var linePoints = ps.filter(function (_a) {
                var lp1 = _a[0], lp2 = _a[1];
                var _b = lp1.position, x1 = _b[0], y1 = _b[1];
                var _c = lp2.position, x2 = _c[0], y2 = _c[1];
                var isInX;
                var isInY;
                if (x1 === x2) {
                    isInX = x1 - 5 < ox1 && ox1 < x1 + 5;
                }
                else if (x1 < x2) {
                    isInX = x1 < ox1 && ox1 < x2;
                }
                else {
                    isInX = x2 < ox1 && ox1 < x1;
                }
                if (y1 === y2) {
                    isInY = y1 - 5 < oy1 && oy1 < y1 + 5;
                }
                else if (y1 < y2) {
                    isInY = y1 < oy1 && oy1 < y2;
                }
                else {
                    isInY = y2 < oy1 && oy1 < y1;
                }
                return isInX && isInY;
            }).map(function (_a) {
                var lp1 = _a[0], lp2 = _a[1];
                var _b = lp1.position, x1 = _b[0], y1 = _b[1];
                var _c = lp2.position, x2 = _c[0], y2 = _c[1];
                var linePoint = {};
                var ox2;
                var oy2;
                if (y2 - y1 === 0) {
                    ox2 = ox1;
                    oy2 = y1;
                }
                else if (x2 - x1 === 0) {
                    ox2 = x1;
                    oy2 = oy1;
                }
                else {
                    var k1 = (y2 - y1) / (x2 - x1);
                    var b1 = y1 - (k1 * x1);
                    var k2 = -k1;
                    var b2 = oy1 - (k2 * ox1);
                    ox2 = (b2 - b1) / (k1 - k2);
                    oy2 = k2 * ox2 + b2;
                }
                linePoint = {
                    idx: lp1.idx,
                    position: [ox2, oy2]
                };
                return linePoint;
            });
            // 1.map 计算出鼠标点到边上的距离
            // 2.sort 距离升序排序
            var sort = linePoints.map(function (lp) {
                var position = lp.position, idx = lp.idx;
                var distance = utils.getDistance(position, offset);
                var sp = {
                    idx: idx,
                    position: position,
                    distance: distance
                };
                return sp;
            }).sort(function (sp1, sp2) { return sp1.distance - sp2.distance; });
            var min = sort[0]; // 获取最小的距离点
            if (min) {
                // 如果最小点距离小于5 在返回此点位
                return min.distance < 5 ? min : false;
            }
            else {
                return false;
            }
        };
        Shape.prototype.getStyle = function () {
            return this.style[this.status];
        };
        Shape.prototype.setActive = function (status) {
            if (this.isDisabled())
                return this;
            this.status = status ? "active" : "normal";
            return this;
        };
        Shape.prototype.isActive = function () {
            return this.status === "active";
        };
        Shape.prototype.close = function () {
            this.closed = true;
            return this;
        };
        Shape.prototype.isClose = function () {
            return this.closed;
        };
        Shape.prototype.disabled = function () {
            this.status = "disabled";
            return this;
        };
        Shape.prototype.isDisabled = function () {
            return this.status === "disabled";
        };
        Shape.prototype.normal = function () {
            this.status = "normal";
            return this;
        };
        Shape.prototype.hidden = function () {
            this.visible = true;
            return this;
        };
        Shape.prototype.isHidden = function () {
            return !this.visible;
        };
        Shape.prototype.isInsert = function () {
            return this.insert;
        };
        Shape.prototype.isShowTag = function () {
            return this.showTag;
        };
        Shape.prototype.tagShow = function (status) {
            this.showTag = typeof status === "undefined" ? !this.showTag : !!status;
        };
        Shape.prototype.setTag = function (tag) {
            this.tag = tag;
        };
        Shape.prototype.updatePositions = function (positions) {
            this.positions = positions;
            return this;
        };
        return Shape;
    }(EventReceiver_1$1.default));
    exports.default = Shape;

    });

    var ShapeRegister = /** @class */ (function () {
        function ShapeRegister() {
            this.shapeMap = {};
        }
        ShapeRegister.prototype.add = function (name, shapeCfg) {
            if (!this.shapeMap[name]) {
                shapeCfg.name = name;
                this.shapeMap[name] = shapeCfg;
            }
        };
        ShapeRegister.prototype.get = function (name) {
            if (this.shapeMap[name]) {
                return Object.assign({}, this.shapeMap[name]);
            }
            throw "图形未注册";
        };
        return ShapeRegister;
    }());
    var _default$1 = ShapeRegister;


    var ShapeRegister_1 = /*#__PURE__*/Object.defineProperty({
    	default: _default$1
    }, '__esModule', {value: true});

    var EventHooks;
    (function (EventHooks) {
        EventHooks["select"] = "select";
        EventHooks["create"] = "create";
        EventHooks["update"] = "update";
    })(EventHooks || (EventHooks = {}));
    var EventHook = /** @class */ (function () {
        function EventHook() {
            this.eventMap = {};
        }
        EventHook.prototype.trigger = function (name, shape) {
            var fns = this.eventMap[name];
            if (!fns)
                return;
            fns.forEach(function (fn) {
                fn(shape);
            });
        };
        EventHook.prototype.on = function (name, cb) {
            var _this = this;
            if (!this.eventMap[name]) {
                this.eventMap[name] = [];
            }
            this.eventMap[name].push(cb);
            return function () {
                var _a;
                var idx = (_a = _this.eventMap[name]) === null || _a === void 0 ? void 0 : _a.findIndex(function (fn) { return fn === cb; });
                idx && _this.eventMap[name] && _this.eventMap[name].splice(idx, 1);
            };
        };
        EventHook.prototype.config = function (options) {
            this.eventMap = Object.assign(this.eventMap, options);
        };
        return EventHook;
    }());
    var _default$2 = EventHook;


    var EventHook_1 = /*#__PURE__*/Object.defineProperty({
    	default: _default$2
    }, '__esModule', {value: true});

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    var isUndefined_1 = isUndefined;

    var EventReceiver_1$2 = tslib_1.__importStar(EventReceiver_1);
    var Image_1$1 = tslib_1.__importDefault(Image_1);
    var Shape_1$1 = tslib_1.__importStar(Shape_1);
    var ShapeRegister_1$1 = tslib_1.__importDefault(ShapeRegister_1);
    var EventHook_1$1 = tslib_1.__importDefault(EventHook_1);

    var isUndefined_1$1 = tslib_1.__importDefault(isUndefined_1);
    var dfOptions = {
        width: 800,
        height: 600,
        bgColor: "#000",
    };
    var Platform = /** @class */ (function (_super) {
        tslib_1.__extends(Platform, _super);
        function Platform(container, options) {
            var _this = _super.call(this) || this;
            _this.container = container;
            _this.options = options || dfOptions;
            _this.eventHook = new EventHook_1$1.default();
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = _this.options.width;
            canvas.height = _this.options.height;
            _this.container.append(canvas);
            _this.canvas = canvas;
            _this.ctx = ctx;
            _this.scale = 1;
            _this.fontSize = 14;
            _this.continuity = false;
            _this.isGuideLine = false;
            _this.isTagShow = true;
            _this.renderLocker = false;
            _this.offset = [0, 0];
            _this.cache = null;
            _this.activeShape = null;
            _this.Image = new Image_1$1.default();
            _this.shapeRegister = new ShapeRegister_1$1.default();
            _this.drawing = null;
            _this.shapeList = [];
            _this.render();
            _this.init();
            return _this;
        }
        Platform.prototype.reset = function () {
            this.scale = 1;
            this.offset = [0, 0];
            this.cache = null;
            this.activeShape = null;
            this.drawing = null;
            this.shapeList = [];
        };
        Platform.prototype.init = function () {
            this.initMouseEvent();
            this.initGuideLine();
            this.initDrawEvent();
            this.initShapeEvent();
            this.initImageEvent();
        };
        // 事件相关
        Platform.prototype.initMouseEvent = function () {
            var _this = this;
            EventReceiver_1$2.antMouseEvents.forEach(function (type) {
                var Image = _this.Image;
                _this.canvas.addEventListener(type, function (e) {
                    var offset = [e.offsetX, e.offsetY];
                    var isOnImage = utils.isInSide(offset, Image.getPosition(_this.scale));
                    var isPropagation = true;
                    var getTargetShape = function () {
                        var target = null;
                        var arcIndex = -1;
                        var shapeLen = _this.shapeList.length;
                        while (shapeLen > 0) {
                            var shape = _this.shapeList[shapeLen - 1];
                            var shapeOffset = Image.getRelative(offset, _this.scale);
                            arcIndex = shape.isOnArc(shapeOffset);
                            if (arcIndex !== -1) {
                                target = shape;
                                break;
                            }
                            var isInShape = shape.isOnShape(shapeOffset);
                            if (isInShape) {
                                target = shape;
                                break;
                            }
                            shapeLen--;
                        }
                        return [target, arcIndex];
                    };
                    var currentTarget = getTargetShape()[0];
                    var ante = {
                        offset: offset,
                        isOnImage: isOnImage,
                        isPropagation: isPropagation,
                        stopPropagation: function () {
                            ante.isPropagation = false;
                        },
                        getTargetShape: getTargetShape,
                        currentTarget: currentTarget
                    };
                    var ev = e;
                    ev.ante = ante;
                    EventReceiver_1$2.antLvs.forEach(function (lv) {
                        _this.shapeList.forEach(function (shape) {
                            var sEvList = shape.getEventsByType(type, lv);
                            var sLen = sEvList.length;
                            while (sLen) {
                                if (!ev.ante.isPropagation) {
                                    sLen = 0;
                                    break;
                                }
                                var event_1 = sEvList[sLen - 1];
                                var callback = event_1.callback, other = tslib_1.__rest(event_1, ["callback"]);
                                if (currentTarget === shape) {
                                    callback(ev, other);
                                }
                                sLen--;
                            }
                        });
                        var iEvList = Image.getEventsByType(type, lv);
                        var iLen = iEvList.length;
                        while (iLen) {
                            if (!ev.ante.isPropagation) {
                                iLen = 0;
                                break;
                            }
                            var event_2 = iEvList[iLen - 1];
                            var callback = event_2.callback, other = tslib_1.__rest(event_2, ["callback"]);
                            callback(ev, other);
                            iLen--;
                        }
                        var pEvList = _this.getEventsByType(type, lv);
                        var pLen = pEvList.length;
                        while (pLen) {
                            if (!ev.ante.isPropagation) {
                                pLen = 0;
                                break;
                            }
                            var event_3 = pEvList[pLen - 1];
                            var callback = event_3.callback, other = tslib_1.__rest(event_3, ["callback"]);
                            callback(ev, other);
                            pLen--;
                        }
                    });
                });
            });
        };
        Platform.prototype.initGuideLine = function () {
            var _this = this;
            this.on("mousemove.top", function (e) {
                _this.offset = e.ante.offset;
                _this.render();
            });
        };
        Platform.prototype.initImageEvent = function () {
            var _this = this;
            var start = [0, 0]; // 点击在图片的起始位置
            var isMouseDown = false;
            var Image = this.Image;
            var isOnShape = false;
            Image.on("mousedown.bot", function (e) {
                isOnShape = !!e.ante.currentTarget;
                if (_this.drawing && _this.drawing.type === "Rect" && !isMouseDown) {
                    isOnShape = true;
                }
                if (isOnShape || !Image.complate)
                    return;
                isMouseDown = true;
                var offset = e.ante.offset;
                var sx = offset[0], sy = offset[1]; // start x, start y
                var _a = Image.getOrigin(), x = _a[0], y = _a[1]; // image origin
                start = [sx - x, sy - y];
            });
            Image.on("mousemove.bot", function (e) {
                if (isOnShape)
                    return;
                if (!isMouseDown)
                    return;
                var offset = e.ante.offset;
                var ox = offset[0], oy = offset[1]; // offset x, offset y
                var diff = [ox - start[0], oy - start[1]];
                var position = diff;
                Image.setOrigin(position);
                _this.render();
            });
            Image.on("mouseup.bot", function () {
                isMouseDown = false;
                isOnShape = false;
                start = [0, 0];
            });
            Image.on("mouseout.bot", function () {
                isMouseDown = false;
                isOnShape = false;
                start = [0, 0];
            });
            Image.on("wheel", function (e) {
                var Image = _this.Image;
                if (!Image.el)
                    return;
                var offset = e.ante.offset;
                var px = offset[0], py = offset[1];
                var step = 0.05;
                var direction = e.deltaY < 0 ? 1 : -1;
                var after = direction * step;
                var scale = Number((after + _this.scale).toFixed(2));
                if (scale < 0.01) {
                    scale = 0.01;
                }
                // 计算画布缩放(以鼠标位置为中心点)
                var _a = Image.getSize(), width = _a[0], height = _a[1];
                var _b = Image.getOrigin(), ox = _b[0], oy = _b[1];
                var sw = width * _this.scale;
                var sw2 = width * scale;
                var dx = Math.abs(px - ox);
                var fx = px - ox > 0 ? -1 : 1;
                var sx = ((dx * sw2) / sw) - dx;
                var x = fx * sx + ox;
                var sh = height * _this.scale;
                var sh2 = height * scale;
                var dy = Math.abs(py - oy);
                var fy = py - oy > 0 ? -1 : 1;
                var sy = ((dy * sh2) / sh) - dy;
                var y = fy * sy + oy;
                Image.setOrigin([x, y]);
                _this.scale = scale;
                _this.render();
            });
        };
        Platform.prototype.initDrawEvent = function () {
            var _this = this;
            var start = [0, 0];
            var Image = this.Image;
            this.on("mousedown.top", function (e) {
                if (!_this.drawing || !Image.el)
                    return;
                var _a = e.ante, offset = _a.offset, isOnImage = _a.isOnImage;
                // 判断当前点击是否在img上
                if (!isOnImage)
                    return;
                // 计算出当前点位在img的什么位置
                var point = Image.getRelative(offset, _this.scale);
                start = point;
                var cache = _this.cache;
                if (cache) {
                    if (_this.drawing.type === Shape_1$1.ShapeType.Polygon) {
                        var isClose = false;
                        if (cache.positions.length > 2) {
                            var first = cache.positions[0];
                            var style = cache.getStyle();
                            isClose = utils.isInCircle(point, first, style.dotRadius);
                        }
                        if (cache.max && cache.positions.length + 1 >= cache.max) {
                            cache.positions.push(point);
                            isClose = true;
                        }
                        if (isClose) {
                            var shape = _this.createShape(_this.drawing.name, {
                                positions: cache.positions,
                                closed: false,
                            });
                            shape.updatePositions(cache.positions).close();
                            _this.shapeList.push(shape);
                            _this.cache = null;
                            _this.eventHook.trigger("create", shape);
                            if (!_this.continuity) {
                                _this.cancel();
                            }
                        }
                        else {
                            cache.positions.push(point);
                        }
                    }
                }
                else {
                    var positions = [];
                    if (_this.drawing.type === Shape_1$1.ShapeType.Polygon) {
                        positions = [point];
                    }
                    else if (_this.drawing.type === Shape_1$1.ShapeType.Rect) {
                        positions = [point, point, point, point];
                    }
                    var shape = _this.createShape(_this.drawing.name, {
                        positions: positions,
                        closed: false,
                        id: "cache"
                    });
                    _this.cache = shape;
                }
                _this.render();
            });
            this.on("mousemove.top", function (e) {
                var cache = _this.cache;
                var Image = _this.Image;
                if (!_this.drawing || !Image.complate || !cache)
                    return;
                // if(this.isMoving || !this.isOnShape) return
                var shapeType = _this.drawing.type;
                if (shapeType === Shape_1$1.ShapeType.Rect) {
                    var offset = e.ante.offset;
                    var end = Image.getRelative(offset, _this.scale);
                    var positions = utils.getRectPoints(start, end);
                    cache.updatePositions(positions);
                    _this.render();
                }
            });
            this.on("mouseup.top", function () {
                var _a;
                var cache = _this.cache;
                var shapeType = (_a = _this.drawing) === null || _a === void 0 ? void 0 : _a.type;
                start = [0, 0];
                if (shapeType === Shape_1$1.ShapeType.Rect && cache && _this.drawing) {
                    var positions = cache.getPositions();
                    var shape = _this.createShape(_this.drawing.name, {
                        positions: positions
                    });
                    shape.close();
                    _this.shapeList.push(shape);
                    _this.eventHook.trigger("create", shape);
                    _this.cache = null;
                    if (!_this.continuity) {
                        _this.cancel();
                    }
                    _this.render();
                }
            });
            this.on("mouseout.top", function () {
            });
        };
        // 绑定图形事件
        Platform.prototype.initShapeEvent = function () {
            var _this = this;
            var start = [0, 0];
            var cp = []; // cache postion
            var arcIndex = -1;
            var isOnShape = false;
            var select = function (shape) {
                _this.loseActive();
                shape.setActive(true);
                _this.activeShape = shape;
                _this.eventHook.trigger("select", shape);
                _this.render();
            };
            this.on("mousedown.top", function (e) {
                var _a = e.ante, getTargetShape = _a.getTargetShape, offset = _a.offset;
                start = offset;
                var _b = getTargetShape(), shape = _b[0], index = _b[1];
                isOnShape = !!shape;
                if (_this.drawing)
                    return;
                if (!shape)
                    return;
                if (shape.isDisabled()) {
                    _this.activeShape = null;
                    return;
                }
                e.ante.stopPropagation();
                // 获取shape相对于画布的坐标
                arcIndex = index;
                cp = shape.getPositions();
                // this.orderShape(shape)
                if (_this.activeShape !== shape) {
                    select(shape);
                }
                // if(shape.isInsert() && shape.isClose()){
                // 	console.log(offset);
                // 	const isInLine = shape.isOnLine(offset)
                // 	if(isInLine){
                // 		const { position, idx } = isInLine
                // 		cp = shape.getPositions()
                // 		cp.splice(idx + 1, 0, position)
                // 		shape.updatePositions(cp)
                // 		this.render()
                // 	}
                // }
            });
            this.on("mousemove.top", function (e) {
                if (!isOnShape || !_this.activeShape || _this.drawing)
                    return;
                var offsetX = e.offsetX, offsetY = e.offsetY;
                var diff = [offsetX - start[0], offsetY - start[1]];
                var rp = [];
                if (arcIndex === -1) {
                    // shape move
                    rp = cp.map(function (_a) {
                        var cx = _a[0], cy = _a[1];
                        return [cx + diff[0] / _this.scale, cy + diff[1] / _this.scale];
                    });
                }
                else {
                    // shape point move
                    rp = cp.slice();
                    var p = rp[arcIndex];
                    if (_this.activeShape.type === "Rect") {
                        switch (arcIndex) {
                            case 1:
                                rp[0] = [rp[0][0], rp[0][1] + diff[1] / _this.scale];
                                rp[2] = [rp[2][0] + diff[0] / _this.scale, rp[2][1]];
                                break;
                            case 3:
                                rp[0] = [rp[0][0] + diff[0] / _this.scale, rp[0][1]];
                                rp[2] = [rp[2][0], rp[2][1] + diff[1] / _this.scale];
                                break;
                            default:
                                rp[arcIndex] = [p[0] + diff[0] / _this.scale, p[1] + diff[1] / _this.scale];
                        }
                        rp = utils.getRectPoints(rp[0], rp[2]);
                    }
                    else {
                        rp[arcIndex] = [p[0] + diff[0] / _this.scale, p[1] + diff[1] / _this.scale];
                    }
                }
                _this.activeShape.updatePositions(rp);
                _this.render();
            });
            this.on("mouseup.top", function (e) {
                start = [0, 0];
                arcIndex = -1;
                isOnShape = false;
            });
        };
        // 加载
        Platform.prototype.load = function (source) {
            var _this = this;
            this.reset();
            return new Promise(function (c, e) {
                _this.Image.load(source).then(function (img) {
                    var width = img.width, height = img.height;
                    var options = _this.options;
                    var scale = 1;
                    // 初始化图片缩放
                    if (options.width < width || options.height < height) {
                        if (width > height) {
                            // 长大于高
                            scale = options.width / width;
                        }
                        else {
                            // 高大于长
                            scale = options.height / height;
                        }
                    }
                    _this.scale = scale;
                    _this.render();
                    c(img);
                }, function (err) {
                    e(err);
                });
            });
        };
        Platform.prototype.register = function (name, options) {
            this.shapeRegister.add(name, options);
        };
        Platform.prototype.createShape = function (name, options) {
            var opts = this.shapeRegister.get(name);
            return new Shape_1$1.default(Object.assign(opts, options));
        };
        Platform.prototype.label = function (name, continuity) {
            this.drawing = this.shapeRegister.get(name);
            if (!isUndefined_1$1.default(continuity)) {
                this.continuity = !!continuity;
            }
        };
        Platform.prototype.addShape = function (shape, idx) {
            if (typeof idx === "number") {
                this.shapeList.splice(idx, 0, shape);
            }
            else {
                this.shapeList.push(shape);
            }
            this.render();
        };
        Platform.prototype.remove = function (input) {
            var idx = this.findShapeIndex(input)[0];
            if (idx === null)
                return;
            this.shapeList.splice(idx, 1);
            this.render();
            this.eventHook.trigger("update");
        };
        Platform.prototype.setActive = function (shape) {
            this.loseActive();
            shape.setActive(true);
            this.render();
        };
        Platform.prototype.cancel = function () {
            this.drawing = null;
            this.continuity = false;
            if (this.cache) {
                this.cache = null;
                this.render();
            }
        };
        // 提升图形层级到最顶层
        Platform.prototype.orderShape = function (input, flag) {
            var _a = this.findShapeIndex(input), idx = _a[0], shape = _a[1];
            if (idx === null)
                return;
            this.shapeList.splice(idx, 1);
            if (flag) {
                this.shapeList.unshift(shape);
            }
            else {
                this.shapeList.push(shape);
            }
        };
        Platform.prototype.findShapeIndex = function (input) {
            var idx = null;
            if (input instanceof Shape_1$1.default) {
                var shape_1 = input;
                idx = this.shapeList.findIndex(function (item) { return item === shape_1; });
            }
            else if (typeof input === "string") {
                var id_1 = input;
                idx = this.shapeList.findIndex(function (item) { return item.id === id_1; });
            }
            var shape = idx === null ? null : this.shapeList[idx];
            return [idx, shape];
        };
        Platform.prototype.getShapeList = function () {
            return this.shapeList;
        };
        Platform.prototype.getShapeByName = function (name) {
            return this.shapeList.filter(function (shape) { return shape.name === name; });
        };
        // 取消所有图形高亮状态
        Platform.prototype.loseActive = function () {
            this.shapeList.forEach(function (shape) {
                shape.setActive(false);
            });
        };
        Platform.prototype.guideLine = function (status) {
            this.isGuideLine = isUndefined_1$1.default(status) ? !this.isGuideLine : !!status;
            this.render();
        };
        Platform.prototype.tagShow = function (status) {
            this.isTagShow = isUndefined_1$1.default(status) ? !this.isTagShow : !!status;
            this.render();
        };
        Platform.prototype.setContinuity = function (status) {
            this.continuity = !!status;
        };
        // 渲染相关
        Platform.prototype.clearCanvas = function () {
            var ctx = this.ctx;
            var _a = this.options, width = _a.width, height = _a.height;
            ctx.clearRect(0, 0, width, height);
        };
        Platform.prototype.renderBackground = function () {
            var ctx = this.ctx;
            var _a = this.options, bgColor = _a.bgColor, width = _a.width, height = _a.height;
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);
        };
        Platform.prototype.renderImage = function () {
            var ctx = this.ctx;
            var Image = this.Image;
            if (!Image || !Image.complate)
                return;
            var el = Image.getEl();
            var _a = Image.getSize(), width = _a[0], height = _a[1];
            var x = width * this.scale;
            var y = height * this.scale;
            var _b = Image.getOrigin(), ox = _b[0], oy = _b[1];
            ctx.drawImage(el, ox, oy, x, y);
            // ctx.beginPath()
            // ctx.fillStyle = "red"
            // ctx.fillText(`${x}, ${y}`, 10, 550)
            // ctx.closePath()
        };
        Platform.prototype.renderGuideLine = function () {
            var ctx = this.ctx;
            var _a = this.offset, x = _a[0], y = _a[1];
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.moveTo(0, y);
            ctx.lineTo(this.options.width, y);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.options.height);
            ctx.setLineDash([5]);
            ctx.stroke();
            ctx.closePath();
        };
        Platform.prototype.renderShape = function (shape) {
            var _this = this;
            var Image = this.Image;
            if (shape.isHidden()) {
                return;
            }
            var ctx = this.ctx;
            var scale = this.scale;
            var positions = shape.positions;
            var style = shape.getStyle();
            var dotColor = style.dotColor, dotRadius = style.dotRadius, lineColor = style.lineColor, lineWidth = style.lineWidth, fillColor = style.fillColor;
            var rp = Image.getRelativePositions(positions, scale);
            var before = null;
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = lineWidth * scale;
            rp.forEach(function (point, index) {
                var cx = point[0], cy = point[1];
                if (before) {
                    ctx.moveTo(before[0], before[1]);
                    ctx.lineTo(cx, cy);
                    if (rp.length - 1 === index && (shape.isClose() || shape.type === Shape_1$1.ShapeType.Rect)) {
                        var _a = rp[0], x = _a[0], y = _a[1];
                        ctx.lineTo(x, y);
                    }
                }
                before = [cx, cy];
            });
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            rp.forEach(function (point, idx) {
                var cx = point[0], cy = point[1];
                if (idx === 0) {
                    ctx.moveTo(point[0], point[1]);
                }
                else {
                    ctx.lineTo(cx, cy);
                }
            });
            ctx.globalAlpha = .7;
            ctx.fillStyle = fillColor;
            ctx.fill();
            ctx.closePath();
            ctx.globalAlpha = 1;
            rp.forEach(function (point) {
                var cx = point[0], cy = point[1];
                ctx.beginPath();
                ctx.fillStyle = dotColor;
                ctx.arc(cx, cy, dotRadius * _this.scale, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
            });
            if (this.isTagShow && shape.isShowTag() && shape.tag && shape.isClose()) {
                var _a = rp[0], x = _a[0], y = _a[1];
                var scale_1 = this.scale;
                var padding = style.dotRadius * scale_1;
                var tag = shape.tag;
                var fontSize = this.fontSize * scale_1;
                var w = fontSize * tag.length + padding * 2;
                var h = fontSize + padding * 2;
                // 底色
                ctx.beginPath();
                ctx.fillStyle = style.dotColor;
                ctx.rect(x, y - h - padding, w, h);
                ctx.fill();
                ctx.closePath();
                // 文字
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.font = Math.floor(fontSize) + "px/1 Arial";
                ctx.fillText(tag, x + padding, y - padding * 2.5);
                ctx.closePath();
            }
            ctx.font = Math.floor(this.fontSize) + "px/1 Arial";
        };
        Platform.prototype.renderCache = function () {
            if (!this.cache)
                return;
            this.renderShape(this.cache);
        };
        Platform.prototype.renderShapeList = function () {
            var _this = this;
            var shapeList = this.shapeList;
            if (!shapeList.length)
                return;
            var active = null;
            shapeList.forEach(function (shape) {
                if (shape.isActive()) {
                    active = shape;
                    return;
                }
                _this.renderShape(shape);
            });
            if (active) {
                this.renderShape(active);
            }
        };
        Platform.prototype.forceRender = function () {
            this.clearCanvas();
            this.renderBackground();
            this.renderImage();
            this.renderShapeList();
            this.renderCache();
            if (this.isGuideLine) {
                this.renderGuideLine();
            }
            this.renderLocker = false;
        };
        Platform.prototype.render = function () {
            var _this = this;
            if (this.renderLocker)
                return;
            this.renderLocker = true;
            setTimeout(function () {
                _this.forceRender();
            }, 17);
        };
        return Platform;
    }(EventReceiver_1$2.default));
    var _default$3 = Platform;


    var Platform_1 = /*#__PURE__*/Object.defineProperty({
    	default: _default$3
    }, '__esModule', {value: true});

    var package_json_1 = tslib_1.__importDefault(require$$0);
    var Platform_1$1 = tslib_1.__importDefault(Platform_1);
    var Shape_1$2 = tslib_1.__importDefault(Shape_1);
    var IDGenerator_1$1 = tslib_1.__importDefault(IDGenerator_1);
    var LabelImg = /** @class */ (function (_super) {
        tslib_1.__extends(LabelImg, _super);
        function LabelImg(container, options) {
            var _this = _super.call(this, container, options) || this;
            _this.version = package_json_1.default.version;
            _this.author = package_json_1.default.author;
            return _this;
        }
        LabelImg.Shape = Shape_1$2.default;
        LabelImg.IDGenerator = IDGenerator_1$1.default;
        return LabelImg;
    }(Platform_1$1.default));
    var _default$4 = LabelImg;

    return _default$4;

})));
