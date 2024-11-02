import { Transaction } from '../types';

export const StorageService = {
  // 保存交易记录
  async saveTransaction(transaction: Transaction): Promise<void> {
    try {
      const transactions = await this.getTransactions();
      transactions.push(transaction);
      uni.setStorageSync('transactions', JSON.stringify(transactions));
    } catch (error) {
      console.error('保存交易记录失败:', error);
    }
  },

  // 获取所有交易记录
  async getTransactions(): Promise<Transaction[]> {
    try {
      const data = uni.getStorageSync('transactions');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('获取交易记录失败:', error);
      return [];
    }
  }
}; 