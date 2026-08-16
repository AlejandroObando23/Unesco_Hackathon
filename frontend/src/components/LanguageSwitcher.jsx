import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    // Determine current language properly even if it comes with region like en-US
    const current = i18n.language.startsWith('es') ? 'es' : 'en';
    const nextLng = current === 'en' ? 'es' : 'en';
    i18n.changeLanguage(nextLng);
  };

  return (
    <button className="lang-switcher" onClick={toggleLanguage} aria-label="Cambiar idioma / Change language">
      {i18n.language.startsWith('es') ? '🇪🇸 ES' : '🇺🇸 EN'}
    </button>
  );
}
