<template>
    <div v-show="gameStarted">
        <div class="p-4 bg-black shadow-inner rounded-b flex items-center px-2 justify-between">
            <question :words="words" :wordIndex="wordIndex" :correctLetters="correctLetters" :activeLetter="activeLetter"/>
            <words :words="words" :wordIndex="wordIndex" :playedOut="playedOut"/>
            <score :score="score"/>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
                gameStarted: false,
                score: 0,
                playedOut: false,
                playerHealth: 3,

                words: [],
                wordIndex: 0,
                correctLetters: 0,
                activeLetter: 0,
            }
        },

        mounted(){
            this.words = gameWords

            this.gameStartedBus()

            this.hitLetter();
        },


        methods: {
            gameStartedBus(){
                EventBus.$on('gameStarted', gameStarted => {
                    this.gameStarted = gameStarted

                    this.emitActiveWord()
                });
            },

            emitActiveWord(){
               EventBus.$emit('activeWord', this.words[this.wordIndex].word)
            },

            hitLetter(){
                EventBus.$on('hitLetter', letter => {
                    if(letter.toLowerCase() === this.words[this.wordIndex].word[this.activeLetter].toLowerCase()){
                        this.correctLetters++
                        this.activeLetter++
                        this.score += this.words[this.wordIndex].score/this.words[this.wordIndex].word.length
                        EventBus.$emit('score', this.score)

                        if(this.correctLetters === this.words[this.wordIndex].word.length){
                            if(this.words.length !== this.wordIndex+1){
                                this.wordIndex++
                                this.activeLetter = 0
                                this.correctLetters = 0

                                this.emitActiveWord()
                                EventBus.$emit('wordCorrect', [this.words[this.wordIndex].languageName, this.words[this.wordIndex].wordDutch])
                            }else{
                                this.playedOut = true
                                EventBus.$emit('playedOut', this.playedOut)
                            }
                        }
                    }else{
                        this.playerHealth--;
                        EventBus.$emit('playerHealth', this.playerHealth)
                    }
                });
            }
        }
    }
</script>
