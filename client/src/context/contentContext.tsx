import { createContext, useState, ReactNode, FunctionComponent } from 'react';

interface contentContextProps {
  contentID: string ;
  setContentID: (content: string) => void;
}

// Providing a default value for the context
const defaultContentContext: contentContextProps = {
  contentID: '',
  setContentID: () => {}, // No-op function as a placeholder
};

const contentContext = createContext<contentContextProps>(defaultContentContext);

interface ContentProviderProps {
  children: ReactNode; // Correctly typing children prop
}
// stores auth context for user and logged in
const ContentProvider: FunctionComponent<ContentProviderProps> = ({ children }) => {  const [contentID, setContentID] = useState<string>('');

  return (
    <contentContext.Provider value={{ contentID, setContentID }}>
      {children}
    </contentContext.Provider>
  );
};

export { ContentProvider, contentContext };