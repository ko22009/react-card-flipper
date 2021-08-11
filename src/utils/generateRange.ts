const generateRange = (start: number, stop: number) =>
  Array.from({ length: stop - start + 1 }, (_, i) => {
    const index = start + Math.round(i / 2) - (i % 2);
    return {
      index: index,
      value: index,
    };
  });

export default generateRange;
