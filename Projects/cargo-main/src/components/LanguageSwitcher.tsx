import React from 'react';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/hooks/LanguageContext.hooks';
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative group">
      {/* Кнопка глобуса */}
      <button className="transition-colors">
        <Globe className="w-6 h-6" />
      </button>

      {/* Меню смены языка */}
      <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setLanguage('en')}
          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
        >
          English
        </button>
        <button
          onClick={() => setLanguage('ru')}
          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
        >
          Русский
        </button>
        <button
          onClick={() => setLanguage('uz')}
          className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
        >
          O'zbekcha
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;