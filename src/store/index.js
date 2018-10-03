import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		betslip: [],
		count: 0
	},
	mutations: {
		addBet (state, bet) {
			state.betslip.push(bet)
		},
		removeBet (state, id) {
			state.betslip.splice(state.betslip.findIndex(function(bet){
				return bet.storeID === id
			}), 1)
		},
		increment (state){
			state.count ++
		},
		decrement (state){
			state.count --
		},
		setStake (state, payload) {
			let betID = state.betslip.findIndex(function(bet){
				return bet.storeID === payload.betID
			})
			if (betID != -1) {
				state.betslip[betID].stake = parseFloat(payload.stake)
			}
		}
	},
	actions: {

	},
	getters: {
		getStake: (state) => (id) => {
			let betID = state.betslip.findIndex((bet) => {
				return bet.storeID === id
			})
			return state.betslip[betID].stake || 0
		},
		getStakeTotal: (state) => {
			let total = 0
			state.betslip.forEach((bet) => {
				total += bet.stake
			})
			return parseFloat(total)
		},
		getBets: (state) => {
			return state.betslip.map(obj => {
				return {
					"selection_key": obj.selectionID.toString(),
					"stake": obj.stake
				}
			})[0] || {}
		}
	}
})

export default store;