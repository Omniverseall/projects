export const calculateVolume = (length: string, width: string, height: string): number => {
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  return l * w * h;
};

export const calculatePerimeter = (length: string, width: string): number => {
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  return 2 * (l + w);
};

export const calculateArea = (length: string, width: string): number => {
  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  return l * w;
};

export const calculateDeliveryCost = (cubicMeters: number, weightKg: number, isPlane: boolean = false): string => {
  const basePricePerCubicMeter = isPlane ? 200 : 120;
  const standardWeightPerCubicMeter = 200;

  const weightPerCubicMeter = weightKg / cubicMeters;

  let pricePerCubicMeter;
  if (weightPerCubicMeter <= standardWeightPerCubicMeter) {
    pricePerCubicMeter = basePricePerCubicMeter;
  } else {
    pricePerCubicMeter = basePricePerCubicMeter * (weightPerCubicMeter / standardWeightPerCubicMeter);
  }

  const totalCost = pricePerCubicMeter * cubicMeters;
  return totalCost.toFixed(2);
};