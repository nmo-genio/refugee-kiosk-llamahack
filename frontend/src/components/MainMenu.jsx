import React, { useState, useRef, useEffect } from 'react';

// All translations for supported languages
const translations = {
  en: {
    welcome: 'Welcome',
    mapTitle: 'Refugee Camp Map',
    backButton: 'Back to Language Selection',
    buttons: {
      docs: { title: 'Scan for Assistance', description: 'Take a photo of a form, note, or flyer' },
      sos: { title: 'SOS', description: 'Send an emergency alert' },
      family: { title: 'Find My Family', description: 'Help with tracing or contacting relatives' },
      endSession: { title: 'End Session', description: 'Return to language selection' }
    }
  },
  es: {
    welcome: 'Bienvenido',
    mapTitle: 'Mapa del Campo de Refugiados',
    backButton: 'Volver a la selección de idioma',
    buttons: {
      docs: { title: 'Escanear para Asistencia', description: 'Tome una foto de un formulario, nota o volante' },
      sos: { title: 'SOS', description: 'Enviar una alerta de emergencia' },
      family: { title: 'Encontrar a mi Familia', description: 'Ayuda para localizar o contactar familiares' },
      endSession: { title: 'Terminar Sesión', description: 'Volver a la selección de idioma' }
    }
  },
  hi: {
    welcome: 'स्वागत है',
    mapTitle: 'शरणार्थी शिविर का नक्शा',
    backButton: 'भाषा चयन पर वापस जाएं',
    buttons: {
      docs: { title: 'सहायता के लिए स्कैन करें', description: 'फॉर्म, नोट या फ्लायर की फोटो लें' },
      sos: { title: 'एसओएस', description: 'आपातकालीन चेतावनी भेजें' },
      family: { title: 'मेरा परिवार ढूंढें', description: 'रिश्तेदारों का पता लगाने या संपर्क करने में सहायता' },
      endSession: { title: 'सत्र समाप्त करें', description: 'भाषा चयन पर वापस जाएं' }
    }
  },
  pt: {
    welcome: 'Bem-vindo',
    mapTitle: 'Mapa do Campo de Refugiados',
    backButton: 'Voltar para a seleção de idioma',
    buttons: {
      docs: { title: 'Digitalizar para Assistência', description: 'Tire uma foto de um formulário, nota ou panfleto' },
      sos: { title: 'SOS', description: 'Enviar alerta de emergência' },
      family: { title: 'Encontrar Minha Família', description: 'Ajuda para localizar ou entrar em contato com parentes' },
      endSession: { title: 'Encerrar Sessão', description: 'Voltar para a seleção de idioma' }
    }
  },
  zh: {
    welcome: '欢迎',
    mapTitle: '难民营地图',
    backButton: '返回语言选择',
    buttons: {
      docs: { title: '扫描寻求帮助', description: '拍摄表格、便条或传单的照片' },
      sos: { title: '紧急求助', description: '发送紧急警报' },
      family: { title: '寻找家人', description: '帮助追踪或联系亲属' },
      endSession: { title: '结束会话', description: '返回语言选择' }
    }
  },
  ru: {
    welcome: 'Добро пожаловать',
    mapTitle: 'Карта лагеря беженцев',
    backButton: 'Вернуться к выбору языка',
    buttons: {
      docs: { title: 'Сканировать для помощи', description: 'Сделайте фото формы, записки или объявления' },
      sos: { title: 'SOS', description: 'Отправить сигнал бедствия' },
      family: { title: 'Найти мою семью', description: 'Помощь в поиске или связи с родственниками' },
      endSession: { title: 'Завершить сеанс', description: 'Вернуться к выбору языка' }
    }
  },
  ro: {
    welcome: 'Bun venit',
    mapTitle: 'Harta Taberei de Refugiați',
    backButton: 'Înapoi la selectarea limbii',
    buttons: {
      docs: { title: 'Scanează pentru Asistență', description: 'Fă o poză unui formular, bilet sau pliant' },
      sos: { title: 'SOS', description: 'Trimiteți o alertă de urgență' },
      family: { title: 'Găsește-mi familia', description: 'Ajutor pentru localizarea sau contactarea rudelor' },
      endSession: { title: 'Încheie sesiunea', description: 'Înapoi la selectarea limbii' }
    }
  },
  af: {
    welcome: 'Welkom',
    mapTitle: 'Vlugtelingkamp Kaart',
    backButton: 'Terug na Taalkeuse',
    buttons: {
      docs: { title: 'Skandeer vir Hulp', description: 'Neem ’n foto van ’n vorm, nota of pamflet' },
      sos: { title: 'SOS', description: 'Stuur \'n noodwaarskuwing' },
      family: { title: 'Vind My Familie', description: 'Hulp met die opsporing of kontak van familielede' },
      endSession: { title: 'Beëindig Sessie', description: 'Terug na Taalkeuse' }
    }
  },
  ar: {
    welcome: 'مرحباً',
    mapTitle: 'خريطة مخيم اللاجئين',
    backButton: 'العودة إلى اختيار اللغة',
    buttons: {
      docs: { title: 'المسح للمساعدة', description: 'التقط صورة لنموذج أو ملاحظة أو منشور' },
      sos: { title: 'نجدة', description: 'إرسال تنبيه طوارئ' },
      family: { title: 'البحث عن عائلتي', description: 'مساعدة في تتبع أو الاتصال بالأقارب' },
      endSession: { title: 'إنهاء الجلسة', description: 'العودة إلى اختيار اللغة' }
    }
  },
  el: {
    welcome: 'Καλώς ήρθατε',
    mapTitle: 'Χάρτης του Προσφυγικού Καταυλισμού',
    backButton: 'Επιστροφή στην επιλογή γλώσσας',
    buttons: {
      docs: { title: 'Σάρωση για Βοήθεια', description: 'Βγάλτε φωτογραφία μια φόρμα, σημείωμα ή φυλλάδιο' },
      sos: { title: 'SOS', description: 'Στείλε ένα σήμα κινδύνου' },
      family: { title: 'Βρες την Οικογένειά μου', description: 'Βοήθεια στην εύρεση ή επικοινωνία με συγγενείς' },
      endSession: { title: 'Τέλος Συνεδρίας', description: 'Επιστροφή στην επιλογή γλώσσας' }
    }
  },
  uk: {
    welcome: 'Ласкаво просимо',
    mapTitle: 'Мапа табору біженців',
    backButton: 'Повернутися до вибору мови',
    buttons: {
      docs: { title: 'Сканувати для допомоги', description: 'Зробіть фото форми, нотатки або листівки' },
      sos: { title: 'SOS', description: 'Надіслати екстрене повідомлення' },
      family: { title: 'Знайти родину', description: 'Допомога у пошуку або зв\'язку з родичами' }
    }
  },
  fr: {
    welcome: 'Bienvenue',
    mapTitle: 'Carte du Camp de Réfugiés',
    backButton: 'Retour à la sélection de la langue',
    buttons: {
      docs: { title: 'Scanner pour Aide', description: 'Prenez une photo d’un formulaire, d’une note ou d’un dépliant' },
      sos: { title: 'SOS', description: 'Envoyer une alerte d\'urgence' },
      family: { title: 'Retrouver ma Famille', description: 'Aide pour localiser ou contacter des proches' },
      endSession: { title: 'Terminer la session', description: 'Retour à la sélection de la langue' }
    }
  }
};

