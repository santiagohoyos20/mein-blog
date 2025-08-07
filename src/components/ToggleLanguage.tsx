import React from "react";
import type { Language } from "../types/types"; // Assuming you have a types file for TypeScript types

const ToggleLanguage: React.FC<{
  language: Language;
  setLanguage: (lang: Language) => void;
}> = ({ language, setLanguage }) => {
  const languages: { code: Language; label: string; flag: string; name: string }[] = [
    { code: 'de', label: "DE", flag: "🇩🇪", name: "Deutsch" },
    { code: 'es', label: "ES", flag: "🇪🇸", name: "Español" },
    { code: 'en', label: "EN", flag: "🇺🇸", name: "English" },
  ];  

  return (
    <div className="flex justify-center">
      <div className="bg-amber-50 rounded-full p-1 flex">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`
                    w-12 h-12 rounded-full transition-all duration-200
                    flex items-center justify-center text-lg font-medium
                    ${
                      language === lang.code
                        ? "bg-orange-100 text-black shadow-md"
                        : "text-gray-500 hover:bg-[#fff3e0] hover:cursor-pointer"
                    }
                  `}
            title={lang.name}
          >
            {lang.flag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToggleLanguage;
