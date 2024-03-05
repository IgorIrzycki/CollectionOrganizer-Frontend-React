
import React, { createContext, useContext, useState } from 'react';

const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [url, setUrl] = useState('http://localhost:8080');

  return (
    <UrlContext.Provider value={{ url, setUrl }}>
      {children}
    </UrlContext.Provider>
  );
};

export const useUrl = () => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error('useUrl must be used within a UrlProvider');
  }
  return context;
};
