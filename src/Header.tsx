import React from 'react';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto py-6 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <img
            src="https://www.tesourodireto.com.br/assets/img/logo-tesouro-direto.svg"
            alt="Logo Tesouro Direto"
            className="h-16 mb-4"
            onError={(e) => {
              // Fallback para texto caso a imagem não carregue
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tesouro Direto
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Acompanhe os títulos disponíveis e suas taxas
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
