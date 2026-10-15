import React, { createContext, useContext, useEffect, useState } from 'react';

// Until Shopify customer accounts are connected, sign-in only remembers the
// shopper's details in this browser so the account pages can be previewed.
const AccountContext = createContext();
const STORAGE_KEY = 'medifeet-account';

const loadUser = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && saved.email ? saved : null;
  } catch {
    return null;
  }
};

const nameFromEmail = (email) =>
  email
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ');

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage unavailable: the shopper stays signed in for this visit only.
    }
  }, [user]);

  const signIn = ({ email, name }) => setUser({ email, name: name?.trim() || nameFromEmail(email) });
  const signOut = () => setUser(null);

  return (
    <AccountContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error('useAccount must be used within an AccountProvider');
  return context;
};
