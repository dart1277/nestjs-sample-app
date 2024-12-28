import { expect } from '@jest/globals';

import './custom_matchers';

describe('custom matchers', () => {
  it('should use custom matcher', () => {
    const actual = Array.from(Array(32).keys());
    expect(actual).toBeLongList(32);
  });
});
