<template>
  <view class="container">
    <form @submit="handleSubmit">
      <view class="form-item">
        <text>类型</text>
        <radio-group @change="handleTypeChange">
          <radio value="expense" :checked="type === 'expense'">支出</radio>
          <radio value="income" :checked="type === 'income'">收入</radio>
        </radio-group>
      </view>

      <view class="form-item">
        <text>金额</text>
        <input type="digit" v-model="amount" placeholder="请输入金额" />
      </view>

      <view class="form-item">
        <text>分类</text>
        <picker :range="categoryOptions" @change="handleCategoryChange">
          <view>{{ category || '请选择分类' }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text>日期</text>
        <picker mode="date" :value="date" @change="handleDateChange">
          <view>{{ date }}</view>
        </picker>
      </view>

      <view class="form-item">
        <text>备注</text>
        <input type="text" v-model="note" placeholder="请输入备注" />
      </view>

      <button form-type="submit" type="primary">保存</button>
    </form>
  </view>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { StorageService } from '../../utils/storage';
import { categories } from '../../types';

export default defineComponent({
  setup() {
    const type = ref<'income' | 'expense'>('expense');
    const amount = ref('');
    const category = ref('');
    const date = ref(new Date().toISOString().split('T')[0]);
    const note = ref('');

    const categoryOptions = computed(() => categories[type.value]);

    const handleTypeChange = (e: any) => {
      type.value = e.detail.value;
      category.value = '';
    };

    const handleCategoryChange = (e: any) => {
      category.value = categoryOptions.value[e.detail.value];
    };

    const handleDateChange = (e: any) => {
      date.value = e.detail.value;
    };

    const handleSubmit = async () => {
      if (!amount.value || !category.value) {
        uni.showToast({ title: '请填写完整信息', icon: 'none' });
        return;
      }

      const transaction = {
        id: Date.now().toString(),
        date: date.value,
        amount: parseFloat(amount.value),
        type: type.value,
        category: category.value,
        note: note.value
      };

      await StorageService.saveTransaction(transaction);
      uni.showToast({ title: '保存成功' });
      uni.navigateBack();
    };

    return {
      type,
      amount,
      category,
      date,
      note,
      categoryOptions,
      handleTypeChange,
      handleCategoryChange,
      handleDateChange,
      handleSubmit
    };
  }
});
</script>

<style>
.container {
  padding: 20rpx;
}

.form-item {
  margin-bottom: 20rpx;
  background-color: #fff;
  padding: 20rpx;
  border-radius: 10rpx;
}
</style> 