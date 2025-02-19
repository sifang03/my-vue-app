// src/stores/dropdownStore.js
import { defineStore } from 'pinia';

export const useDropdownStore = defineStore('dropdown', {
    state: () => ({
        selected1Value: null, // 当前选中的值
        selected2Value: null, // 当前选中的值
        selected3Value: null, // 当前选中的值
        option1s: ['Option 1', 'Option 2', 'Option 3'], // 下拉框选项
        option2s: ['Option 4', 'Option 5', 'Option 6'], // 下拉框选项
        option3s: ['Option 7', 'Option 8', 'Option 9'], // 下拉框选项
    }),
    actions: {
        setSelected1Value(value) {
            this.selected1Value = value;
        },
        setSelected2Value(value) {
            this.selected2Value = value;
        },
        setSelected3Value(value) {
            this.selected3Value = value;
        },
    },
});
