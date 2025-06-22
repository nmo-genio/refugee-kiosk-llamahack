import React from 'react';

// Translations for all supported languages
const translations = {
  en: {
    welcome: 'Welcome',
    mapTitle: 'Refugee Camp Map',
    backButton: 'Back to Language Selection',
    buttons: {
      docs: { title: 'Docs', description: 'Translate or fill your documents' },
      sos: { title: 'SOS', description: 'Send an emergency alert' },
      family: { title: 'Find My Family', description: 'Help with tracing or contacting relatives' }
    }
  },
  es: {
    welcome: 'Bienvenido',
    mapTitle: 'Mapa del Campo de Refugiados',
    backButton: 'Volver a la selección de idioma',
    buttons: {
      docs: { title: 'Documentos', description: 'Traducir o completar sus documentos' },
      sos: { title: 'SOS', description: 'Enviar una alerta de emergencia' },
      family: { title: 'Encontrar a mi Familia', description: 'Ayuda para localizar o contactar familiares' }
    }
  },
  hi: {
    welcome: 'स्वागत है',
    mapTitle: 'शरणार्थी शिविर का नक्शा',
    backButton: 'भाषा चयन पर वापस जाएं',
    buttons: {
      docs: { title: 'दस्तावेज़', description: 'अपने दस्तावेज़ों का अनुवाद या भरें' },
      sos: { title: 'एसओएस', description: 'आपातकालीन चेतावनी भेजें' },
      family: { title: 'मेरा परिवार ढूंढें', description: 'रिश्तेदारों का पता लगाने या संपर्क करने में सहायता' }
    }
  },
  pt: {
    welcome: 'Bem-vindo',
    mapTitle: 'Mapa do Campo de Refugiados',
    backButton: 'Voltar para a seleção de idioma',
    buttons: {
      docs: { title: 'Documentos', description: 'Traduzir ou preencher seus documentos' },
      sos: { title: 'SOS', description: 'Enviar alerta de emergência' },
      family: { title: 'Encontrar Minha Família', description: 'Ajuda para localizar ou entrar em contato com parentes' }
    }
  },
  zh: {
    welcome: '欢迎',
    mapTitle: '难民营地图',
    backButton: '返回语言选择',
    buttons: {
      docs: { title: '文件', description: '翻译或填写您的文件' },
      sos: { title: '紧急求助', description: '发送紧急警报' },
      family: { title: '寻找家人', description: '帮助追踪或联系亲属' }
    }
  },
  ru: {
    welcome: 'Добро пожаловать',
    mapTitle: 'Карта лагеря беженцев',
    backButton: 'Вернуться к выбору языка',
    buttons: {
      docs: { title: 'Документы', description: 'Перевести или заполнить ваши документы' },
      sos: { title: 'SOS', description: 'Отправить сигнал бедствия' },
      family: { title: 'Найти мою семью', description: 'Помощь в поиске или связи с родственниками' }
    }
  },
  ro: {
    welcome: 'Bun venit',
    mapTitle: 'Harta Taberei de Refugiați',
    backButton: 'Înapoi la selectarea limbii',
    buttons: {
      docs: { title: 'Documente', description: 'Traduceți sau completați documentele' },
      sos: { title: 'SOS', description: 'Trimiteți o alertă de urgență' },
      family: { title: 'Găsește-mi familia', description: 'Ajutor pentru localizarea sau contactarea rudelor' }
    }
  },
  af: {
    welcome: 'Welkom',
    mapTitle: 'Vlugtelingkamp Kaart',
    backButton: 'Terug na Taalkeuse',
    buttons: {
      docs: { title: 'Dokumente', description: 'Vertaal of vul u dokumente in' },
      sos: { title: 'SOS', description: 'Stuur \'n noodwaarskuwing' },
      family: { title: 'Vind My Familie', description: 'Hulp met die opsporing of kontak van familielede' }
    }
  },
  ar: {
    welcome: 'مرحباً',
    mapTitle: 'خريطة مخيم اللاجئين',
    backButton: 'العودة إلى اختيار اللغة',
    buttons: {
      docs: { title: 'مستندات', description: 'ترجمة أو تعبئة مستنداتك' },
      sos: { title: 'نجدة', description: 'إرسال تنبيه طوارئ' },
      family: { title: 'البحث عن عائلتي', description: 'مساعدة في تتبع أو الاتصال بالأقارب' }
    }
  },
  el: {
    welcome: 'Καλώς ήρθατε',
    mapTitle: 'Χάρτης του Προσφυγικού Καταυλισμού',
    backButton: 'Επιστροφή στην επιλογή γλώσσας',
    buttons: {
      docs: { title: 'Έγγραφα', description: 'Μεταφράστε ή συμπληρώστε τα έγγραφά σας' },
      sos: { title: 'SOS', description: 'Αποστολή ειδοποίησης έκτακτης ανάγκης' },
      family: { title: 'Βρείτε την Οικογένειά μου', description: 'Βοήθεια στην εύρεση ή επικοινωνία με συγγενείς' }
    }
  },
  uk: {
    welcome: 'Ласкаво просимо',
    mapTitle: 'Мапа табору біженців',
    backButton: 'Повернутися до вибору мови',
    buttons: {
      docs: { title: 'Документи', description: 'Переклад або заповнення ваших документів' },
      sos: { title: 'SOS', description: 'Надіслати екстрене повідомлення' },
      family: { title: 'Знайти родину', description: 'Допомога у пошуку або зв\'язку з родичами' }
    }
  },
  fr: {
    welcome: 'Bienvenue',
    mapTitle: 'Carte du Camp de Réfugiés',
    backButton: 'Retour à la sélection de la langue',
    buttons: {
      docs: { title: 'Documents', description: 'Traduire ou remplir vos documents' },
      sos: { title: 'SOS', description: 'Envoyer une alerte d\'urgence' },
      family: { title: 'Retrouver ma Famille', description: 'Aide pour localiser ou contacter des proches' }
    }
  }
};

const MainMenu = ({ onBack, selectedLanguage }) => {
  // Default to English if no language is selected
  const langCode = selectedLanguage?.code || 'en';
  const t = translations[langCode] || translations.en;

  // Apply RTL if needed
  const isRTL = selectedLanguage?.dir === 'rtl';
  const textDirection = isRTL ? 'rtl' : 'ltr';
  const handleButtonClick = (action) => {
    console.log(`Action selected: ${action}`);
    // TODO: Connect these actions to your routing/logic!
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
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6" dir={textDirection}>
        {[
          { 
            id: 'docs', 
            icon: '📄',
            ...t.buttons.docs
          },
          { 
            id: 'sos', 
            icon: '🆘',
            ...t.buttons.sos
          },
          { 
            id: 'family', 
            icon: '👨‍👩‍👧‍👦',
            ...t.buttons.family
          }
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
    </div>
  );
};

export default MainMenu;