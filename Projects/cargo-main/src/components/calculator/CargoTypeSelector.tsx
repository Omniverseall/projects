import { Box, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type CargoType = 'small' | 'large';

interface CargoTypeSelectorProps {
  cargoType: CargoType;
  setCargoType: (type: CargoType) => void;
}

const CargoTypeSelector = ({ cargoType, setCargoType }: CargoTypeSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex gap-4 mb-8 justify-center">
      <button
        onClick={() => setCargoType('small')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
          cargoType === 'small'
            ? 'bg-secondary text-white'
            : 'bg-gray-100'
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
            : 'bg-gray-100'
        }`}
      >
        <Truck className="w-5 h-5" />
        {t('calculator.cargoTypes.large')}
      </button>
    </div>
  );
};

export default CargoTypeSelector;