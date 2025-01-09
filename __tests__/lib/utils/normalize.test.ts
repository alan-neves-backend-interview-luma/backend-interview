import { normalize } from "../../../src/lib/utils";

describe('normalize', () => {

  it('should return 1 when the range min and max are equal', () => {
    const value = 5;
    const range = { min: 5, max: 5 };
    
    const result = normalize(value, range);
    
    expect(result).toBe(1);
  });

  it('should return 0 when value equals the min of the range', () => {
    const value = 0;
    const range = { min: 0, max: 10 };
    
    const result = normalize(value, range);
    
    expect(result).toBe(0);
  });

  it('should return 1 when value equals the max of the range', () => {
    const value = 10;
    const range = { min: 0, max: 10 };
    
    const result = normalize(value, range);
    
    expect(result).toBe(1);
  });

  it('should return a value between 0 and 1 for a value within the range', () => {
    const value = 5;
    const range = { min: 0, max: 10 };
    
    const result = normalize(value, range);
    
    expect(result).toBe(0.5);
  });

  it('should return a value greater than 1 when the value exceeds the max of the range', () => {
    const value = 15;
    const range = { min: 0, max: 10 };
    
    const result = normalize(value, range);
    
    expect(result).toBe(1.5);
  });

  it('should return a negative value when the value is less than the min of the range', () => {
    const value = -5;
    const range = { min: 0, max: 10 };
    
    const result = normalize(value, range);
    
    expect(result).toBe(-0.5);
  });

});
