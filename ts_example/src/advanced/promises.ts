export async function promAllBatch<T>(
  promises: (() => Promise<T>)[],
  chunkSize: number = 4,
): Promise<PromiseSettledResult<T>[]> {
  const res: PromiseSettledResult<T>[] = [];
  for (let i = 0; i < promises.length; i += chunkSize) {
    const chunk = promises.slice(i, i + chunkSize);
    const chunkData = await Promise.allSettled(chunk.map((f) => f()));
    res.push(...chunkData);
  }
  return res;
}

/*async function st(i: number): Promise<number> {
  try {
    return await new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log(i);
        //reject(i);
        resolve(i);
      }, 1000),
    );
  } catch (error) {
    console.error('error', error);
    throw error;
    // return Promise.resolve(i);
  }
}*/

const mapSt = (i: number) => async (): Promise<number | Error> => {
  try {
    return await new Promise((resolve, reject) =>
      setTimeout(() => {
        console.log(i);
        reject(i);
        //resolve(i);
      }, 1000),
    );
  } catch (error) {
    console.error('error', error);
    throw error;
    // return Promise.resolve(i);
  }
};

async function run() {
  const data = [...Array(30).keys()].map(mapSt);

  const res = await promAllBatch(data);

  const rejected = res.filter((item) => item.status === 'rejected');

  console.log(rejected);
  console.log(res);
}

run();
