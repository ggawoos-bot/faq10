
export enum Category {
  PAYMENT = '결제',
  SHIPPING = '배송',
  ACCOUNT = '계정',
  ETC = '기타',
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: Category;
  views: number;
  helpful: number;
  notHelpful: number;
  createdAt: string;
  updatedAt: string;
}

export type Page = 'user' | 'admin';
