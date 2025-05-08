// LanguageSelector.js
import React, { useEffect } from 'react';

const LanguageSelector = () => {
  useEffect(() => {
    // Dynamically load Google Translate script
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup: remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Initialize Google Translate element
  window.googleTranslateElementInit = function () {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',  // Default language of the website
        includedLanguages: 'en,bn',  // Languages to translate to (English and Bangla)
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      'google_translate_element'
    );
  };

  return <div id="google_translate_element"></div>;
};

export default LanguageSelector;
