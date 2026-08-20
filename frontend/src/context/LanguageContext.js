import { createContext } from 'react';

export const LanguageContext = createContext();

export const translations = {
  en: {
    home: 'Home',
    orders: 'My Orders',
    cart: 'Cart',
    login: 'Login',
    welcome: 'Hi',
    searchPlaceholder: 'Search for food...',
    categories: 'Popular Categories',
    explore: 'Explore Menu',
  },
  hi: {
    home: 'होम',
    orders: 'मेरे ऑर्डर',
    cart: 'कार्ट',
    login: 'लॉगिन',
    welcome: 'नमस्ते',
    searchPlaceholder: 'खाना खोजें...',
    categories: 'लोकप्रिय श्रेणियां',
    explore: 'मेन्यू देखें',
  }
};
