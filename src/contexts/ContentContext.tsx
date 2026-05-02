import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ref, onValue, set } from 'firebase/database';
import { db, handleDBError, OperationType } from '../lib/firebase';

export interface ContentSection {
  id: string;
  content: string;
}

interface ContentContextType {
  content: Record<string, string>;
  updateContent: (id: string, newContent: string) => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contentRef = ref(db, 'content');
    const unsubscribe = onValue(contentRef, (snapshot) => {
      const newMap: Record<string, string> = {};
      if (snapshot.exists()) {
        snapshot.forEach(child => {
          const data = child.val() as ContentSection;
          if (data && data.id) {
            newMap[data.id] = data.content;
          }
        });
      }
      setContentMap(newMap);
      setLoading(false);
    }, (error) => {
      handleDBError(error, OperationType.LIST, 'content');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateContent = async (id: string, newContent: string) => {
    try {
      await set(ref(db, `content/${id}`), {
        id,
        content: newContent,
        updatedAt: Date.now()
      });
    } catch (e) {
      handleDBError(e, OperationType.WRITE, `content/${id}`);
    }
  };

  return (
    <ContentContext.Provider value={{ content: contentMap, updateContent, loading }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}
