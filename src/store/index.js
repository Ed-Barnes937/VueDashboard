import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		loggedIn: false,
		token: "",
		betslip: [],
		count: 0,
		betDone: false
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
		},
		setreceiptData(state, payload) {
			state.betslip[0].receiptID = payload.receiptID
			state.betslip[0].potentialPayout = payload.potentialPayout
			state.betslip[0].betDate = payload.betDate
		},
		makeBetDone: (state) => {
			state.betDone = !state.betDone
		},
		clearBets: (state) => {
			state.betslip = []
			state.count = 0
			state.betDone = false
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
		},
		getReceipt: (state) => {
			return state.betslip.map(obj => {
				return {
					"receiptID": obj.receiptID.toString(),
					"potentialReturn": obj.potentialPayout,
					"betDate": obj.betDate
				}
			})[0] || {
				"receiptID": 0,
				"potentialReturn": 0,
				"betDate": "2018/10/04"
			}
		},
		getToken: (state) => {
			return state.token
		},
		getLoggedIn: (state) => {
			return state.loggedIn
		}
	}
})

export default store;