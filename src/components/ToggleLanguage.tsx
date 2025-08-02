import React from "react";

const texts = {
  es: {
    greeting:
      "Hola, soy Santiago y este es mi blog. Aquí comparto mis pensamientos y experiencias para practicar mi alemán.",
  },
  en: {
    greeting:
      "Hi, I am Santiago and this is my blog. Here I share my thoughts and experiences to practice my German.",
  },
  de: {
    greeting:
      "Hallo! Ich bin Santiago und das ist mein Blog. Hier teile ich meine Gedanken und Erlebnisse, um mein Deutsch zu üben.",
  },
};

const ToggleLanguage: React.FC<{
  language: string;
  setLanguage: (lang: string) => void;
}> = ({ language, setLanguage }) => {
  const languages = [
    { code: "es", label: "ES", flag: "🇪🇸", name: "Español" },
    { code: "en", label: "EN", flag: "🇺🇸", name: "English" },
    { code: "de", label: "DE", flag: "🇩🇪", name: "Deutsch" },
  ];

  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 rounded-full p-1 flex">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as keyof typeof texts)}
            className={`
                    w-12 h-12 rounded-full transition-all duration-200
                    flex items-center justify-center text-lg font-medium
                    ${
                      language === lang.code
                        ? "bg-blue-500 text-white shadow-md"
                        : "text-gray-500 hover:bg-gray-300"
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
