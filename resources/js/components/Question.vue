<template>
    <div class="bg-white shadow p-4 h-auto w-3/5 rounded" v-if="words.length > 0">
        <b>Het {{words[wordIndex].languageName}} woord voor <span class="text-blue">{{words[wordIndex].wordDutch}}</span></b>

        <div class="mt-3 flex flex-row">
            <div class="bg-blue-dark h-1 w-5 mr-1 mt-5" v-bind:class="{ 'bg-blue-light': activeLetter+1 === (n)}" v-if="correctLetters < n" v-for="n in letterCount"></div>
            <div class="w-5 mr-1 border-b-4 border-blue-darker text-bold text-center font-extrabold" v-else>{{words[wordIndex].word[n-1].toUpperCase()}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['words', 'wordIndex', 'correctLetters', 'activeLetter'],

        data(){
            return {
                letterCount: 0,
            }
        },

        methods: {
            countLetters(){
                if(this.words.length > 0) this.letterCount = this.words[this.wordIndex].word.length
            }
        },

        watch:{
            'words'(){
                this.countLetters()
            }
        }
    }
</script>
