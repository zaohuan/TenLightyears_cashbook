// 交易记录类型定义
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  note?: string;
}

// 分类数据
export const categories = {
  expense: ['餐饮', '交通', '购物', '娱乐', '居住', '其他'],
  income: ['工资', '奖金', '投资', '其他']
}; 