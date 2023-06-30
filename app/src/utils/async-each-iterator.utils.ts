export const asyncEachIterator = (arr: any[], fn: any) => {
  let i = 0;
  const last = arr.length - 1;
  const next = (i) => {
    setTimeout(() => {
      fn(arr[i], i);
      if (i !== last) next(++i);
    }, 500);
  };
  next(i);
};
