<template>
    <div>
        <select v-model="selectedValue">
            <option v-for="option in options" :key="option" :value="option">
                {{ option }}
            </option>
        </select>

        <select v-model="selected2Value">
            <option v-for="option in option2s" :key="option" :value="option">
                {{ option }}
            </option>
        </select>

        <select v-model="selected3Value">
            <option v-for="option in option3s" :key="option" :value="option">
                {{ option }}
            </option>
        </select>
    </div>
</template>

<script>
import { useDropdownStore } from '../stores/pi';
import { computed } from 'vue';

export default {
    setup() {
        const dropdownStore = useDropdownStore();

        // 从 store 获取下拉框选项和选中的值
        const options = computed(() => dropdownStore.option1s);
        const selectedValue = computed({
            get: () => dropdownStore.selected1Value,
            set: (value) => dropdownStore.setSelected1Value(value),
        });


        const option2s = computed(() => dropdownStore.option2s);
        const selected2Value = computed({
            get: () => dropdownStore.selected2Value,
            set: (value) => dropdownStore.setSelected2Value(value),
        });



        const option3s = computed(() => dropdownStore.option3s);
        const selected3Value = computed({
            get: () => dropdownStore.selected3Value,
            set: (value) => dropdownStore.setSelected3Value(value),
        });


        return {
            options,
            selectedValue,
            option2s,
            option3s,
            selected2Value,
            selected3Value

        };
    },
};
</script>