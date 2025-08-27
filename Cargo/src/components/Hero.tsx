import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/LanguageContext.hooks';

const Hero = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    if (!isLoading && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isLoading]);

  return (
    <section id="hero" className="pt-16 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold">
              {t('hero.title')}
              <span className="text-primary block animate-slide-in-right">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <h3 className="font-semibold text-xl mb-3 text-primary">{t('hero.airDelivery')}</h3>
                <p className="text-gray-600">{t('hero.airDeliveryDesc')}</p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <h3 className="font-semibold text-xl mb-3 text-secondary">{t('hero.cargoDelivery')}</h3>
                <p className="text-gray-600">{t('hero.cargoDeliveryDesc')}</p>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li className="animate-fade-in [animation-delay:200ms]">{t('hero.features.support')}</li>
              <li className="animate-fade-in [animation-delay:400ms]">{t('hero.features.documents')}</li>
              <li className="animate-fade-in [animation-delay:600ms]">{t('hero.features.customs')}</li>
              <li className="animate-fade-in [animation-delay:800ms]">{t('hero.features.insurance')}</li>
              <li className="animate-fade-in [animation-delay:1000ms]">{t('hero.features.storage')}</li>
            </ul>
            <div className="flex gap-4">
              <a
                href="#calculator"
                className="inline-block bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {t('hero.buttons.calculate')}
              </a>
              <a
                href="#map"
                className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-lg transition-all md:hover:-translate-y-1 md:hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {t('hero.buttons.warehouses')}
              </a>
            </div>
          </div>

          <div className="flex-1 relative">
            {!isLoading && (
              <video
                ref={videoRef}
                className="w-full h-auto rounded-lg shadow-xl animate-float"
                loop
                muted
                playsInline
              >
                <source src="https://www.cargo.uz/images/4214151-Норм%20вариант%20(2).mp4" type="video/mp4" />
              </video>
            )}
            <img
              src="https://www.rsholod.ru/images/stroitelstvo-logisticheskih-tsentrov-rsholod-1.jpg"
              alt="Логистический центр"
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full border-4 border-white shadow-lg animate-float [animation-delay:500ms] object-cover"
              loading="eager"
            />
            <img
              src="https://www.scat-tv.ru/wp-content/uploads/2023/11/dc0780fda408b1013cef24828b7be5e1694b4509.jpg"
              alt="Морской порт"
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full border-4 border-white shadow-lg animate-float [animation-delay:1000ms] object-cover"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;