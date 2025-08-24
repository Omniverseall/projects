import { createContext, useContext, useState } from 'react';

interface CalculationData {
  weight: string;
  length: string;
  width: string;
  height: string;
  perimeter: string;
  area: string;
  volume: string;
  cost: string;
  transportType?: 'truck' | 'plane';
  cargoType?: 'small' | 'large';
}

interface AppContextType {
  calculationData: CalculationData;
  setCalculationData: (data: CalculationData) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [calculationData, setCalculationData] = useState<CalculationData>({
    weight: "",
    length: "",
    width: "",
    height: "",
    perimeter: "",
    area: "",
    volume: "",
    cost: "",
  });

  return (
    <AppContext.Provider value={{ calculationData, setCalculationData }}>
      {children}
    </AppContext.Provider>
  );
};