import * as assert from 'node:assert';

describe('test doubles', () => {
  const obj = {
    foo: 'bar',
    run: (v: string) => v,
  };

  const staticDate = 1735322904789;

  let spy1;
  beforeEach(async () => {
    spy1 = jest.spyOn(obj, 'run');
    // spy1 = jest.spyOn(obj as any, 'run'); // spy on private method
  });

  it('use mock', async () => {
    const callbackMock = jest.fn((val: string) => val);
    // callbackMock.mockImplementation((val: string) => '-' + val);
    // callbackMock.mockReset(); // removes implementation
    //callbackMock.mockRestore(); // works only with spies, jest.fn() mocks are reset

    const arg1 = '1234';

    function testFunction(val: string, cbk: (v: string) => string): string {
      return cbk(val);
    }

    const out = testFunction(arg1, callbackMock);
    expect(out).toBe(arg1);
    expect(callbackMock).toBeCalledWith(arg1);
    expect(callbackMock).toReturn();
    expect(callbackMock).toReturnWith(expect.any(String));
    expect(callbackMock).toReturnTimes(1);
  });

  it('use mock async ', async () => {
    const callbackMock = jest.fn(async (val: string) => val);
    // callbackMock.mockImplementation((val: string) => '-' + val);
    // callbackMock.mockReset(); // removes implementation
    //callbackMock.mockRestore(); // works only with spies, jest.fn() mocks are reset

    const arg1 = '1234';

    async function testFunction(
      val: string,
      cbk: (v: string) => Promise<string>,
    ): Promise<string> {
      return cbk(val);
    }

    const out = testFunction(arg1, callbackMock);
    expect(callbackMock).toBeCalledWith(arg1);
    expect(callbackMock).toReturn();
    expect(out).resolves.toEqual(expect.any(String));
    expect(out).resolves.toEqual(arg1);
    expect(callbackMock).toReturnTimes(1);
  });

  it('use spy', async () => {
    spy1.mockImplementation((v: string) => `-${v}`);
    jest.replaceProperty(obj, 'foo', 'foo'); // works like monkeypatch
    const str1 = 'some1';
    obj.run(str1);
    expect(spy1).toBeCalledWith(str1);
    expect(spy1).nthReturnedWith(1, `-${str1}`);
    //spy1.mockRestore(); // resets spy state, spy no longer wraps object
    // and is called on every mock by jest.restoreAllMocks()
    //jest.restoreAllMocks(); // resets jest.replaceProperty, this method has effect on SpyOn and replaceProperty only
    // expect(obj.run(str1)).toEqual(str1);
    //expect(obj.foo).toEqual('bar');
    // expect(spy1).not.toBeCalled();
  });

  it('use spy2', async () => {
    spy1.mockImplementation((v: string) => `-${v}`);
    jest.replaceProperty(obj, 'foo', 'foo'); // works like monkeypatch
    const str1 = 'some1';
    obj.run(str1);
    expect(spy1).toBeCalledWith(str1);
    expect(spy1).nthReturnedWith(1, `-${str1}`);
    //spy1.mockRestore(); // resets spy state, spy no longer wraps object
    // and is called on every mock by jest.restoreAllMocks()
    //jest.restoreAllMocks(); // resets jest.replaceProperty, this method has effect on SpyOn and replaceProperty only
    // expect(obj.run(str1)).toEqual(str1);
    // expect(obj.foo).toEqual('bar');
    // expect(spy1).not.toBeCalled();
  });

  it('use date', async () => {
    const mockDate = jest.spyOn(Date, 'now').mockReturnValue(staticDate);
    const no = Date.now();
    expect(no).toBe(staticDate);
    expect(mockDate).toBeCalled();
    jest.replaceProperty(obj, 'foo', 'foo'); // works like monkeypatch
    expect(obj.foo).toBe('foo');
  });

  it('use date2', async () => {
    const no = Date.now();
    expect(no).not.toBe(staticDate);
    expect(obj.foo).not.toBe('foo');
  });

  afterEach(() => {
    //jest.resetAllMocks();
    //jest.clearAllMocks();
    jest.restoreAllMocks();
  });
});
