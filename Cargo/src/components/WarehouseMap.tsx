import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/hooks/LanguageContext.hooks';

// Импортируем иконки вручную
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Устанавливаем пути к иконкам
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon; // Устанавливаем иконку по умолчанию для всех маркеров

interface Warehouse {
  city: string;
  coordinates: [number, number];
}

const warehouses: Warehouse[] = [
  { city: "Гуанчжоу", coordinates: [23.1291, 113.2644] },
  { city: "Шэньчжэнь", coordinates: [22.5431, 114.0579] },
  { city: "Шанхай", coordinates: [31.2304, 121.4737] },
  { city: "Пекин", coordinates: [39.9042, 116.4074] },
  { city: "Иу", coordinates: [29.3163, 120.0745] },
  { city: "Сямынь", coordinates: [24.4798, 118.0894] },
  { city: "Ханчжоу", coordinates: [30.2741, 120.1551] },
  { city: "Чэнду", coordinates: [30.5728, 104.0668] },
  { city: "Чунцин", coordinates: [29.5630, 106.5516] },
  { city: "Ухань", coordinates: [30.5810, 114.2666] },
  { city: "Тяньцзинь", coordinates: [39.1422, 117.1767] },
  { city: "Нинбо", coordinates: [29.8683, 121.5440] },
  { city: "Сучжоу", coordinates: [31.2989, 120.5853] },
  { city: "Циндао", coordinates: [36.0671, 120.3826] },
  { city: "Наньцзин", coordinates: [32.0603, 118.7969] },
  { city: "Хоргос", coordinates: [44.2239, 80.4167] }
];

const WarehouseMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Инициализация карты
      map.current = L.map(mapContainer.current).setView([31.9042, 116.4074], 4);

      // Добавление тайлов MapTiler
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=vTRt3PHodyeuzWbTzEzD', {
        attribution: '© <a href="https://www.maptiler.com/">MapTiler</a> © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(map.current);

      // Добавление маркеров для складов
      warehouses.forEach(({ city, coordinates }) => {
        const marker = L.marker(coordinates).addTo(map.current!);
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${city}</h3>
            <p class="text-sm text-gray-600">Современный склад</p>
          </div>
        `);
      });

      // Добавление контроля масштабирования
      L.control.zoom({ position: 'topright' }).addTo(map.current);

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <section id="map" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {t('warehouses.title')}
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          {t('warehouses.description')}
        </p>
        <div className="relative w-full h-[600px] rounded-lg overflow-hidden shadow-xl">
          <div ref={mapContainer} className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
};

export default WarehouseMap;
