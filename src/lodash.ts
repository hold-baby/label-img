import padStart from "lodash/padStart";
import merge from "lodash/merge";
import isUndefined from "lodash/isUndefined";
import isString from "lodash/isString";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import isFunction from "lodash/isFunction";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import { ThrottleSettings } from "lodash";

export default {
  isUndefined,
  padStart,
  merge,
  isString,
  isObject,
  isArray,
  isFunction,
  debounce,
  throttle: throttle as <T extends (...args: any) => any>(
    func: T,
    wait?: number | undefined,
    options?: ThrottleSettings | undefined
  ) => Function,
};
