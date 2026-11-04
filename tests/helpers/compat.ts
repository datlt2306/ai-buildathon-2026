/**
 * Test Runner Compatibility Layer
 * Provides describe, it, expect using Node 22 native node:test and node:assert
 * Enables zero-dependency, standalone test execution
 */

import { describe as nodeDescribe, it as nodeIt } from 'node:test';
import assert from 'node:assert/strict';

export const describe = nodeDescribe;
export const it = nodeIt;

export function expect(actual: any, contextMessage?: string) {
  return {
    toBe(expected: any, message?: string) {
      assert.strictEqual(actual, expected, message || contextMessage);
    },
    toEqual(expected: any, message?: string) {
      assert.deepStrictEqual(actual, expected, message || contextMessage);
    },
    toContain(item: any, message?: string) {
      if (typeof actual === 'string') {
        assert.ok(
          actual.includes(item),
          message || contextMessage || `Expected string to contain "${item}", but received: "${actual}"`
        );
      } else if (Array.isArray(actual)) {
        assert.ok(
          actual.includes(item),
          message || contextMessage || `Expected array to contain "${item}", but array is: [${actual.join(', ')}]`
        );
      } else if (actual && typeof actual === 'object') {
        assert.ok(item in actual, message || contextMessage || `Expected object to contain property "${item}"`);
      } else {
        assert.fail(`Invalid target for toContain: ${actual}`);
      }
    },
    toHaveLength(len: number, message?: string) {
      assert.strictEqual(
        actual?.length,
        len,
        message || contextMessage || `Expected length ${len}, but got ${actual?.length}`
      );
    },
    toBeNull(message?: string) {
      assert.strictEqual(actual, null, message || contextMessage || `Expected null, got ${actual}`);
    },
    toBeDefined(message?: string) {
      assert.notStrictEqual(actual, undefined, message || contextMessage || `Expected value to be defined`);
    },
    toBeUndefined(message?: string) {
      assert.strictEqual(actual, undefined, message || contextMessage || `Expected value to be undefined`);
    },
    toBeTruthy(message?: string) {
      assert.ok(actual, message || contextMessage || `Expected truthy value, got ${actual}`);
    },
    toBeFalsy(message?: string) {
      assert.ok(!actual, message || contextMessage || `Expected falsy value, got ${actual}`);
    },
    toBeGreaterThan(num: number, message?: string) {
      assert.ok(actual > num, message || contextMessage || `Expected ${actual} > ${num}`);
    },
    toBeGreaterThanOrEqual(num: number, message?: string) {
      assert.ok(actual >= num, message || contextMessage || `Expected ${actual} >= ${num}`);
    },
    toBeLessThan(num: number, message?: string) {
      assert.ok(actual < num, message || contextMessage || `Expected ${actual} < ${num}`);
    },
    toBeLessThanOrEqual(num: number, message?: string) {
      assert.ok(actual <= num, message || contextMessage || `Expected ${actual} <= ${num}`);
    },
    toMatch(regex: RegExp, message?: string) {
      assert.match(
        String(actual),
        regex,
        message || contextMessage || `Expected "${actual}" to match regex ${regex}`
      );
    },
    not: {
      toBe(expected: any, message?: string) {
        assert.notStrictEqual(actual, expected, message || contextMessage);
      },
      toBeNull(message?: string) {
        assert.notStrictEqual(actual, null, message || contextMessage || `Expected non-null value`);
      },
      toContain(item: any, message?: string) {
        if (typeof actual === 'string') {
          assert.ok(
            !actual.includes(item),
            message || contextMessage || `Expected string NOT to contain "${item}"`
          );
        } else if (Array.isArray(actual)) {
          assert.ok(
            !actual.includes(item),
            message || contextMessage || `Expected array NOT to contain "${item}"`
          );
        }
      },
    },
  };
}
