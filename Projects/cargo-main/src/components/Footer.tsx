import { FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '@/hooks/LanguageContext.hooks';

// Тип для ключей переводов
type TranslationKey = 
  | 'footer.about.title'
  | 'footer.about.description'
  | 'footer.about.fullDescription'
  | 'footer.contacts.title'
  | 'footer.contacts.phone'
  | 'footer.contacts.addressLine1'
  | 'footer.contacts.addressLine2'
  | 'footer.warehouses.title'
  | 'footer.warehouses.locations'
  | 'footer.warehouses.locations.0'
  | 'footer.warehouses.locations.1'
  | 'footer.warehouses.locations.2'
  | 'footer.warehouses.locations.3'
  | 'footer.warehouses.locations.4'
  | 'footer.social.title'
  | 'footer.social.description'
  | 'footer.copyright';

const Footer = () => {
  const { t } = useLanguage();
  // Получаем массив локаций
  const warehouseLocations = [
    t('footer.warehouses.locations.0' as const),
    t('footer.warehouses.locations.1' as const), 
    t('footer.warehouses.locations.2' as const),
    t('footer.warehouses.locations.3' as const),
    t('footer.warehouses.locations.4' as const)
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* О компании */}
          <div>
            <h3 className="text-2xl font-bold mb-4">{t('footer.about.title' as const)}</h3>
            <p className="text-gray-400 mb-4">
              {t('footer.about.description' as const)}
            </p>
            <p className="text-gray-400">
              {t('footer.about.fullDescription' as const)}
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contacts.title' as const)}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>{t('footer.contacts.phone' as const)}: +86 123 456 7890</li>
              <li>Email: info@cargo-china.com</li>
              <li>
                {t('footer.contacts.addressLine1' as const)}
                <br />
                {t('footer.contacts.addressLine2' as const)}
              </li>
            </ul>
          </div>

          {/* Наши склады */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.warehouses.title' as const)}</h4>
            <ul className="space-y-2 text-gray-400">
              {warehouseLocations.map((location, index) => (
                <li key={index}>{location}</li>
              ))}
            </ul>
          </div>

          {/* Социальные сети */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.social.title' as const)}</h4>
            <div className="flex space-x-4">
              <a
                href="https://t.me/cargo_china"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <FaTelegramPlane className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/cargo_china"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-600 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
            <p className="text-gray-400 mt-4">
              {t('footer.social.description' as const)}
            </p>
          </div>
        </div>

        {/* Копирайт */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright' as const)}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;