window.Vue = require('vue');
window.gameWords = require('./words').words;

/* Vue */
window.EventBus = new Vue();

Vue.component('GameControl', require('./components/GameControl.vue'));
Vue.component('Words', require('./components/Words.vue'));
Vue.component('Question', require('./components/Question.vue'));
Vue.component('Score', require('./components/Score.vue'));
Vue.component('GameContent', require('./components/GameContent.vue'));

const app = new Vue({
    el: '#app'
});

/* Game */
require('./CanvasGame');
