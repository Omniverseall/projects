import { Weight, Ruler } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CalculatorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: 'weight' | 'ruler';
  max?: number;
  helpText?: string;
}

const CalculatorInput = ({ label, value, onChange, icon, max, helpText }: CalculatorInputProps) => {
  const validateInput = (inputValue: string) => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0 && (max === undefined || numValue <= max)) {
      onChange(inputValue);
    } else if (inputValue === "") {
      onChange("");
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center gap-2">
        {icon === 'weight' ? (
          <Weight className="w-5 h-5 text-gray-500" />
        ) : (
          <Ruler className="w-5 h-5 text-gray-500" />
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => validateInput(e.target.value)}
          placeholder="0"
          className="w-full p-2 border rounded-lg"
          min="0"
          max={max}
        />
      </div>
      {helpText && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
};

export default CalculatorInput;