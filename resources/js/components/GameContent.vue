<template>
    <div>
        <div class="p-4" v-if="!gameStarted">
            <div class="bg-white shadow rounded p-4">
                
                <div>
                    <h3>Selecteer je woorden lijst</h3>
                    <div class="relative">
                        <select v-model="selected" class="block appearance-none w-full border border-grey-lighter bg-grey-lightest text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey mt-3" id="grid-state">
                            <option :value="index" v-for="(word, index) in words">{{word.listName}}</option>
                        </select>
                        <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>

                    <button class="shadow bg-blue-darkest hover:bg-black mt-2 w-full focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 pr-8 rounded" type="button" @click="startGame()">
                        Start het spel!
                    </button>
                </div>
            </div>
        </div>

        <div v-show="gameStarted">
            <canvas class="rounded shadow-lg ml-2" v-show="gameStarted"></canvas>
            <game-control :selected="selected"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                words: [],
                selected: 0,
                gameStarted: false
            }
        },

        mounted(){
            this.words = window.words
        },

        methods: {
            startGame(){
                this.gameStarted = true
                EventBus.$emit('launchGame', true)
            },
        }
    }
</script>
