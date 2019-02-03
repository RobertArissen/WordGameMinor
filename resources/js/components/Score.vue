<template>
    <div class="bg-white shadow p-4 rounded">
        <b class="text-sm">Score</b>

        <h3 class="text-blue mt-4">{{score}}</h3>
    </div>
</template>

<script>
    export default {
        props: ['score']
    }
</script>
