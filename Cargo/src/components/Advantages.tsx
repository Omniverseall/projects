import { Shield, Clock, DollarSign, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/LanguageContext.hooks';

const Advantages = () => {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: <Shield className="w-12 h-12 text-primary" />,
      title: t('advantages.reliability'),
      description: t('advantages.reliabilityDesc')
    },
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: t('advantages.speed'),
      description: t('advantages.speedDesc')
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: t('advantages.prices'),
      description: t('advantages.pricesDesc')
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: t('advantages.team'),
      description: t('advantages.teamDesc')
    }
  ];

  return (
    <section id="advantages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t('advantages.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-orange-50 hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{advantage.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;