const MainMenu = ({ onBack, selectedLanguage }) => {
  // Camera modal state
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Translation
  const langCode = selectedLanguage?.code || 'en';
  const t = translations[langCode] || translations.en;
  const isRTL = selectedLanguage?.dir === 'rtl';
  const textDirection = isRTL ? 'rtl' : 'ltr';

  // Camera handling
  const handleCameraAccess = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      setCameraError('No camera found or permission denied');
    }
  };

  // Clean up camera on modal close/unmount
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCameraModal(false);
    setCameraError(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle button click
  const handleButtonClick = (action) => {
    if (action === 'docs') {
      setShowCameraModal(true);
      setTimeout(() => { handleCameraAccess(); }, 200);
    }
    // TODO: handle other actions like 'sos', 'family'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="self-start mb-6 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition-colors flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'} transform ${isRTL ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {t.backButton}
      </button>

      {/* Map Section */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center" dir={textDirection}>
          {t.mapTitle}
        </h2>
        <div className="w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden shadow-inner">
          <iframe
            title="Diavata Refugee Camp Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3089.0537532424364!2d22.8609314!3d40.7011359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a8308f3226c0c1%3A0x30a296c1630ac937!2sRefugee%20Camp%20Anagnostopoulou!5e0!3m2!1sen!2sus!4v1719037016825!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" dir={textDirection}>
        {[
          { id: 'docs', icon: '📷', ...t.buttons.docs },
          { id: 'sos', icon: '🆘', ...t.buttons.sos },
          { id: 'family', icon: '👨‍👩‍👧‍👦', ...t.buttons.family }
        ].map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button.id)}
            className="flex flex-col items-center justify-center p-8 min-h-[140px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:bg-blue-50 border-2 border-transparent hover:border-blue-200"
          >
            <span className="text-5xl mb-3">{button.icon}</span>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1" dir={textDirection}>
              {button.title}
            </h3>
            <p className="text-gray-500 text-base text-center" dir={textDirection}>
              {button.description}
            </p>
          </button>
        ))}
      </div>

      {/* End Session Button - Fixed in bottom right corner */}
      <div className="fixed bottom-6 right-6 z-10">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-lg"
        >
          <span>→</span>
          <span>{t.buttons.endSession.title}</span>
        </button>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {cameraError ? 'Camera Access' : 'Document Scanner'}
              </h3>
              <button 
                onClick={closeCamera}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {cameraError ? (
              <div className="text-center py-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xl font-medium text-gray-800 mb-2">
                  {cameraError}
                </p>
                <p className="text-gray-600 mb-6">
                  Please check your device settings to enable camera access.
                </p>
                <button
                  onClick={handleCameraAccess}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto max-h-[60vh]"
                />
                <div className="absolute inset-0 border-2 border-blue-400 border-dashed m-4 pointer-events-none" />
              </div>
            )}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={closeCamera}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              {!cameraError && (
                <button
                  onClick={() => {
                    alert('Document capture functionality will be implemented here');
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Capture
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;