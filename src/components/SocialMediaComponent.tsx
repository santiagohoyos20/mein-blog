import React from 'react';
import { Instagram, Github, Linkedin } from 'lucide-react';

const SocialMediaComponent: React.FC = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/santiagohoyosjs',
      color: '#E4405F'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/santiagohoyos20',
      color: '#333'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/santiagohoyos20/',
      color: '#0077B5'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        className="flex flex-row space-x-3 p-4 rounded-2xl shadow-lg backdrop-blur-sm bg-amber-50"
      >
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div 
                className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <IconComponent 
                  className="w-5 h-5 transition-colors duration-300" 
                  style={{ color: '#4A4E69' }}
                />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div 
                  className="px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg"
                  style={{ backgroundColor: '#22223B', color: '#F2E9E4' }}
                >
                  {social.name}
                  {/* Arrow */}
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
                    style={{
                      borderTop: '6px solid #22223B',
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent'
                    }}
                  />
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialMediaComponent;