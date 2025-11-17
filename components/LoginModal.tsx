
import React, { useState } from 'react';
import { XMarkIcon } from './icons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(password);
    if (!success) {
      setError('비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={handleClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-3 mb-5">
            <h3 className="text-xl font-semibold text-gray-900">관리자 로그인</h3>
            <button onClick={handleClose} className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5">
              <XMarkIcon className="w-5 h-5"/>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="비밀번호를 입력하세요"
                  required
                  autoFocus
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
            </div>
            <div className="flex justify-end items-center border-t pt-4 mt-5 space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!password}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
