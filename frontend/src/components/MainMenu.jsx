import React, { useState, useRef, useEffect, useCallback } from 'react';
import SOSModal from './SOSModal';
import ChatWithAI from './ChatWithAI';
import DirectionsModal from './DirectionsModal';
import ReadAloudButton from './ReadAloudButton';


// All translations for supported languages
const translations = {
  en: {
    welcome: 'Welcome',
    mapTitle: 'Refugee Camp Map',
    backButton: 'Back to Language Selection',
    buttons: {
      docs: { title: 'Scan for Assistance', description: 'Take a photo of a form, note, or flyer' },
      sos: { title: '', description: 'Send an emergency alert' },
      directions: { title: 'Get Directions', description: 'Find essential services' },
      endSession: { title: 'End Session', description: 'Return to language selection' }
    },
    sosModal: {
      iWant: 'I want...',
      options: {
        medical: 'Medical Help',
        security: 'Security/Protection',
        family: 'Family/Child Help',
        other: 'Something Else'
      },
      prompt: 'Are you sure you want to ask for',
      sendAlert: 'Send Alert',
      cancel: 'Cancel',
      confirmation: 'Help is on the way.\nPlease stay where you are.'
    }
  },
  es: {
    welcome: 'Bienvenido',
    mapTitle: 'Mapa del Campo de Refugiados',
    backButton: 'Volver a la selección de idioma',
    buttons: {
      docs: { title: 'Escanear para obtener ayuda', description: 'Toma una foto de un formulario, nota o folleto' },
      sos: { title: '', description: 'Enviar una alerta de emergencia' },
      directions: { title: 'Obtener direcciones', description: 'Encontrar servicios esenciales' },
      endSession: { title: 'Terminar sesión', description: 'Volver a la selección de idioma' }
    },
    sosModal: {
      iWant: 'Quiero...',
      options: {
        medical: 'Ayuda médica',
        security: 'Seguridad/Protección',
        family: 'Ayuda familiar/infantil',
        other: 'Otra cosa'
      },
      prompt: '¿Está seguro de que desea solicitar',
      sendAlert: 'Enviar alerta',
      cancel: 'Cancelar',
      confirmation: 'La ayuda está en camino.\nPor favor, quédese donde está.'
    }
  },
  hi: {
    welcome: 'स्वागत है',
    mapTitle: 'शरणार्थी शिविर का नक्शा',
    backButton: 'भाषा चयन पर वापस जाएं',
    buttons: {
      docs: { title: 'सहायता के लिए स्कैन करें', description: 'फॉर्म, नोट या फ्लायर की फोटो लें' },
      sos: { title: '', description: 'आपातकालीन चेतावनी भेजें' }, 
      directions: { title: 'दिशा जानकारी', description: 'विशेष सेवाओं का पता लगाने' },
      endSession: { title: 'सत्र समाप्त करें', description: 'भाषा चयन पर वापस जाएं' }
    },
    sosModal: {
      iWant: 'मैं चाहता हूं...',
      options: {
        medical: 'चिकित्सा सहायता',
        security: 'सुरक्षा/संरक्षण',
        family: 'परिवार/बच्चों की सहायता',
        other: 'कुछ और'
      },
      prompt: 'क्या आप सुनिश्चित हैं कि आप अनुरोध करना चाहते हैं',
      sendAlert: 'अलर्ट भेजें',
      cancel: 'रद्द करें',
      confirmation: 'मदद रास्ते में है।\nकृपया जहाँ हैं वहीं रहें।'
    }
  },
  pt: {
    welcome: 'Bem-vindo',
    mapTitle: 'Mapa do Campo de Refugiados',
    backButton: 'Voltar para a seleção de idioma',
    buttons: {
      docs: { title: 'Digitalizar para Assistência', description: 'Tire uma foto de um formulário, nota ou panfleto' },
      sos: { title: '', description: 'Enviar alerta de emergência' }, 
      directions: { title: 'Obter direções', description: 'Encontrar serviços essenciais' },
      endSession: { title: 'Encerrar Sessão', description: 'Voltar para a seleção de idioma' }
    },
    sosModal: {
      iWant: 'Eu quero...',
      options: {
        medical: 'Ajuda médica',
        security: 'Segurança/Proteção',
        family: 'Ajuda familiar/infantil',
        other: 'Outro'
      },
      prompt: 'Você tem certeza de que deseja solicitar',
      sendAlert: 'Enviar alerta',
      cancel: 'Cancelar',
      confirmation: 'Ajuda está em caminho.\nPor favor, fique onde está.'
    }
  },
  zh: {
    welcome: '欢迎',
    mapTitle: '难民营地图',
    backButton: '返回语言选择',
    buttons: {
      docs: { title: '扫描寻求帮助', description: '拍摄表格、便条或传单的照片' },
      sos: { title: '', description: '发送紧急警报' }, 
      directions: { title: '获取方向', description: '找到基本服务' },
      endSession: { title: '结束会话', description: '返回语言选择' }
    },
  sosModal: {
    iWant: "我需要…",
    options: {
      medical: '医疗帮助',
      security: '安全/保护',
      family: '家庭/儿童帮助',
      other: '其他'
    },
    prompt: '您确定要请求',
    sendAlert: '发送警报',
    cancel: '取消',
    confirmation: '救援正在路上。\n请留在原地。'
  }
  },
  ru: {
    welcome: 'Добро пожаловать',
    mapTitle: 'Карта лагеря беженцев',
    backButton: 'Вернуться к выбору языка',
    buttons: {
      docs: { title: 'Сканировать для помощи', description: 'Сделайте фото формы, записки или объявления' },
      sos: { title: '', description: 'Отправить сигнал бедствия' }, 
      directions: { title: 'Найти мою семью', description: 'Помощь в поиске или связи с родственниками' },
      endSession: { title: 'Завершить сеанс', description: 'Вернуться к выбору языка' }
    },
    sosModal: {
      iWant: "Я хочу…",
      options: {
        medical: 'Медицинская помощь',
        security: 'Охрана/Защита',
        family: 'Помощь семье/детям',
        other: 'Другое'
      },
      prompt: 'Вы уверены, что хотите попросить о',
      sendAlert: 'Отправить сигнал',
      cancel: 'Отмена',
      confirmation: 'Помощь уже в пути.\nПожалуйста, оставайтесь на месте.'
    }
  },
  ro: {
    welcome: 'Bun venit',
    mapTitle: 'Harta Taberei de Refugiați',
    backButton: 'Înapoi la selectarea limbii',
    buttons: {
      docs: { title: 'Scanează pentru Asistență', description: 'Fă o poză unui formular, bilet sau pliant' },
      sos: { title: '', description: 'Trimiteți o alertă de urgență' }, 
      directions: { title: 'Obțineți direcții', description: 'Găsiți servicii esențiale' },
      endSession: { title: 'Încheie sesiunea', description: 'Înapoi la selectarea limbii' }
    },
    sosModal: {
      iWant: "Doresc…",
      options: {
        medical: 'Ajutor medical',
        security: 'Securitate/Protecție',
        family: 'Ajutor familial/copil',
        other: 'Altceva'
      },
      prompt: 'Sigur doriți să cereți',
      sendAlert: 'Trimite alertă',
      cancel: 'Anulează',
      confirmation: 'Ajutorul este pe drum.\nVă rugăm să rămâneți unde sunteți.'
    }
  },
  af: {
    welcome: 'Welkom',
    mapTitle: 'Vlugtelingkamp Kaart',
    backButton: 'Terug na Taalkeuse',
    buttons: {
      docs: { title: 'Skandeer vir Hulp', description: 'Neem ’n foto van ’n vorm, nota of pamflet' },
      sos: { title: '', description: 'Stuur ’n noodwaarskuwing' }, 
      directions: { title: 'Vind My Familie', description: 'Hulp met die opsporing of kontak van familielede' },
      endSession: { title: 'Beëindig Sessie', description: 'Terug na Taalkeuse' }
    },
    sosModal: {
      iWant: "Ek wil graag…",
      options: {
        medical: 'Mediese Hulp',
        security: 'Sekuriteit/Beskerming',
        family: 'Gesin/Kinderhulp',
        other: 'Iets anders'
      },
      prompt: 'Is jy seker jy wil vra vir',
      sendAlert: 'Stuur Alarm',
      cancel: 'Kanselleer',
      confirmation: 'Hulp is oppad.\nBly asseblief waar jy is.'
    }
  },
  ar: {
    welcome: 'مرحباً',
    mapTitle: 'خريطة مخيم اللاجئين',
    backButton: 'العودة إلى اختيار اللغة',
    buttons: {
      docs: { title: 'المسح للمساعدة', description: 'التقط صورة لنموذج أو ملاحظة أو منشور' },
      sos: { title: '', description: 'إرسال تنبيه طوارئ' }, 
      directions: { title: 'الحصول على الاتجاهات', description: 'العثور على الخدمات الأساسية' },
      endSession: { title: 'إنهاء الجلسة', description: 'العودة إلى اختيار اللغة' }
    },
    osModal: {
      iWant: "أرغب في…",
      options: {
        medical: 'مساعدة طبية',
        security: 'الأمن/الحماية',
        family: 'مساعدة الأسرة/الأطفال',
        other: 'شيء آخر'
      },
      prompt: 'هل أنت متأكد أنك تريد طلب',
      sendAlert: 'إرسال تنبيه',
      cancel: 'إلغاء',
      confirmation: 'المساعدة في الطريق.\nيرجى البقاء في مكانك.'
    }
  },
  el: {
    welcome: 'Καλώς ήρθατε',
    mapTitle: 'Χάρτης του Προσφυγικού Καταυλισμού',
    backButton: 'Επιστροφή στην επιλογή γλώσσας',
    buttons: {
      docs: { title: 'Σάρωση για Βοήθεια', description: 'Βγάλτε φωτογραφία μια φόρμα, σημείωμα ή φυλλάδιο' },
      sos: { title: '', description: 'Στείλε ένα σήμα κινδύνου' },
      directions: { title: 'Βρες την Οικογένειά μου', description: 'Βοήθεια στην εύρεση ή επικοινωνία με συγγενείς' },
      endSession: { title: 'Τέλος Συνεδρίας', description: 'Επιστροφή στην επιλογή γλώσσας' }
    },
    sosModal: {
      iWant: "Θέλω…",
      options: {
        medical: 'Ιατρική Βοήθεια',
        security: 'Ασφάλεια/Προστασία',
        family: 'Οικογενειακή/Παιδική βοήθεια',
        other: 'Κάτι άλλο'
      },
      prompt: 'Είστε βέβαιοι ότι θέλετε να ζητήσετε',
      sendAlert: 'Αποστολή ειδοποίησης',
      cancel: 'Ακύρωση',
      confirmation: 'Η βοήθεια έρχεται.\nΠαραμείνετε στη θέση σας.'
    }
  },
  uk: {
    welcome: 'Ласкаво просимо',
    mapTitle: 'Мапа табору біженців',
    backButton: 'Повернутися до вибору мови',
    buttons: {
      docs: { title: 'Сканувати для допомоги', description: 'Зробіть фото форми, нотатки або листівки' },
      sos: { title: '', description: 'Надіслати екстрене повідомлення' },
      directions: { title: 'Знайти родину', description: 'Допомога у пошуку або зв\'язку з родичами' }
    },
    sosModal: {
      iWant: "Я хочу…",
      options: {
        medical: 'Медична допомога',
        security: 'Безпека/Захист',
        family: 'Допомога сім\'ї/дитині',
        other: 'Інше'
      },
      prompt: 'Ви впевнені, що хочете попросити про',
      sendAlert: 'Відправити сигнал',
      cancel: 'Скасувати',
      confirmation: 'Допомога вже в дорозі.\nБудь ласка, залишайтеся на місці.'
    }
  },
  fr: {
    welcome: 'Bienvenue',
    mapTitle: 'Carte du Camp de Réfugiés',
    backButton: 'Retour à la sélection de la langue',
    buttons: {
      docs: { title: 'Scanner pour Aide', description: 'Prenez une photo d’un formulaire, d’une note ou d’un dépliant' },
      sos: { title: '', description: 'Envoyer une alerte d\'urgence' },
      directions: { title: 'Obtenir des instructions', description: 'Trouvez des services essentiels' },
      endSession: { title: 'Terminer la session', description: 'Retour à la sélection de la langue' }
    },
    sosModal: {
      iWant: "Je veux…",
      options: {
        medical: 'Aide médicale',
        security: 'Sécurité/Protection',
        family: 'Aide familiale/enfant',
        other: 'Autre chose'
      },
      prompt: 'Êtes-vous sûr de vouloir demander',
      sendAlert: 'Envoyer l\'alerte',
      cancel: 'Annuler',
      confirmation: 'L\'aide est en route.\nVeuillez rester où vous êtes.'
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

  // Camera
  const [capturedImage, setCapturedImage] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const canvasRef = useRef(null);

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

  // Modal states
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  // Handle button click
  const handleButtonClick = (buttonId) => {
    switch (buttonId) {
      case 'docs':
        setShowCameraModal(true);
        break;
      case 'sos':
        setShowSOSModal(true);
        break;
      case 'directions':
        // Add this new case
        setShowDirectionsModal(true);
        break;
      case 'endSession':
        onBack();
        break;
      default:
        break;
    }
  };

  // Get all page content for read-aloud
  const getPageContent = useCallback(() => {
    const content = [];
    
    // Add welcome message
    if (t.welcome) content.push(t.welcome);
    
    // Add map title
    if (t.mapTitle) content.push(t.mapTitle);
    
    // Add button descriptions
    if (t.buttons) {
      Object.values(t.buttons).forEach(button => {
        if (button.title && button.title.trim()) {
          content.push(button.title);
        }
        if (button.description && button.description.trim()) {
          content.push(button.description);
        }
      });
    }
    
    return content.filter(Boolean); // Remove any empty strings
  }, [t]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      {/* Global Read Aloud Button */}
      <div className="w-full max-w-4xl flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-800">
          {t.welcome}
        </h1>
        <ReadAloudButton 
          text={getPageContent()}
          language={langCode}
          className="ml-4"
          showStopButton={true}
        />
      </div>

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
          { id: 'directions', icon: '🗺️', ...t.buttons.directions }
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
                <>
                  <button
                    onClick={() => {
                      if (videoRef.current && canvasRef.current) {
                        const video = videoRef.current;
                        const canvas = canvasRef.current;
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                        const dataUrl = canvas.toDataURL("image/png");
                    // Stop all video tracks before closing
                    if (videoRef.current && videoRef.current.srcObject) {
                      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
                      videoRef.current.srcObject = null;
                    }
                    setCapturedImage(dataUrl);
                    closeCamera();
                    setShowChatModal(true);
                      }
                    }}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Capture
                  </button>
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SOS Modal */}
      {showSOSModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <SOSModal
            onClose={() => setShowSOSModal(false)}
            onSend={option => console.log('Sending SOS alert:', option)}
            translations={t.sosModal}
          />
        </div>
      )}

      {/* Directions Modal */}
      {showDirectionsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <DirectionsModal
            onClose={() => setShowDirectionsModal(false)}
            language={selectedLanguage}
          />
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && capturedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative bg-white p-8 rounded-xl shadow-lg max-w-lg w-full flex flex-col items-center">
            <h3 className="text-2xl font-bold mb-4">RKioskAI</h3>
            <img src={capturedImage} alt="Captured" className="w-full max-w-xs rounded mb-6" />
            <div className="bg-gray-100 rounded p-4 mb-4 w-full text-center text-gray-600">
              <ChatWithAI 
                image={capturedImage} 
                onClose={() => { 
                  setShowChatModal(false); 
                  setCapturedImage(null); 
                }} 
              />
            </div>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold"
              onClick={() => {
                setShowChatModal(false);
                setCapturedImage(null);
              }}
            >
              Close Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;