<template>
    <div>
        <p>当前选中的值：{{ selectedValue }}</p>
        <p>当前2选中的值：{{ selected2Value }}</p>
        <p>当前3选中的值：{{ selected3Value }}</p>
    </div>
</template>

<script>
import { useDropdownStore } from '../stores/pi';
import { computed } from 'vue';

export default {
    setup() {
        const dropdownStore = useDropdownStore();

        // 监听 selectedValue，当值发生变化时，组件会自动重新渲染
        const selectedValue = computed(() => dropdownStore.selected1Value);
        const selected2Value = computed(() => dropdownStore.selected2Value);
        const selected3Value = computed(() => dropdownStore.selected3Value);
        return {
            selectedValue,
            selected2Value,
            selected3Value
        };
    },
};
</script>
