<template>
    <el-table :data="tableData" style="width: 100% ; padding-top: 30px; background-color: black;">
        <el-table-column label="等级" width="100%" style="background-color: black;">
            <template #default="scope">
                <span :style="{ color: getColor(scope.row.date) }">
                    <span class="dot" :style="{ backgroundColor: getColor(scope.row.date) }"></span>
                    {{ scope.row.date }}
                </span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="网络数量" width="100%" />
        <el-table-column prop="address" label="占比" width="100%" />
    </el-table>
    <!-- <button @click="show">2222</button> -->
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const show = () => {
    console.log(tableData);
}
const tableData = reactive([
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

const getColor = (date: string) => {
    switch (date) {
        case 'A':
            return 'green';
        case 'B':
            return 'blue';
        case 'C':
            return 'yellow';
        case 'D':
            return 'red';
        default:
            return 'black';
    }
}

defineExpose({ tableData, });
</script>

<style>
/* 使用更具体的选择器 */
.el-table.el-table--fit {
    background-color: #161922 !important;
    border: none !important;
    /* 移除表格边框 */
}

.el-table__inner-wrapper {
    background-color: #161922 !important;
}

.el-table__row {
    background-color: #161922 !important;
    color: white !important;
    border: none !important;
    /* 移除单元格边框 */
}

.el-table__row--striped {
    background-color: #161922 !important;
    color: white !important;
    border: none !important;
    /* 移除单元格边框 */
}

.el-table__cell {
    background-color: #161922 !important;
    border: none !important;
    /* 移除单元格边框 */
}

.el-table__header-wrapper th {
    background-color: #161922 !important;
    color: white !important;
    /* 设置表头文字颜色为白色 */
    border: none !important;
    /* 移除表头边框 */
}

.dot {
    display: inline-block;
    width: 8px;
    height: 8px;

}
</style>