<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="等级" width="30%" />
        <el-table-column prop="name" label="网络数量" width="30%" />
        <el-table-column prop="address" label="占比" width="30%" />
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const tableData = ref([
    {
        date: 'A',
        name: '3',
        address: '79%',
    },
    {
        date: 'B',
        name: '1',
        address: '79%',
    },
    {
        date: 'C',
        name: '1',
        address: '79%',
    },
    {
        date: 'D',
        name: '1',
        address: '79%',
    },
])


</script>
