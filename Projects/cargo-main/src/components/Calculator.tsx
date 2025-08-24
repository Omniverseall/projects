import { useState, useEffect } from 'react';
import { Truck, Plane, Weight, Ruler, Box } from 'lucide-react';
import { useAppContext } from './AppContext';
import { useLanguage } from '@/hooks/LanguageContext.hooks';

const Calculator = () => {
  const { t } = useLanguage();
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [volume, setVolume] = useState("");
  const [transportType, setTransportType] = useState<'truck' | 'plane'>('truck');
  const [cargoType, setCargoType] = useState<'small' | 'large'>('small');
  const [isFormValid, setIsFormValid] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { setCalculationData } = useAppContext();

  useEffect(() => {
    if (transportType === 'plane') {
      if (weight && length && width && height) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else if (transportType === 'truck') {
      if (cargoType === 'small' && weight) {
        setIsFormValid(true);
      } else if (cargoType === 'large' && weight && volume) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }, [transportType, cargoType, weight, length, width, height, volume]);

  const calculateVolume = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    return l * w * h;
  };

  const calculatePerimeter = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    return 2 * (l + w);
  };

  const calculateArea = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    return l * w;
  };

  const calculateDeliveryCost = (cubicMeters: number, weightKg: number, isPlane: boolean = false) => {
    const basePricePerCubicMeter = isPlane ? 200 : 120; // Базовая цена за кубометр
    const standardWeightPerCubicMeter = 200; // Стандартный вес на кубометр в кг

    // Вычисляем вес одного кубометра
    const weightPerCubicMeter = weightKg / cubicMeters;

    // Если вес на кубометр меньше или равен стандартному, берем базовую цену
    let pricePerCubicMeter;
    if (weightPerCubicMeter <= standardWeightPerCubicMeter) {
      pricePerCubicMeter = basePricePerCubicMeter;
    } else {
      // Если вес на кубометр больше стандартного, увеличиваем цену пропорционально
      pricePerCubicMeter = basePricePerCubicMeter * (weightPerCubicMeter / standardWeightPerCubicMeter);
    }

    // Общая стоимость
    const totalCost = pricePerCubicMeter * cubicMeters;
    return totalCost.toFixed(2); // Округляем до двух знаков после запятой
  };

  const calculateCost = () => {
    if (!isFormValid) {
      const errorMessage = t('calculator.error');
      setResult(typeof errorMessage === 'string' ? errorMessage : 'Please fill in all fields');
      return;
    }

    const weightKg = parseFloat(weight) || 0;

    if (transportType === 'plane') {
      const volume = calculateVolume();
      if (volume <= 0 || weightKg <= 0) {
        setResult("Объем или вес не могут быть меньше или равны нулю.");
        return;
      }
      const cost = calculateDeliveryCost(volume, weightKg, true);
      setCalculationData({
        weight,
        length,
        width,
        height,
        perimeter: calculatePerimeter().toFixed(2),
        area: calculateArea().toFixed(2),
        volume: volume.toFixed(2),
        cost,
        transportType: 'plane',
      });
      const resultMessage = t('calculator.result');
      setResult(typeof resultMessage === 'string' ? `${resultMessage}: $${cost}` : `Примерная стоимость доставки: $${cost}`);
    } else if (transportType === 'truck') {
      if (cargoType === 'small') {
        const cost = weightKg * 5.5;
        setCalculationData({
          weight,
          cost: cost.toFixed(2),
          length: "",
          width: "",
          height: "",
          perimeter: "",
          area: "",
          volume: "",
          transportType: 'truck',
          cargoType: 'small',
        });
        const resultMessage = t('calculator.result');
        setResult(typeof resultMessage === 'string' ? `${resultMessage}: $${cost.toFixed(2)}` : `Примерная стоимость доставки: $${cost.toFixed(2)}`);
      } else if (cargoType === 'large') {
        const vol = parseFloat(volume) || 0;
        if (vol <= 0 || weightKg <= 0) {
          setResult("Объем или вес не могут быть меньше или равны нулю.");
          return;
        }
        const cost = calculateDeliveryCost(vol, weightKg);
        setCalculationData({
          weight,
          volume,
          length: "",
          width: "",
          height: "",
          perimeter: "",
          area: "",
          cost,
          transportType: 'truck',
          cargoType: 'large',
        });
        const resultMessage = t('calculator.result');
        setResult(typeof resultMessage === 'string' ? `${resultMessage}: $${cost}` : `Примерная стоимость доставки: $${cost}`);
      }
    }
  };

  const validateInput = (value: string, setter: (value: string) => void, max?: number) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && (max === undefined || numValue <= max)) {
      setter(value);
    } else if (value === "") {
      setter("");
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('calculator.title')}
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-8 justify-center">
            <button
              onClick={() => setTransportType('truck')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                transportType === 'truck'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Truck className="w-5 h-5" />
              {t('calculator.transportTypes.truck')}
            </button>
            <button
              onClick={() => setTransportType('plane')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                transportType === 'plane'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Plane className="w-5 h-5" />
              {t('calculator.transportTypes.plane')}
            </button>
          </div>

          {transportType === 'truck' && (
            <div className="flex gap-4 mb-8 justify-center">
              <button
                onClick={() => setCargoType('small')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  cargoType === 'small'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Box className="w-5 h-5" />
                {t('calculator.cargoTypes.small')}
              </button>
              <button
                onClick={() => setCargoType('large')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  cargoType === 'large'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <Truck className="w-5 h-5" />
                {t('calculator.cargoTypes.large')}
              </button>
            </div>
          )}

          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="space-y-4 sm:space-y-8">
              {transportType === 'truck' && cargoType === 'small' ? (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('calculator.weight')}:
                  </label>
                  <div className="flex items-center gap-2">
                    <Weight className="w-5 h-5 text-gray-500" />
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => validateInput(e.target.value, setWeight, 10000)}
                      placeholder="0"
                      className="w-full p-2 border rounded-lg"
                      min="0"
                      max="10000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{t('calculator.weightHelp')}</p>
                </div>
              ) : transportType === 'truck' && cargoType === 'large' ? (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('calculator.volume')}:
                    </label>
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={volume}
                        onChange={(e) => validateInput(e.target.value, setVolume, 1000)}
                        placeholder="0"
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        max="1000"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t('calculator.volumeHelp')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('calculator.weight')}:
                    </label>
                    <div className="flex items-center gap-2">
                      <Weight className="w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => validateInput(e.target.value, setWeight, 10000)}
                        placeholder="0"
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        max="10000"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{t('calculator.weightHelp')}</p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('calculator.length')}:
                    </label>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => validateInput(e.target.value, setLength, 20)}
                        placeholder="0"
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('calculator.width')}:
                    </label>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => validateInput(e.target.value, setWidth, 20)}
                        placeholder="0"
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('calculator.height')}:
                    </label>
                    <div className="flex items-center gap-2">
                      <Ruler className="w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => validateInput(e.target.value, setHeight, 20)}
                        placeholder="0"
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        max="20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('calculator.weight')}:
                    </label>
                    <div className="flex items-center gap-2">
                      <Weight className="w-5 h-5 text-gray-500" />
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => validateInput(e.target.value, setWeight, 10000)}
                        placeholder="0"
                        className="w-full p-2 border rounded-lg"
                        min="0"
                        max="10000"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      {t('calculator.perimeter')}: {calculatePerimeter().toFixed(2)} м
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{t('calculator.perimeterHelp')}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      {t('calculator.area')}: {calculateArea().toFixed(2)} м²
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{t('calculator.areaHelp')}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">
                      {t('calculator.volume')}: {calculateVolume().toFixed(2)} м³
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{t('calculator.volumeHelp')}</p>
                  </div>
                </>
              )}

              <button
                onClick={calculateCost}
                disabled={!isFormValid}
                className={`w-full ${
                  isFormValid
                    ? 'bg-secondary hover:bg-secondary/90'
                    : 'bg-gray-300 cursor-not-allowed'
                } text-white py-3 rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95`}
              >
                {t('calculator.calculate')}
              </button>

              {/* Отображение результата */}
              {result && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-lg font-semibold">{result}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
