<template>
    <div class="bg-white shadow p-4 rounded">
        <b class="text-sm">Aantal woorden goed</b>

        <h3 class="text-blue mt-4" v-if="!playedOut">{{wordIndex}}/{{words.length}}</h3>
        <h3 class="text-blue mt-4" v-else>{{words.length}}/{{words.length}}</h3>
    </div>
</template>

<script>
    export default {
        props: ['words', 'wordIndex', 'playedOut']
    }
</script>
