import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    userInfo: {},
    cart: [],
    address: {}
}

const SAVE_USERINFO = 'SAVE_USERINFO'
const SAVE_TO_CART = 'SAVE_TO_CART'
const SAVE_USER_ADDR = 'SAVE_USER_ADDR'

const mutations = {
    [SAVE_USERINFO] (state, userInfo) {
        state.userInfo = userInfo
    },
    [SAVE_TO_CART] (state, cart) {
        state.cart = cart
    },
    [SAVE_USER_ADDR] (state, addr) {
        state.address = addr
    }
}

const actions = {
    saveUserInfo({commit}, userInfo) {
        commit(SAVE_USERINFO, userInfo)
    }
}

const getters = {
    userInfo: state => state.userInfo,
    cart: state => state.cart,
    address: state => state.address
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})