import React, { useState, useCallback, useEffect } from 'react';
// FIX: Use Firebase v9 syntax.
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  Timestamp,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  increment
} from 'firebase/firestore';
import { db } from './firebase';
import { FAQ, Category, Page } from './types';
import Header from './components/Header';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import LoginModal from './components/LoginModal';

// FIX: Timestamp type is now imported from 'firebase/firestore'.

const App: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [currentPage, setCurrentPage] = useState<Page>('user');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // FIX: Use Firebase v9 query syntax
    const q = query(collection(db, "faqs"), orderBy("updatedAt", "desc"));
    // FIX: Use Firebase v9 onSnapshot syntax
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const faqsData = querySnapshot.docs.map(docSnapshot => {
            const data = docSnapshot.data();
            const formatTimestamp = (timestamp: Timestamp) => {
                return timestamp ? timestamp.toDate().toISOString().split('T')[0] : '';
            }
            return {
                id: docSnapshot.id,
                question: data.question,
                answer: data.answer,
                category: data.category,
                views: data.views,
                helpful: data.helpful,
                notHelpful: data.notHelpful,
                createdAt: formatTimestamp(data.createdAt as Timestamp),
                updatedAt: formatTimestamp(data.updatedAt as Timestamp),
            } as FAQ;
        });
        setFaqs(faqsData);
    }, (error) => {
        console.error("Error fetching FAQs: ", error);
    });

    return () => unsubscribe();
  }, []);

  const addFaq = useCallback(async (faq: Omit<FAQ, 'id' | 'views' | 'helpful' | 'notHelpful' | 'createdAt' | 'updatedAt'>) => {
    try {
      // FIX: Use Firebase v9 addDoc syntax
      await addDoc(collection(db, 'faqs'), {
        ...faq,
        views: 0,
        helpful: 0,
        notHelpful: 0,
        // FIX: Use Firebase v9 serverTimestamp
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }, []);

  const updateFaq = useCallback(async (updatedFaq: FAQ) => {
    // FIX: Use Firebase v9 doc reference and updateDoc syntax
    const faqRef = doc(db, 'faqs', updatedFaq.id);
    try {
      await updateDoc(faqRef, {
        question: updatedFaq.question,
        answer: updatedFaq.answer,
        category: updatedFaq.category,
        // FIX: Use Firebase v9 serverTimestamp
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }, []);

  const deleteFaq = useCallback(async (id: string) => {
    try {
        // FIX: Use Firebase v9 deleteDoc syntax
        await deleteDoc(doc(db, 'faqs', id));
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
  }, []);
  
  const incrementViewCount = useCallback(async (id: string) => {
    // FIX: Use Firebase v9 doc reference and updateDoc syntax
    const faqRef = doc(db, 'faqs', id);
    try {
        await updateDoc(faqRef, {
            // FIX: Use Firebase v9 increment
            views: increment(1)
        });
    } catch (error) {
        console.error("Error updating view count: ", error);
    }
  }, []);

  const handleFeedback = useCallback(async (id: string, type: 'helpful' | 'notHelpful') => {
    // FIX: Use Firebase v9 doc reference and updateDoc syntax
    const faqRef = doc(db, 'faqs', id);
    try {
        await updateDoc(faqRef, {
            // FIX: Use Firebase v9 increment
            [type]: increment(1)
        });
    } catch (error) {
        console.error("Error handling feedback: ", error);
    }
  }, []);

  const handleLogin = (password: string): boolean => {
    // In a real application, use a proper authentication service.
    if (password === 'khepi3500!') {
      setIsAdminAuthenticated(true);
      setCurrentPage('admin');
      setIsLoginModalOpen(false);
      return true;
    }
    return false;
  };

  const handlePageChange = (page: Page) => {
    if (page === 'user') {
      setCurrentPage('user');
    } else if (page === 'admin') {
      if (isAdminAuthenticated) {
        setCurrentPage('admin');
      } else {
        setIsLoginModalOpen(true);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Header currentPage={currentPage} setCurrentPage={handlePageChange} />
      <main className="p-4 sm:p-6 md:p-8">
        {currentPage === 'admin' && isAdminAuthenticated ? (
          <AdminPage faqs={faqs} onAdd={addFaq} onUpdate={updateFaq} onDelete={deleteFaq} />
        ) : (
          <UserPage faqs={faqs} onIncrementView={incrementViewCount} onFeedback={handleFeedback} />
        )}
      </main>
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;
