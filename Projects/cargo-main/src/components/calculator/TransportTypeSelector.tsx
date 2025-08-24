import { Truck, Plane } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type TransportType = 'truck' | 'plane';

interface TransportTypeSelectorProps {
  transportType: TransportType;
  setTransportType: (type: TransportType) => void;
}

const TransportTypeSelector = ({ transportType, setTransportType }: TransportTypeSelectorProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex gap-4 mb-8 justify-center">
      <button
        onClick={() => setTransportType('truck')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
          transportType === 'truck'
            ? 'bg-primary text-white'
            : 'bg-gray-100'
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
            : 'bg-gray-100'
        }`}
      >
        <Plane className="w-5 h-5" />
        {t('calculator.transportTypes.plane')}
      </button>
    </div>
  );
};

export default TransportTypeSelector;