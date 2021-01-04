import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        comment: '',
        log: JSON.parse(window.localStorage.getItem("status")),
        wide: '',
        max_article_id: ''
    },
    mutations: {
        setComment(state, data) {
            state.comment = data;
        },
        setLog(state, data) {
            state.log = data;
        },
        setWide(state, data) {
            state.wide = data;
        },
        setArticle_id(state, data) {
            state.max_article_id = data;
        }
    },
    getters: {

    },
    actions: {

    },
    modules: {

    }
})


export default store;