
import React, { useState, useCallback } from 'react';
import { FAQ, Category, Page } from './types';
import Header from './components/Header';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';

const initialFaqs: FAQ[] = [
  {
    id: 1,
    question: "결제는 어떻게 하나요?",
    answer: "결제는 신용카드, 무통장 입금, 그리고 다양한 간편 결제 서비스를 통해 가능합니다. 결제 페이지에서 원하시는 방법을 선택해주세요.",
    category: Category.PAYMENT,
    views: 152,
    helpful: 120,
    notHelpful: 5,
    createdAt: "2023-10-26",
    updatedAt: "2023-10-27"
  },
  {
    id: 2,
    question: "배송 조회는 어디서 할 수 있나요?",
    answer: "주문 완료 후 발송된 이메일의 '배송 추적' 링크를 클릭하시거나, 마이페이지의 '주문 내역'에서 실시간 배송 정보를 확인하실 수 있습니다.",
    category: Category.SHIPPING,
    views: 230,
    helpful: 198,
    notHelpful: 12,
    createdAt: "2023-10-25",
    updatedAt: "2023-10-25"
  },
  {
    id: 3,
    question: "회원가입은 어떻게 하나요?",
    answer: "홈페이지 우측 상단의 '회원가입' 버튼을 클릭하여 이메일 인증 및 정보 입력을 통해 가입하실 수 있습니다.",
    category: Category.ACCOUNT,
    views: 88,
    helpful: 70,
    notHelpful: 2,
    createdAt: "2023-10-24",
    updatedAt: "2023-10-24"
  },
  {
    id: 4,
    question: "해외 배송도 가능한가요?",
    answer: "네, 일부 국가에 한해 해외 배송 서비스를 제공하고 있습니다. 배송 가능 국가는 고객센터를 통해 문의해주시기 바랍니다.",
    category: Category.SHIPPING,
    views: 115,
    helpful: 95,
    notHelpful: 3,
    createdAt: "2023-10-23",
    updatedAt: "2023-10-26"
  },
   {
    id: 5,
    question: "포인트는 어떻게 사용하나요?",
    answer: "결제 시 '포인트 사용'란에 사용하고자 하는 금액을 입력하시면 총 결제 금액에서 차감됩니다. 최소 1,000점부터 사용 가능합니다.",
    category: Category.PAYMENT,
    views: 180,
    helpful: 150,
    notHelpful: 10,
    createdAt: "2023-11-01",
    updatedAt: "2023-11-02"
  },
  {
    id: 6,
    question: "비밀번호를 잊어버렸어요.",
    answer: "로그인 페이지 하단의 '비밀번호 찾기'를 통해 가입 시 등록한 이메일로 임시 비밀번호를 발급받을 수 있습니다.",
    category: Category.ACCOUNT,
    views: 301,
    helpful: 250,
    notHelpful: 21,
    createdAt: "2023-10-30",
    updatedAt: "2023-10-30"
  },
];

const App: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [currentPage, setCurrentPage] = useState<Page>('user');

  const addFaq = useCallback((faq: Omit<FAQ, 'id' | 'views' | 'helpful' | 'notHelpful' | 'createdAt' | 'updatedAt'>) => {
    setFaqs(prev => {
      const newFaq: FAQ = {
        ...faq,
        id: Date.now(),
        views: 0,
        helpful: 0,
        notHelpful: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      return [newFaq, ...prev];
    });
  }, []);

  const updateFaq = useCallback((updatedFaq: FAQ) => {
    setFaqs(prev => prev.map(faq => (faq.id === updatedFaq.id ? { ...updatedFaq, updatedAt: new Date().toISOString().split('T')[0] } : faq)));
  }, []);

  const deleteFaq = useCallback((id: number) => {
    setFaqs(prev => prev.filter(faq => faq.id !== id));
  }, []);
  
  const incrementViewCount = useCallback((id: number) => {
    setFaqs(prev => prev.map(faq => faq.id === id ? { ...faq, views: faq.views + 1 } : faq));
  }, []);

  const handleFeedback = useCallback((id: number, type: 'helpful' | 'notHelpful') => {
    setFaqs(prev => prev.map(faq => {
      if (faq.id === id) {
        return { ...faq, [type]: faq[type] + 1 };
      }
      return faq;
    }));
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="p-4 sm:p-6 md:p-8">
        {currentPage === 'user' ? (
          <UserPage faqs={faqs} onIncrementView={incrementViewCount} onFeedback={handleFeedback} />
        ) : (
          <AdminPage faqs={faqs} onAdd={addFaq} onUpdate={updateFaq} onDelete={deleteFaq} />
        )}
      </main>
    </div>
  );
};

export default App;
