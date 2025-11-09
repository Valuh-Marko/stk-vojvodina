import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./languagePicker.css";

const languages = {
  "en-US": {
    icon: "/flags/en.svg",
    name: "English",
  },
  sr: {
    icon: "/flags/rs.svg",
    name: "Srpski",
  },
};

const LanguagePicker = () => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState<string>(
    i18n.resolvedLanguage as string
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const onLanguageChanged = (lng) => setCurrentLang(lng);
    i18n.on("languageChanged", onLanguageChanged);
    return () => i18n.off("languageChanged", onLanguageChanged);
  }, [i18n]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(!isOpen);
  };

  return (
    <div className="c-language-picker">
      <div
        className="c-language__current"
        onClick={() => handleToggleDropdown()}
      >
        <img
          src={languages[currentLang].icon}
          alt="currentLang"
          className="c-language__icon"
        />
        <p className="c-language__name">{languages[currentLang].name}</p>
      </div>
      {isOpen && (
        <div className="c-language__dropdown">
          {Object.keys(languages).map((language) => (
            <button
              className="c-language-button"
              key={language}
              onClick={() => handleLanguageChange(language)}
              disabled={currentLang === language}
            >
              <img
                src={languages[language].icon}
                alt="currentLang"
                className="c-language__icon"
              />
              <p className="c-language__name">{languages[language].name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguagePicker;
