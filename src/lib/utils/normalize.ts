export const normalize = (value: number, range: { min: number, max: number }): number => {
  if (range.max === range.min) return 1;
  return (value - range.min) / (range.max - range.min);
}