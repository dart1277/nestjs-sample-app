import { expect } from '@jest/globals';
// import type { MatcherFunction } from 'expect';

// https://jestjs.io/docs/configuration#setupfilesafterenv-array
// https://jestjs.io/docs/expect#expectextendmatchers

expect.extend({
  toBeLongList(received, length: number) {
    return {
      pass: received.length >= length,
      message: () => `List length is too short: ${received.length} < expected: ${length}`,
    };
  },
});

// requires only single import in each test file
// import './custom_matchers';
/*declare global {
  namespace jest {
    interface Matchers<R> {
      toBeLongList(length: number): R;
    }
  }
}
export {};*/

// requires additional import in each test file
// import { expect } from '@jest/globals';
// import './custom_matchers';
declare module 'expect' {
  // NOTE: example on asymmetric matchers in the docs seems to be incorrect
  export interface Matchers<R extends void | Promise<void>, T = unknown> {
    toBeLongList(length: number): R;
  }
}
