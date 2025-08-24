import { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { useLanguage } from '@/contexts/LanguageContext';
import TransportTypeSelector from './TransportTypeSelector';
import CargoTypeSelector from './CargoTypeSelector';
import CalculatorInput from './CalculatorInput';
import { calculateVolume, calculatePerimeter, calculateArea, calculateDeliveryCost } from '@/utils/calculatorUtils';

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

  // Функция для безопасного получения строки из перевода
  const getTranslation = (key: string): string => {
    const translation = t(key);
    return Array.isArray(translation) ? translation[0] : translation;
  };

  useEffect(() => {
    if (transportType === 'plane') {
      setIsFormValid(Boolean(weight && length && width && height));
    } else if (transportType === 'truck') {
      if (cargoType === 'small') {
        setIsFormValid(Boolean(weight));
      } else {
        setIsFormValid(Boolean(weight && volume));
      }
    }
  }, [transportType, cargoType, weight, length, width, height, volume]);

  const calculateCost = () => {
    if (!isFormValid) {
      const errorMessage = getTranslation('calculator.error');
      setResult(errorMessage);
      return;
    }

    const weightKg = parseFloat(weight) || 0;

    if (transportType === 'plane') {
      const vol = calculateVolume(length, width, height);
      if (vol <= 0 || weightKg <= 0) {
        setResult("Объем или вес не могут быть меньше или равны нулю.");
        return;
      }
      const cost = calculateDeliveryCost(vol, weightKg, true);
      setCalculationData({
        weight,
        length,
        width,
        height,
        perimeter: calculatePerimeter(length, width).toFixed(2),
        area: calculateArea(length, width).toFixed(2),
        volume: vol.toFixed(2),
        cost,
        transportType: 'plane',
      });
      const resultMessage = getTranslation('calculator.result');
      setResult(`${resultMessage}: $${cost}`);
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
        const resultMessage = getTranslation('calculator.result');
        setResult(`${resultMessage}: $${cost.toFixed(2)}`);
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
        const resultMessage = getTranslation('calculator.result');
        setResult(`${resultMessage}: $${cost}`);
      }
    }
  };

  return (
    <section id="calculator" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {getTranslation('calculator.title')}
        </h2>
        <div className="max-w-4xl mx-auto">
          <TransportTypeSelector 
            transportType={transportType} 
            setTransportType={setTransportType} 
          />

          {transportType === 'truck' && (
            <CargoTypeSelector 
              cargoType={cargoType} 
              setCargoType={setCargoType} 
            />
          )}

          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="space-y-4 sm:space-y-8">
              {transportType === 'truck' && cargoType === 'small' ? (
                <CalculatorInput
                  label={getTranslation('calculator.weight')}
                  value={weight}
                  onChange={setWeight}
                  icon="weight"
                  max={10000}
                  helpText={getTranslation('calculator.weightHelp')}
                />
              ) : transportType === 'truck' && cargoType === 'large' ? (
                <>
                  <CalculatorInput
                    label={getTranslation('calculator.volume')}
                    value={volume}
                    onChange={setVolume}
                    icon="ruler"
                    max={1000}
                    helpText={getTranslation('calculator.volumeHelp')}
                  />
                  <CalculatorInput
                    label={getTranslation('calculator.weight')}
                    value={weight}
                    onChange={setWeight}
                    icon="weight"
                    max={10000}
                    helpText={getTranslation('calculator.weightHelp')}
                  />
                </>
              ) : (
                <>
                  <CalculatorInput
                    label={getTranslation('calculator.length')}
                    value={length}
                    onChange={setLength}
                    icon="ruler"
                    max={20}
                  />
                  <CalculatorInput
                    label={getTranslation('calculator.width')}
                    value={width}
                    onChange={setWidth}
                    icon="ruler"
                    max={20}
                  />
                  <CalculatorInput
                    label={getTranslation('calculator.height')}
                    value={height}
                    onChange={setHeight}
                    icon="ruler"
                    max={20}
                  />
                  <CalculatorInput
                    label={getTranslation('calculator.weight')}
                    value={weight}
                    onChange={setWeight}
                    icon="weight"
                    max={10000}
                    helpText={getTranslation('calculator.weightHelp')}
                  />

                  {length && width && height && (
                    <>
                      <div>
                        <p className="text-sm font-medium mb-2">
                          {getTranslation('calculator.perimeter')}: {calculatePerimeter(length, width).toFixed(2)} м
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{getTranslation('calculator.perimeterHelp')}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">
                          {getTranslation('calculator.area')}: {calculateArea(length, width).toFixed(2)} м²
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{getTranslation('calculator.areaHelp')}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium mb-2">
                          {getTranslation('calculator.volume')}: {calculateVolume(length, width, height).toFixed(2)} м³
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{getTranslation('calculator.volumeHelp')}</p>
                      </div>
                    </>
                  )}
                </>
              )}

              <button
                onClick={calculateCost}
                disabled={!isFormValid}
                className={`w-full ${
                  isFormValid
                    ? 'bg-secondary text-white'
                    : 'bg-gray-300 cursor-not-allowed'
                } py-3 rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg active:scale-95`}
              >
                {getTranslation('calculator.calculate')}
              </button>

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