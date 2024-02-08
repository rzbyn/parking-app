function subsetsMax(arr: number[], size: number): number {
  const subsets: number[][] = [];
  for (let i = 0; i < arr.length - size; i++) {
    subsets.push(arr.slice(i, i + size));
  }

  const minVals: number[] = subsets.map((subset) => Math.min(...subset));

  return Math.max(...minVals);
}
