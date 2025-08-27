import { useState } from 'react';
import { useAppContext } from './AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/LanguageContext.hooks';

const Modal = ({ isOpen, message, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: 'spring',
              damping: 15,
              stiffness: 80,
              delay: 0.1,
            }}
            className="bg-white p-6 rounded-lg w-full max-w-md mx-4"
          >
            <p className="text-lg mb-4 text-center">{message}</p>
            <button
              onClick={onClose}
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-2 rounded-lg transition-colors"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Contact = () => {
  const { calculationData } = useAppContext();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const sendToTelegram = async (e: React.FormEvent) => {
    e.preventDefault();

    const botToken = "7963327967:AAGROG2nqL7AyBYzVjynWyBivDW6RTTNUXg";
    const chatId = "7688360043";

    const text = `
Новый запрос на доставку:

**Контактная информация:**
Имя: ${name}
Номер телефона: ${phone}
Сообщение: ${message}

**Данные для расчета:**
Вес груза: ${calculationData.weight || "Нет данных"} кг
Длина груза: ${calculationData.length || "Нет данных"} м
Ширина груза: ${calculationData.width || "Нет данных"} м
Высота груза: ${calculationData.height || "Нет данных"} м
Периметр груза: ${calculationData.perimeter || "Нет данных"} м
Площадь груза: ${calculationData.area || "Нет данных"} м²
Объем груза: ${calculationData.volume || "Нет данных"} м³

**Стоимость доставки:** ${calculationData.cost || "Нет данных"} У.Е.
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
          }),
        }
      );

      if (response.ok) {
        const successMsg = t('contact.success');
        setModalMessage(typeof successMsg === 'string' ? successMsg : 'Message sent successfully');
        setIsModalOpen(true);
      } else {
        const errorMsg = t('contact.error');
        setModalMessage(typeof errorMsg === 'string' ? errorMsg : 'Error sending message');
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      const errorMsg = t('contact.error');
      setModalMessage(typeof errorMsg === 'string' ? errorMsg : 'Error sending message');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const titleText = t('contact.title');
  const nameText = t('contact.name');
  const phoneText = t('contact.phone');
  const messageText = t('contact.message');
  const submitText = t('contact.submit');

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {typeof titleText === 'string' ? titleText : 'Contact Us'}
        </h2>
        <div className="flex justify-center">
          <form onSubmit={sendToTelegram} className="w-full max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                {typeof nameText === 'string' ? nameText : 'Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={typeof nameText === 'string' ? nameText : 'Name'}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {typeof phoneText === 'string' ? phoneText : 'Phone'}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={typeof phoneText === 'string' ? phoneText : 'Phone'}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {typeof messageText === 'string' ? messageText : 'Message'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary h-32"
                placeholder={typeof messageText === 'string' ? messageText : 'Message'}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-secondary/90 text-white font-medium py-3 rounded-lg transition-colors"
            >
              {typeof submitText === 'string' ? submitText : 'Submit'}
            </button>
          </form>
        </div>
      </div>
      <Modal isOpen={isModalOpen} message={modalMessage} onClose={closeModal} />
    </section>
  );
};

export default Contact;