<template>
    <div>
        <select v-model="selectedValue" @change="updateValue">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
import { useDropdownStore } from '@/stores/pi';
import { computed } from 'vue';

export default {
    setup() {
        const dropdownStore = useDropdownStore();

        // 从 store 获取下拉框选项和选中的值
        const options = computed(() => dropdownStore.option1s);
        alert(options)
        const selectedValue = computed({
            get: () => dropdownStore.selected1Value,
            set: (value) => dropdownStore.setSelected1Value(value),
        });

        const updateValue = () => {
            dropdownStore.setSelected1Value(selected1Value.value);
        };

        return {
            options,
            selectedValue,
            updateValue,
        };
    },
};
</script>
