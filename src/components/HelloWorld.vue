<!-- src/components/HelloWorld.vue -->
<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: String,
    },
});
</script>

<style scoped>
.hello {
    color: rgb(255, 255, 255);
}
</style>