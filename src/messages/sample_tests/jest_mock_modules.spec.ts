import * as Ut from '../sub/util';
import * as util from "node:util";

// info on how to mock ES6 class
// https://jestjs.io/docs/es6-class-mocks#calling-jestmock-with-the-module-factory-parameter

// mock regular export
/*
jest.mock('./sub/util', () => ({
  //...jest.requireActual('./sub/util') // uncomment if providing mocks to part of the implementation is desired
  fun3: () => 1,
  Util: jest.fn().mockImplementation(() => ({
    fun1: () => -1,
    fun2: () => -1,
  })),
}));*/

const fun1Mock = jest.fn();

// mock default export

/*
jest.mock('./sub/util', () => ({
  //...jest.requireActual('./sub/util') // uncomment if providing mocks to part of the implementation is desired
  __esModule: true, // required to mock default export
  fun3: () => 1,
  default: jest.fn().mockImplementation(() => ({
    fun1: un1Mock, // works here due to mockImplementation
    fun1: () => fun1Mock(), // use this syntax if no  jest.fn().mockImplementation was used
    // if you get "mock does not exist" error, call mock as a function, since it's initialized outside of jest.mock() closure, or use jest.doMock() instead
    fun2: () => -1,
  })),
}));
*/

// https://stackoverflow.com/questions/53225236/typescript-jest-says-mock-or-mockreturnedvalue-do-not-exist-on-types-i-wish-to-m

jest.mock('../sub/util'); // call to mock is mandatory for mocked to work
//const utilMock = jest.mocked(Ut);
const utilFun3Mock = jest.mocked(Ut.fun3);
const utilMock = jest.mocked(Ut.default).mockImplementation(() => ({
  fun1: () => fun1Mock(),
  fun2: () => -1,
}));

describe('test package mocks', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should override fun2', () => {
    // utilFun3Mock.mockImplementation(() => 88);
    utilFun3Mock.mockReturnValue(88);
    expect(Ut.fun3()).toBe(88);
    expect(utilFun3Mock).toBeCalled();
    console.log(utilMock.mock.calls);
  });

  it('should not override fun1', () => {
    //fun1Mock.mockReturnValueOnce(-2);
    fun1Mock.mockImplementation(() => -2);
    expect(new Ut.default().fun1()).toBe(-2);
  });

  it('should not override fun2', () => {
    expect(new Ut.default().fun2()).toBe(-1);
  });
});

// timing issues in async tests can sometimes be fixed by
// await new Promise(process.nextTick)
