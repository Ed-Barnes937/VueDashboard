<template>
    <div>
        <v-layout v-if="!loggedIn" column text-xs-center>
            <v-flex>You are not logged in to Ladbrokes!</v-flex>
            <v-flex>
                <a href="https://sandbox-api.ladbrokes.com/forms/authorise-client?locale=en-GB&client_id=LAD7f732e0a41fa4ce299a7cf1ea4362ad3&response_type=token&redirect_uri=https%3a%2f%2flocalhost%3a5432&prompt=1&state=register-customer"
                   target="_blank" style="padding: 6px 24px; background-color: #f53942; border-radius: 3px; color: white; text-decoration: none; font-size: 1.4em">Login</a>
            </v-flex>
        </v-layout>
        <v-layout v-if="loggedIn" row wrap>
            <v-flex xs9>
                <v-card>
                    <v-card-text :class="['pa-0']">
                        <v-toolbar card dense dark>
                            <v-toolbar-title>Event List</v-toolbar-title>
                            <v-spacer/>
                            <v-btn color="#909293">1</v-btn>
                            <v-btn color="#909293">X</v-btn>
                            <v-btn color="#909293">2</v-btn>
                        </v-toolbar>
                    </v-card-text>
                </v-card>
                <v-card v-for="(event, i) in eventList" :key="i" class="mb-2">
                    <v-card-text :class="['pa-0']">
                        <v-toolbar card dark dense class="eventBar">
                            <v-toolbar-title v-html="event.name"/>
                            <v-spacer/>
                            <v-btn @click.stop="addBet(event,homeOdds,'home')" ripple>{{homeOdds}}</v-btn>
                            <v-btn @click.stop="addBet(event,drawOdds,'draw')" ripple>{{drawOdds}}</v-btn>
                            <v-btn @click.stop="addBet(event,awayOdds,'away')" ripple>{{awayOdds}}</v-btn>
                        </v-toolbar>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs3>
                <transition mode="out-in">
                    <bet-slip v-if="!this.$store.state.betDone">

                    </bet-slip>
                    <BetReceipt v-else>

                    </BetReceipt>
                </transition>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
	import axios from 'axios';
	import BetSlip from "../components/BetSlip"
    import BetReceipt from "../components/BetReceipt"

	export default {
		components: {
			BetSlip,
            BetReceipt
        },
		data() {
			return {
				eventList: [{
					name: "Man Utd V Newcastle",
                    home: "Man Utd",
                    away: "Newcastle",
                    draw: "Draw"
				}],
                oddsList: [],
				errors: []
			}
		},
		name: "betslip-test",
		mounted() {
			window.addEventListener("storage", () => {
				let token = localStorage.LadbrokesToken
                console.log("event token: " + token)
				if (token) {
					this.$store.state.loggedIn = true
					this.$store.state.token = token
				}
			})

            this.$store.state.token = localStorage.LadbrokesToken

            console.log("local: " + localStorage.LadbrokesToken)
            console.log("store: " + this.$store.getters.getToken)

            if (this.$store.getters.getToken){
            	this.$store.state.loggedIn = true;
            }

			if (!this.loggedIn) {
				let urlQuery = window.location.search
				let token = urlQuery.split("=")[1] || ""
				localStorage.LadbrokesToken = token
				if (token) close()
			}

		},
		//fetch events when created
		created() {
			// axios.get('http://sports-events-ms-stg.catena.media/events')
			// 	.then(response => {
			// 		//json responses parsed
			// 		this.eventList = response.data.data.items
            //         console.log(this.eventList)
			// 	})
			// 	.catch( e => {
			// 		this.errors.push(e)
			// 	})
            axios.get('http://localhost:5000/events/227491812')
                .then(response => {
                	this.oddsList = response.data.data.items[0].event.markets.market.filter(function(market){
						return market.marketKey === 361859299
					})[0].selections.selection
                })
		},
        computed: {
			loggedIn() {return this.$store.getters.getLoggedIn},
		    count() {
		    	return this.$store.state.count
            },
            homeOdds() {
		    	if (this.oddsList.length != 0) {
					return this.oddsList[2].currentPrice.numPrice + "/" + this.oddsList[2].currentPrice.denPrice
				}else{
		    		return "0/0"
                }
            },
            awayOdds() {
				if (this.oddsList.length != 0) {
					return this.oddsList[1].currentPrice.numPrice + "/" + this.oddsList[1].currentPrice.denPrice
				}else{
					return "0/0"
                }
			},
            drawOdds() {
				if (this.oddsList.length != 0) {
					return this.oddsList[0].currentPrice.numPrice + "/" + this.oddsList[0].currentPrice.denPrice
				}else{
					return "0/0"
                }
			}
		},
        methods: {
			addBet(event,odds,type) {
				let betNum = (type === "home") ? 2 : (type==="away" ? 1 : 0)
                betNum += 774849067
				let bet = {
					storeID: this.count,
                    name: event.name,
                    betName: event[type],
                    betType: "match betting",
                    odds: odds,
                    selectionID: betNum,
                    stake: 0,
                    receiptID: 0,
                    betDate: "2018/10/04",
                    potentialPayout: 0
                }
				this.$store.commit('addBet', bet)
                this.$store.commit('increment')
            },
            swapView() {
				this.$store.commit('makeBetDone')
			}
        }
	}
</script>

<style scoped>

</style>