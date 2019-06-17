import { toPairs, cond, is, fromPairs, always } from 'ramda';
/* tslint:disable no-any */
const isDefined = (subject) => typeof subject !== 'undefined' && subject !== null;
const isEqual = (comparator, followingValue) => (value) => is(Function, comparator) ?
    comparator(value) === followingValue :
    value === comparator;
/* tslint:enable no-any */
const all = (...args) => !args.some(arg => !Boolean(arg));
export { toPairs, cond, is, fromPairs, isEqual, isDefined, all, always };
