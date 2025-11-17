import * as XLSX from 'xlsx';
import { FAQ } from '../types';

export const exportToExcel = (faqs: FAQ[], filename?: string) => {
  // 데이터 변환: 필요한 필드만 선택하고 한글로 헤더 변경
  const excelData = faqs.map(faq => ({
    '질문': faq.question,
    '답변': faq.answer,
    '카테고리': faq.category,
    '조회수': faq.views,
    '도움이 됨': faq.helpful,
    '도움이 안됨': faq.notHelpful,
    '생성일': faq.createdAt,
    '수정일': faq.updatedAt
  }));

  // 워크북 생성
  const wb = XLSX.utils.book_new();
  
  // 워크시트 생성
  const ws = XLSX.utils.json_to_sheet(excelData);
  
  // 컬럼 너비 자동 조정
  const colWidths = [
    { wch: 30 }, // 질문
    { wch: 50 }, // 답변
    { wch: 25 }, // 카테고리
    { wch: 10 }, // 조회수
    { wch: 12 }, // 도움이 됨
    { wch: 12 }, // 도움이 안됨
    { wch: 12 }, // 생성일
    { wch: 12 }  // 수정일
  ];
  ws['!cols'] = colWidths;

  // 워크북에 워크시트 추가
  XLSX.utils.book_append_sheet(wb, ws, 'FAQ 목록');
  
  // 파일명 설정 (기본값: 현재 날짜)
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
  const defaultFilename = `FAQ_목록_${dateStr}.xlsx`;
  const finalFilename = filename || defaultFilename;
  
  // Excel 파일 다운로드
  XLSX.writeFile(wb, finalFilename);
};

export const exportFilteredToExcel = (faqs: FAQ[], searchTerm: string, filterCategory: string) => {
  let filename = 'FAQ_목록';
  
  if (searchTerm || filterCategory !== 'all') {
    const filters = [];
    if (searchTerm) filters.push(`검색_${searchTerm}`);
    if (filterCategory !== 'all') filters.push(`카테고리_${filterCategory}`);
    filename += `_${filters.join('_')}`;
  }
  
  const today = new Date();
  const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
  filename += `_${dateStr}.xlsx`;
  
  exportToExcel(faqs, filename);
};
