describe('Utils test suite', () => {
  test('should return uppercase', () => {
    const res = 'asd'.toLocaleUpperCase();
    expect(res).toMatch(/[A-Z]+/);
  });

  describe('Test array equality', () => {
    // describe.only(), describe.skip()
    it('should match arrays', () => {
      // it.only() - runs only this test
      // it.concurrent() - runs test concurrently, experimental
      // it.todo()
      // aliases it - test
      // xit - skip, fit - only,
      const a1 = { a: 1 };
      const a2 = { b: 2 };
      const a3 = { c: 3 };

      const b1 = { a: 1 };
      const b2 = { b: 2 };
      const b3 = { c: 3 };

      const ar1 = [a1, a2, a3];
      const ar2 = [b1, b2, b3];
      //expect(ar1).toBe(ar2); // use toBe with primitive types only
      expect(ar1).toEqual(ar2);

      // expect in any order

      expect(ar2).toEqual(expect.arrayContaining([b2, b1]));

      const o2 = {
        a: 1,
        b: 3,
      };
      expect(o2).toMatchObject(a1); // ignores additional fields in o2
      /*    const o3: { a: number } = o2;
          console.log(o3);*/
    });
  });

  describe('Parametrized strong test', () => {
    it.each(['a', 'b', 'c'])('should match letters', (v, done) => {
      const expected = 'abcd';
      expect([...expected].includes(v)).toBeTruthy();
      if (false) {
        done('test failed');
      }
      done();
    });
  });

  afterEach(() => {
    // afterEach is usually used to clear mocks
    // hooks like before/afterEach are scoped to the nearest enclosing describe
    //console.log('Clearing mocks');
    jest.clearAllMocks();
  });

  describe('throwing expectations', () => {
    it('should match letters', (done) => {
      function fl(v: number) {
        if (v < 0) throw new Error('Argument is negative');
      }

      expect(() => fl(-1)).toThrow();
      expect(() => fl(-1)).toThrowError('Argument is negative');
      expect(() => fl(1)).not.toThrow();

      // or use try / catch instead
      try {
        fl(-1);
        done('it should throw');
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
        expect(e).toHaveProperty('message', 'Argument is negative');
        done();
      }
    });
  });
});
