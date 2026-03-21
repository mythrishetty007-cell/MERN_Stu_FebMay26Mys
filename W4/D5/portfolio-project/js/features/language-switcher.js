function initLanguageSelector() {
  const translations = {
    en: {
      name: "T R Mythri",
      role: "Full-Stack developer | MERN enthusiast",
      projects_btn: "View Projects",
      resume_btn: "Download Resume",
      projects_title: "My Projects",
      experience_title: "Education and Experience",
      skills_title: "Skills"
    },
    kn: {
      name: "ಟಿ ಆರ್ ಮೈತ್ರಿ",
      role: "ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್ | ಮರ್ನ್ (MERN) ಉತ್ಸಾಹಿ",
      projects_btn: "ಪ್ರಾಜೆಕ್ಟ್ ನೋಡಿ",
      resume_btn: "ರೆಸ್ಯೂಮ್ ಡೌನ್‌ಲೋಡ್",
      projects_title: "ನನ್ನ ಯೋಜನೆಗಳು",
      experience_title: "ಶಿಕ್ಷಣ ಮತ್ತು ಅನುಭವ",
      skills_title: "ಕೌಶಲ್ಯಗಳು"
    },
    hi: {
      name: "टी आर मैत्री",
      role: "फुल-स्टैक डेवलपर | एमईआरएन उत्साही",
      projects_btn: "परियोजनाएं देखें",
      resume_btn: "रिज्यूमे डाउनलोड करें",
      projects_title: "मेरी परियोजनाएं",
      experience_title: "शिक्षा और अनुभव",
      skills_title: "कौशल"
    }
  };

  const languageSelector = document.getElementById('language-selector');

  function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(el => {
      const key = el.getAttribute('data-key');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
    localStorage.setItem('preferredLanguage', lang);
  }

  if (languageSelector) {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    languageSelector.value = savedLang;
    setLanguage(savedLang);
    console.log("Language initialized to: " + savedLang);

    languageSelector.addEventListener("change", (e) => {
      const selectedLang = e.target.value;
      setLanguage(selectedLang);
      console.log("Language changed:"+selectedLang);
    });
  }
}

