<template>
  <view class="container">
    <!-- 顶部统计 -->
    <view class="statistics">
      <view class="stat-item">
        <text>本月支出</text>
        <text class="amount">¥{{ monthlyExpense }}</text>
      </view>
      <view class="stat-item">
        <text>本月收入</text>
        <text class="amount">¥{{ monthlyIncome }}</text>
      </view>
    </view>

    <!-- 添加记录按钮 -->
    <button class="add-btn" @click="navigateToAdd">添加记录</button>

    <!-- 交易记录列表 -->
    <view class="transaction-list">
      <view v-for="item in transactions" :key="item.id" class="transaction-item">
        <view class="transaction-info">
          <text class="category">{{ item.category }}</text>
          <text class="date">{{ item.date }}</text>
        </view>
        <text class="amount" :class="item.type">
          {{ item.type === 'expense' ? '-' : '+' }}¥{{ item.amount }}
        </text>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { StorageService } from '../../utils/storage';
import { Transaction } from '../../types';

export default defineComponent({
  setup() {
    const transactions = ref<Transaction[]>([]);
    const monthlyIncome = ref(0);
    const monthlyExpense = ref(0);

    const loadTransactions = async () => {
      transactions.value = await StorageService.getTransactions();
      calculateMonthlyStats();
    };

    const calculateMonthlyStats = () => {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      
      const monthlyTransactions = transactions.value.filter(t => {
        const date = new Date(t.date);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      });

      monthlyIncome.value = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      monthlyExpense.value = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    };

    const navigateToAdd = () => {
      uni.navigateTo({ url: '/pages/add/add' });
    };

    onMounted(() => {
      loadTransactions();
    });

    return {
      transactions,
      monthlyIncome,
      monthlyExpense,
      navigateToAdd
    };
  }
});
</script>

<style>
.container {
  padding: 20rpx;
}

.statistics {
  display: flex;
  justify-content: space-around;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}

.add-btn {
  margin: 20rpx 0;
  background-color: #007AFF;
  color: #fff;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 20rpx;
  background-color: #fff;
  margin-bottom: 10rpx;
  border-radius: 10rpx;
}

.amount.income {
  color: #4CD964;
}

.amount.expense {
  color: #FF3B30;
}
</style> 